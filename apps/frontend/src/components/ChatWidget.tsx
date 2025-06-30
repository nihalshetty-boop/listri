"use client";

import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useChat, ChatMessage } from "@/contexts/ChatContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface ChatWidgetProps {
  listingId: string;
  sellerId: string;
  sellerName?: string;
  listingTitle?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatWidget({
  listingId,
  sellerId,
  sellerName = "Seller",
  listingTitle = "Item",
  isOpen,
  onClose,
}: ChatWidgetProps) {
  const [localMessages, setLocalMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?.id || "anonymous";

  const { sendMessage, isConnected, isConnecting, connectionStatus, addMessageListener } = useChat();

  // Listen for messages related to this conversation
  useEffect(() => {
    const unsubscribe = addMessageListener((msg: ChatMessage) => {
      // Only add messages that are part of this conversation
      if (msg.listingId === listingId && 
          (msg.senderId === userId || msg.receiverId === userId) &&
          (msg.senderId === sellerId || msg.receiverId === sellerId)) {
        setLocalMessages(prev => [...prev, msg]);
      }
    });

    return unsubscribe;
  }, [addMessageListener, listingId, userId, sellerId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [localMessages]);

  const handleSend = () => {
    if (input.trim() && isConnected) {
      const message: ChatMessage = {
        senderId: userId,
        senderName: user?.name || "Buyer",
        receiverId: sellerId,
        content: input.trim(),
        listingId,
      };
      
      // Add message to local state immediately for better UX
      setLocalMessages(prev => [...prev, message]);
      
      const success = sendMessage(message);
      if (success) {
        setInput("");
      } else {
        // Remove the message from local state if sending failed
        setLocalMessages(prev => prev.filter(m => m !== message));
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  const getConnectionStatusText = () => {
    switch (connectionStatus) {
      case "connecting":
        return "Connecting to chat...";
      case "connected":
        return "Connected";
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
      case "disconnected":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 h-96 z-50">
      <Card className="h-full flex flex-col bg-white shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gray-50 rounded-t-lg">
          <div className="flex-1">
            <h3 className="font-semibold text-sm">Chat with {sellerName}</h3>
            <p className="text-xs text-gray-500 truncate">{listingTitle}</p>
            <div className="flex items-center space-x-2 mt-1">
              <div className={`w-2 h-2 rounded-full ${
                connectionStatus === "connected" ? "bg-green-500" : 
                connectionStatus === "connecting" ? "bg-yellow-500" : "bg-red-500"
              }`}></div>
              <span className={`text-xs ${getConnectionStatusColor()}`}>
                {getConnectionStatusText()}
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-6 w-6 p-0 ml-2"
          >
            ×
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {localMessages.length === 0 ? (
            <div className="text-center text-gray-500 text-sm py-8">
              {connectionStatus === "connected" 
                ? "Start a conversation about this item"
                : "Connecting to chat service..."
              }
            </div>
          ) : (
            localMessages.map((msg, idx) => (
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
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
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
              disabled={!input.trim() || !isConnected || isConnecting}
              size="sm"
            >
              Send
            </Button>
          </div>
          {connectionStatus !== "connected" && (
            <p className={`text-xs mt-1 ${getConnectionStatusColor()}`}>
              {getConnectionStatusText()}
            </p>
          )}
        </div>
      </Card>
    </div>
  );
} 