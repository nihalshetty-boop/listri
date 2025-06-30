import { useEffect, useRef, useState, useCallback } from "react";
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

// Global connection manager to prevent multiple connections per user
const connectionManager = new Map<string, Client>();

// Message deduplication set to prevent processing the same message multiple times
const processedMessages = new Set<string>();

export function useChatSocket(
  userId: string,
  onMessage: (msg: ChatMessage) => void,
  onConnect?: () => void,
  onDisconnect?: () => void
) {
  const clientRef = useRef<Client | null>(null);
  const [connectionState, setConnectionState] = useState<ConnectionState>("disconnected");
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const connectionAttemptsRef = useRef(0);
  const maxReconnectAttempts = 3;
  const reconnectDelay = 3000;
  const isInitializedRef = useRef(false);
  const onMessageRef = useRef(onMessage);
  const onConnectRef = useRef(onConnect);
  const onDisconnectRef = useRef(onDisconnect);
  const isConnectingRef = useRef(false);

  // Update refs when callbacks change
  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);

  useEffect(() => {
    onConnectRef.current = onConnect;
  }, [onConnect]);

  useEffect(() => {
    onDisconnectRef.current = onDisconnect;
  }, [onDisconnect]);

  const cleanup = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  }, []);

  const connect = useCallback(() => {
    if (!userId || isConnectingRef.current) return;

    // Check if there's already a connection for this user
    const existingClient = connectionManager.get(userId);
    if (existingClient && existingClient.connected) {
      console.log("🔌 Using existing WebSocket connection for user:", userId);
      clientRef.current = existingClient;
      setConnectionState("connected");
      onConnectRef.current?.();
      return;
    }

    // Clean up any existing connection
    if (existingClient) {
      try {
        existingClient.deactivate();
      } catch (error) {
        console.warn("Error deactivating existing client:", error);
      }
      connectionManager.delete(userId);
    }

    cleanup();
    connectionAttemptsRef.current = 0;
    isConnectingRef.current = true;
    
    console.log("🔌 Initializing new WebSocket connection for user:", userId);
    setConnectionState("connecting");

    try {
      const socket = new SockJS("http://localhost:8081/ws");
      
      const client = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 0, // Disable automatic reconnection
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        onConnect: () => {
          console.log("✅ WebSocket connected successfully for user:", userId);
          connectionAttemptsRef.current = 0;
          isConnectingRef.current = false;
          setConnectionState("connected");
          
          // Store the client in the global manager
          connectionManager.set(userId, client);
          clientRef.current = client;
          
          // Subscribe to user-specific private messages
          // This ensures only messages intended for this user are received
          client.subscribe(`/user/${userId}/queue/messages`, (message) => {
            try {
              console.log("📨 Received private message for user", userId, ":", message.body);
              const body = JSON.parse(message.body);
              console.log("📨 Parsed private message:", body);
              
              // Only process if it's a chat message (not join message)
              if (body.content && body.content !== "joined") {
                // Create a unique key for message deduplication
                const messageKey = `${body.id || body.timestamp || Date.now()}_${body.senderId}_${body.content}`;
                
                if (processedMessages.has(messageKey)) {
                  console.log("📨 Skipping duplicate message:", messageKey);
                  return;
                }
                
                processedMessages.add(messageKey);
                
                // Clean up old messages from the set (keep only last 100)
                if (processedMessages.size > 100) {
                  const messagesArray = Array.from(processedMessages);
                  processedMessages.clear();
                  messagesArray.slice(-50).forEach(msg => processedMessages.add(msg));
                }
                
                console.log("📨 Processing private message");
                onMessageRef.current(body);
              } else {
                console.log("📨 Ignoring join message");
              }
            } catch (error) {
              console.error("❌ Error parsing private message:", error);
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

          onConnectRef.current?.();
        },
        onDisconnect: () => {
          console.log("❌ WebSocket disconnected for user:", userId);
          isConnectingRef.current = false;
          setConnectionState("disconnected");
          
          // Remove from global manager
          connectionManager.delete(userId);
          clientRef.current = null;
          
          onDisconnectRef.current?.();
          
          // Attempt to reconnect if we haven't exceeded max attempts
          if (connectionAttemptsRef.current < maxReconnectAttempts) {
            connectionAttemptsRef.current++;
            console.log(`🔄 Reconnection attempt ${connectionAttemptsRef.current}/${maxReconnectAttempts} for user:`, userId);
            
            reconnectTimeoutRef.current = setTimeout(() => {
              if (isInitializedRef.current) {
                connect();
              }
            }, reconnectDelay);
          } else {
            console.error("❌ Max reconnection attempts reached for user:", userId);
            setConnectionState("error");
          }
        },
        onStompError: (error) => {
          console.error("❌ STOMP error for user", userId, ":", error);
          isConnectingRef.current = false;
          setConnectionState("error");
        },
        onWebSocketError: (error) => {
          console.error("❌ WebSocket error for user", userId, ":", error);
          isConnectingRef.current = false;
          setConnectionState("error");
        },
        onWebSocketClose: () => {
          console.log("❌ WebSocket connection closed for user:", userId);
          isConnectingRef.current = false;
          setConnectionState("disconnected");
        }
      });

      client.activate();
      
    } catch (error) {
      console.error("❌ Error creating WebSocket connection for user", userId, ":", error);
      isConnectingRef.current = false;
      setConnectionState("error");
    }
  }, [userId, cleanup]);

  // Initialize connection when userId changes
  useEffect(() => {
    if (userId) {
      isInitializedRef.current = true;
      connect();
    } else {
      cleanup();
      isInitializedRef.current = false;
      setConnectionState("disconnected");
    }

    return () => {
      cleanup();
      isInitializedRef.current = false;
    };
  }, [userId, connect, cleanup]);

  const sendMessage = useCallback((msg: ChatMessage): boolean => {
    if (connectionState !== "connected" || !clientRef.current) {
      console.error("❌ Cannot send message: not connected. State:", connectionState);
      return false;
    }

    try {
      console.log("📤 Sending private message via WebSocket:", msg);
      clientRef.current.publish({
        destination: "/app/chat.private",
        body: JSON.stringify(msg),
      });
      console.log("✅ Private message sent successfully via WebSocket");
      return true;
    } catch (error) {
      console.error("❌ Error sending private message via WebSocket:", error);
      return false;
    }
  }, [connectionState]);

  const isConnected = connectionState === "connected";
  const isConnecting = connectionState === "connecting";
  const hasError = connectionState === "error";

  return {
    sendMessage,
    isConnected,
    isConnecting,
    hasError,
    connectionStatus: connectionState,
    reconnect: () => {
      console.log("🔄 Manual reconnect requested for user:", userId);
      connectionAttemptsRef.current = 0;
      isInitializedRef.current = false;
      isConnectingRef.current = false;
      
      // Clean up existing connection
      const existingClient = connectionManager.get(userId);
      if (existingClient) {
        try {
          existingClient.deactivate();
        } catch (error) {
          console.warn("Error deactivating client during manual reconnect:", error);
        }
        connectionManager.delete(userId);
      }
      
      connect();
    }
  };
}
