"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useChatSocket, ChatMessage } from "../../../hooks/useChatSocket";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ChatConnectionStatus from "@/components/ChatConnectionStatus";
import { MessageSquare, Send, User, Clock } from "lucide-react";

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

  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Messages</h1>
            <p className="text-xl text-gray-600">Connect with buyers and sellers</p>
          </div>
          <ChatConnectionStatus
            connectionStatus={connectionStatus}
            isConnected={isConnected}
            isConnecting={isConnecting}
            hasError={hasError}
            onReconnect={reconnect}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[600px]">
          {/* Conversations List */}
          <Card className="lg:col-span-1 bg-white shadow-sm border-0">
            <CardHeader className="border-b border-gray-200">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                Conversations
              </CardTitle>
            </CardHeader>
            <div className="overflow-y-auto h-[calc(100%-4rem)]">
              {conversations.size === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  {connectionStatus === "connected" 
                    ? (
                      <div>
                        <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p className="text-sm">No conversations yet</p>
                        <p className="text-xs mt-1">Start chatting with sellers!</p>
                      </div>
                    )
                    : (
                      <div>
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
                        <p className="text-sm">Connecting to chat service...</p>
                      </div>
                    )
                  }
                </div>
              ) : (
                Array.from(conversations.keys()).map((conversationId) => (
                  <div
                    key={conversationId}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedConversation === conversationId ? "bg-purple-50 border-purple-200" : ""
                    }`}
                    onClick={() => setSelectedConversation(conversationId)}
                  >
                    <div className="font-medium text-sm text-gray-900">
                      {getConversationDisplayName(conversationId)}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {conversations.get(conversationId)?.length || 0} messages
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Chat Messages */}
          <div className="lg:col-span-3">
            <Card className="h-full flex flex-col bg-white shadow-sm border-0">
              {selectedConversation ? (
                <>
                  <CardHeader className="border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        {getConversationDisplayName(selectedConversation)}
                      </CardTitle>
                      <div className="flex items-center space-x-2">
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
                  </CardHeader>
                  
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {getCurrentConversationMessages().length === 0 ? (
                      <div className="text-center text-gray-500 py-12">
                        <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p className="text-sm">No messages in this conversation yet.</p>
                        <p className="text-xs mt-1">Start the conversation!</p>
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
                            className={`max-w-xs px-4 py-3 rounded-lg text-sm ${
                              msg.senderId === userId
                                ? "bg-purple-600 text-white"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="font-medium text-xs flex items-center">
                                <User className="w-3 h-3 mr-1" />
                                {msg.senderName}
                              </div>
                              {msg.timestamp && (
                                <div className="text-xs opacity-70 flex items-center">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {new Date(msg.timestamp).toLocaleTimeString()}
                                </div>
                              )}
                            </div>
                            <div className="leading-relaxed">{msg.content}</div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  
                  <div className="border-t border-gray-200 p-4">
                    <div className="flex space-x-3">
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        disabled={!isConnected}
                      />
                      <Button
                        onClick={handleSend}
                        disabled={!isConnected || !input.trim()}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2"
                      >
                        <Send className="w-4 h-4" />
                        <span>Send</span>
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                    <p className="text-sm">Choose a conversation from the list to start messaging</p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 