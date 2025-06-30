"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useChatSocket, ChatMessage } from "../../../hooks/useChatSocket";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import ChatConnectionStatus from "@/components/ChatConnectionStatus";

export default function MessagesPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Map<string, ChatMessage[]>>(new Map());
  const [isClient, setIsClient] = useState(false);

  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?.id || "test-user";

  // Prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  const { sendMessage, isConnected, isConnecting, hasError, connectionStatus, reconnect } = useChatSocket(
    userId,
    (msg: ChatMessage) => {
      console.log("📨 Received message in messages page:", msg);
      
      // Add message to all messages
      setMessages((prev) => [...prev, msg]);
      
      // Add message to appropriate conversation
      const conversationId = msg.conversationId || generateConversationId(msg.senderId, msg.receiverId, msg.listingId);
      setConversations((prev) => {
        const newConversations = new Map(prev);
        const existingMessages = newConversations.get(conversationId) || [];
        newConversations.set(conversationId, [...existingMessages, msg]);
        return newConversations;
      });
    },
    () => {
      console.log("Chat connected in messages page");
    },
    () => {
      console.log("Chat disconnected in messages page");
    }
  );

  const generateConversationId = (senderId: string, receiverId: string, listingId: string) => {
    const ids = [senderId, receiverId, listingId].sort();
    return ids.join("_");
  };

  const handleSend = () => {
    if (input.trim() && isConnected && selectedConversation) {
      // Parse conversation ID to get receiver and listing
      const parts = selectedConversation.split("_");
      const receiverId = parts.find(id => id !== userId) || "unknown";
      const listingId = parts[2] || "unknown";
      
      const message: ChatMessage = {
        senderId: userId,
        senderName: user?.name || "Test User",
        receiverId,
        content: input.trim(),
        listingId,
        conversationId: selectedConversation,
      };
      
      console.log("📤 Sending message:", message);
      
      // Add message to local state immediately for better UX
      setMessages((prev) => [...prev, message]);
      setConversations((prev) => {
        const newConversations = new Map(prev);
        const existingMessages = newConversations.get(selectedConversation) || [];
        newConversations.set(selectedConversation, [...existingMessages, message]);
        return newConversations;
      });
      
      const success = sendMessage(message);
      if (success) {
        setInput("");
        console.log("✅ Message sent successfully");
      } else {
        console.error("❌ Failed to send message");
        // Remove the message from local state if sending failed
        setMessages((prev) => prev.filter(m => m !== message));
        setConversations((prev) => {
          const newConversations = new Map(prev);
          const existingMessages = newConversations.get(selectedConversation) || [];
          newConversations.set(selectedConversation, existingMessages.filter(m => m !== message));
          return newConversations;
        });
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getConversationDisplayName = (conversationId: string) => {
    const parts = conversationId.split("_");
    const otherUserId = parts.find(id => id !== userId) || "Unknown";
    const listingId = parts[2] || "Unknown";
    return `${otherUserId} - ${listingId}`;
  };

  const getCurrentConversationMessages = () => {
    if (!selectedConversation) return [];
    return conversations.get(selectedConversation) || [];
  };

  const getConnectionStatusText = () => {
    switch (connectionStatus) {
      case "connecting":
        return "Connecting to chat...";
      case "connected":
        return "Connected";
      case "error":
        return "Connection Error";
      case "disconnected":
        return "Disconnected - trying to reconnect...";
      default:
        return "Unknown status";
    }
  };

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case "connecting":
        return "text-yellow-500";
      case "connected":
        return "text-green-500";
      case "error":
        return "text-red-500";
      case "disconnected":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Messages</h1>
        <ChatConnectionStatus
          connectionStatus={connectionStatus}
          isConnected={isConnected}
          isConnecting={isConnecting}
          hasError={hasError}
          onReconnect={reconnect}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Conversations</h2>
          </div>
          <div className="overflow-y-auto h-[calc(100%-4rem)]">
            {conversations.size === 0 ? (
              <div className="p-4 text-center text-gray-500">
                {connectionStatus === "connected" 
                  ? "No conversations yet. Start chatting!"
                  : "Connecting to chat service..."
                }
              </div>
            ) : (
              Array.from(conversations.keys()).map((conversationId) => (
                <div
                  key={conversationId}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                    selectedConversation === conversationId ? "bg-blue-50 border-blue-200" : ""
                  }`}
                  onClick={() => setSelectedConversation(conversationId)}
                >
                  <div className="font-medium text-sm">
                    {getConversationDisplayName(conversationId)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {conversations.get(conversationId)?.length || 0} messages
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Chat Messages */}
        <div className="lg:col-span-3">
          <Card className="h-full flex flex-col">
            {selectedConversation ? (
              <>
                <div className="p-4 border-b">
                  <h2 className="text-lg font-semibold">
                    {getConversationDisplayName(selectedConversation)}
                  </h2>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className={`w-2 h-2 rounded-full ${
                      connectionStatus === "connected" ? "bg-green-500" : 
                      connectionStatus === "connecting" ? "bg-yellow-500" : 
                      connectionStatus === "error" ? "bg-red-500" : "bg-gray-500"
                    }`}></div>
                    <span className={`text-xs ${getConnectionStatusColor()}`}>
                      {getConnectionStatusText()}
                    </span>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                  {getCurrentConversationMessages().length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                      No messages in this conversation yet.
                    </div>
                  ) : (
                    getCurrentConversationMessages().map((msg, idx) => (
                      <div
                        key={msg.id || idx}
                        className={`flex ${
                          msg.senderId === userId ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                            msg.senderId === userId
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 text-gray-800"
                          }`}
                        >
                          <div className="font-medium text-xs mb-1">
                            {msg.senderName}
                          </div>
                          <div>{msg.content}</div>
                          {msg.timestamp && (
                            <div className="text-xs opacity-70 mt-1">
                              {new Date(msg.timestamp).toLocaleTimeString()}
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="p-4 border-t">
                  <div className="flex space-x-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={
                        connectionStatus === "connected" 
                          ? "Type your message..." 
                          : "Connecting..."
                      }
                      disabled={!isConnected || isConnecting}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSend}
                      disabled={!input.trim() || !isConnected || isConnecting || !selectedConversation}
                    >
                      Send
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-lg font-medium mb-2">Select a conversation</div>
                  <div className="text-sm">
                    Choose a conversation from the list to start chatting
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Debug Info */}
      {isClient && (
        <div className="mt-6 p-4 bg-gray-100 rounded text-xs">
          <div className="font-medium mb-2">Debug Info:</div>
          <div>Total messages: {messages.length}</div>
          <div>Conversations: {conversations.size}</div>
          <div>Connection: {connectionStatus}</div>
          <div>User ID: {userId}</div>
          <div>Selected conversation: {selectedConversation || "None"}</div>
        </div>
      )}
    </div>
  );
} 