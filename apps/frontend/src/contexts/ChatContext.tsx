"use client";

import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export type ChatMessage = {
  id?: string;
  conversationId?: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  content: string;
  timestamp?: string;
  listingId: string;
};

type ConnectionState = "disconnected" | "connecting" | "connected" | "error";

interface ChatContextType {
  messages: ChatMessage[];
  sendMessage: (msg: ChatMessage) => boolean;
  isConnected: boolean;
  isConnecting: boolean;
  hasError: boolean;
  connectionStatus: ConnectionState;
  reconnect: () => void;
  addMessageListener: (listener: (msg: ChatMessage) => void) => () => void;
}

const ChatContext = createContext<ChatContextType | null>(null);

// Global connection manager
let globalClient: Client | null = null;
let globalConnectionState: ConnectionState = "disconnected";
let messageListeners: Set<(msg: ChatMessage) => void> = new Set();
let processedMessages = new Set<string>();

function generateConversationId(userId1: string, userId2: string, listingId: string): string {
  return [userId1, userId2, listingId].sort().join('_');
}

export function ChatProvider({ children, userId }: { children: React.ReactNode; userId: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [connectionState, setConnectionState] = useState<ConnectionState>("disconnected");
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const connectionAttemptsRef = useRef(0);
  const maxReconnectAttempts = 3;
  const reconnectDelay = 3000;
  const isConnectingRef = useRef(false);

  const updateConnectionState = useCallback((newState: ConnectionState) => {
    globalConnectionState = newState;
    setConnectionState(newState);
  }, []);

  const addMessageListener = useCallback((listener: (msg: ChatMessage) => void) => {
    messageListeners.add(listener);
    return () => {
      messageListeners.delete(listener);
    };
  }, []);

  const notifyMessageListeners = useCallback((msg: ChatMessage) => {
    messageListeners.forEach(listener => {
      try {
        listener(msg);
      } catch (error) {
        console.error("Error in message listener:", error);
      }
    });
  }, []);

  const connect = useCallback(() => {
    if (!userId || isConnectingRef.current) return;

    // Check if there's already a global connection
    if (globalClient && globalClient.connected) {
      console.log("🔌 Using existing global WebSocket connection for user:", userId);
      updateConnectionState("connected");
      return;
    }

    // Clean up any existing connection
    if (globalClient) {
      try {
        globalClient.deactivate();
      } catch (error) {
        console.warn("Error deactivating existing global client:", error);
      }
      globalClient = null;
    }

    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    connectionAttemptsRef.current = 0;
    isConnectingRef.current = true;
    
    console.log("🔌 Initializing global WebSocket connection for user:", userId);
    updateConnectionState("connecting");

    try {
      const socket = new SockJS("http://localhost:8081/ws");
      
      const client = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 0, // Disable automatic reconnection
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        onConnect: () => {
          console.log("✅ Global WebSocket connected successfully for user:", userId);
          connectionAttemptsRef.current = 0;
          isConnectingRef.current = false;
          updateConnectionState("connected");
          
          globalClient = client;
          
          // For demonstration, let's subscribe to a default test conversation
          const testReceiverId = "seller123"; // or get from state/context
          const testListingId = "listing123"; // or get from state/context
          const conversationId = generateConversationId(userId, testReceiverId, testListingId);
          client.subscribe(`/topic/conversation/${conversationId}`, (message) => {
            try {
              console.log("📨 Received conversation message:", message.body);
              const body = JSON.parse(message.body);
              console.log("📨 Parsed conversation message:", body);
              
              if (body.content && body.content !== "joined") {
                const messageKey = `${body.id || body.timestamp || Date.now()}_${body.senderId}_${body.content}`;
                if (processedMessages.has(messageKey)) {
                  console.log("📨 Skipping duplicate message:", messageKey);
                  return;
                }
                processedMessages.add(messageKey);
                if (processedMessages.size > 100) {
                  const messagesArray = Array.from(processedMessages);
                  processedMessages.clear();
                  messagesArray.slice(-50).forEach(msg => processedMessages.add(msg));
                }
                console.log("📨 Processing conversation message for user:", userId, "Message:", body);
                if ((body.senderId === userId || body.receiverId === userId) && body.conversationId === conversationId) {
                  console.log("📨 Adding message to local state for user:", userId);
                  setMessages(prev => [...prev, body]);
                  notifyMessageListeners(body);
                } else {
                  console.log("📨 Message not for this user. Sender:", body.senderId, "Receiver:", body.receiverId, "Current user:", userId);
                }
              } else {
                console.log("📨 Ignoring join message");
              }
            } catch (error) {
              console.error("❌ Error parsing conversation message:", error);
            }
          });

          // Send join message only once per connection
          const joinMessage = {
            senderId: userId,
            senderName: userId,
            content: "joined",
            receiverId: "",
            listingId: ""
          };
          console.log("👋 Sending join message:", joinMessage);
          client.publish({
            destination: "/app/chat.join",
            body: JSON.stringify(joinMessage),
          });
        },
        onDisconnect: () => {
          console.log("❌ Global WebSocket disconnected for user:", userId);
          isConnectingRef.current = false;
          updateConnectionState("disconnected");
          
          globalClient = null;
          
          // Attempt to reconnect if we haven't exceeded max attempts
          if (connectionAttemptsRef.current < maxReconnectAttempts) {
            connectionAttemptsRef.current++;
            console.log(`🔄 Reconnection attempt ${connectionAttemptsRef.current}/${maxReconnectAttempts} for user:`, userId);
            
            reconnectTimeoutRef.current = setTimeout(() => {
              connect();
            }, reconnectDelay);
          } else {
            console.error("❌ Max reconnection attempts reached for user:", userId);
            updateConnectionState("error");
          }
        },
        onStompError: (error) => {
          console.error("❌ STOMP error for user", userId, ":", error);
          isConnectingRef.current = false;
          updateConnectionState("error");
        },
        onWebSocketError: (error) => {
          console.error("❌ WebSocket error for user", userId, ":", error);
          isConnectingRef.current = false;
          updateConnectionState("error");
        },
        onWebSocketClose: () => {
          console.log("❌ Global WebSocket connection closed for user:", userId);
          isConnectingRef.current = false;
          updateConnectionState("disconnected");
        }
      });

      client.activate();
      
    } catch (error) {
      console.error("❌ Error creating global WebSocket connection for user", userId, ":", error);
      isConnectingRef.current = false;
      updateConnectionState("error");
    }
  }, [userId, updateConnectionState, notifyMessageListeners]);

  const sendMessage = useCallback((msg: ChatMessage): boolean => {
    if (connectionState !== "connected" || !globalClient) {
      console.error("❌ Cannot send message: not connected. State:", connectionState);
      return false;
    }

    try {
      console.log("📤 Sending private message via global WebSocket:", msg);
      globalClient.publish({
        destination: "/app/chat.private",
        body: JSON.stringify(msg),
      });
      console.log("✅ Private message sent successfully via global WebSocket");
      return true;
    } catch (error) {
      console.error("❌ Error sending private message via global WebSocket:", error);
      return false;
    }
  }, [connectionState]);

  const reconnect = useCallback(() => {
    console.log("🔄 Manual reconnect requested for user:", userId);
    connectionAttemptsRef.current = 0;
    isConnectingRef.current = false;
    
    // Clean up existing connection
    if (globalClient) {
      try {
        globalClient.deactivate();
      } catch (error) {
        console.warn("Error deactivating global client during manual reconnect:", error);
      }
      globalClient = null;
    }
    
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    
    connect();
  }, [userId, connect]);

  // Initialize connection when userId changes
  useEffect(() => {
    if (userId) {
      connect();
    } else {
      updateConnectionState("disconnected");
    }

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [userId, connect, updateConnectionState]);

  const isConnected = connectionState === "connected";
  const isConnecting = connectionState === "connecting";
  const hasError = connectionState === "error";

  const contextValue: ChatContextType = {
    messages,
    sendMessage,
    isConnected,
    isConnecting,
    hasError,
    connectionStatus: connectionState,
    reconnect,
    addMessageListener,
  };

  return (
    <ChatContext.Provider value={contextValue}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
} 