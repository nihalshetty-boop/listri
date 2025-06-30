"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useChat, ChatMessage } from "@/contexts/ChatContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import ChatConnectionStatus from "@/components/ChatConnectionStatus";

export default function ChatPage() {
  const [localMessages, setLocalMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [receiverId, setReceiverId] = useState("seller123");
  const [listingId, setListingId] = useState("listing123");
  const [showDebug, setShowDebug] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [lastReceivedMessage, setLastReceivedMessage] = useState<string>("");

  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?.id || "test-user";

  // Prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  const { sendMessage, isConnected, isConnecting, hasError, connectionStatus, reconnect, addMessageListener } = useChat();

  // Listen for all messages
  useEffect(() => {
    const unsubscribe = addMessageListener((msg: ChatMessage) => {
      console.log("📨 Received message in chat page:", msg);
      setLastReceivedMessage(JSON.stringify(msg, null, 2));
      setLocalMessages(prev => [...prev, msg]);
    });

    return unsubscribe;
  }, [addMessageListener]);

  const handleSend = () => {
    if (input.trim() && isConnected) {
      const message: ChatMessage = {
        senderId: userId,
        senderName: user?.name || "Test User",
        receiverId,
        content: input.trim(),
        listingId,
      };
      
      console.log("📤 Sending message:", message);
      
      // Add message to local state immediately for better UX
      setLocalMessages((prev) => [...prev, message]);
      
      const success = sendMessage(message);
      if (success) {
        setInput("");
        console.log("✅ Message sent successfully");
      } else {
        console.error("❌ Failed to send message");
        // Remove the message from local state if sending failed
        setLocalMessages((prev) => prev.filter(m => m !== message));
      }
    }
  };

  const handleTestMessage = () => {
    if (isConnected) {
      const testMessage: ChatMessage = {
        senderId: userId,
        senderName: user?.name || "Test User",
        receiverId: "test-receiver",
        content: "This is a test message at " + new Date().toLocaleTimeString(),
        listingId: "test-listing",
      };
      
      console.log("🧪 Sending test message:", testMessage);
      const success = sendMessage(testMessage);
      if (success) {
        console.log("✅ Test message sent successfully");
      } else {
        console.error("❌ Failed to send test message");
      }
    } else {
      console.error("❌ Cannot send test message: not connected");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
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
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Chat Test</h1>
      
      {/* Debug Connection Status */}
      {showDebug && (
        <ChatConnectionStatus
          connectionStatus={connectionStatus}
          isConnected={isConnected}
          isConnecting={isConnecting}
          hasError={hasError}
          onReconnect={reconnect}
        />
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Configuration */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Chat Settings</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDebug(!showDebug)}
            >
              {showDebug ? "Hide" : "Show"} Debug
            </Button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Your ID:</label>
              <Input value={isClient ? userId : "Loading..."} disabled />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Receiver ID:</label>
              <Input 
                value={receiverId} 
                onChange={(e) => setReceiverId(e.target.value)}
                placeholder="Enter receiver ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Listing ID:</label>
              <Input 
                value={listingId} 
                onChange={(e) => setListingId(e.target.value)}
                placeholder="Enter listing ID"
              />
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                connectionStatus === "connected" ? "bg-green-500" : 
                connectionStatus === "connecting" ? "bg-yellow-500" : 
                connectionStatus === "error" ? "bg-red-500" : "bg-gray-500"
              }`}></div>
              <span className={`text-sm ${getConnectionStatusColor()}`}>
                {getConnectionStatusText()}
              </span>
            </div>
            {connectionStatus === "error" && (
              <div className="text-xs text-gray-500">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={reconnect}
                  className="w-full"
                >
                  Manual Reconnect
                </Button>
              </div>
            )}
            
            {/* Test Button */}
            <Button
              variant="outline"
              onClick={handleTestMessage}
              disabled={!isConnected}
              className="w-full"
            >
              Send Test Message
            </Button>
            
            {/* Debug Info */}
            {isClient && (
              <div className="mt-4 p-2 bg-gray-100 rounded text-xs">
                <div className="font-medium mb-1">Debug Info:</div>
                <div>Messages count: {localMessages.length}</div>
                <div>Connection: {connectionStatus}</div>
                <div>User ID: {userId}</div>
                <div>Receiver ID: {receiverId}</div>
                <div>Listing ID: {listingId}</div>
                {lastReceivedMessage && (
                  <div className="mt-2">
                    <div className="font-medium">Last Received:</div>
                    <pre className="text-xs bg-white p-1 rounded overflow-auto max-h-20">
                      {lastReceivedMessage}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>

        {/* Chat Messages */}
        <div className="lg:col-span-2">
          <Card className="h-96 flex flex-col">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Messages</h2>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {localMessages.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  {connectionStatus === "connected" 
                    ? "No messages yet. Start a conversation!"
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
                  disabled={!input.trim() || !isConnected || isConnecting}
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
      </div>
    </div>
  );
}
