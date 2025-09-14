"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useChatSocket, ChatMessage } from "../../../hooks/useChatSocket";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ChatConnectionStatus from "@/components/ChatConnectionStatus";
import { MessageSquare, Send, User, Clock, DollarSign } from "lucide-react";

export default function MessagesPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Map<string, ChatMessage[]>>(new Map());
  const [isClient, setIsClient] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [offerAmount, setOfferAmount] = useState("");

  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?.id || "test-user";

  // Mock conversations for demo purposes
  const mockConversations = [
    {
      id: "user1_listing1",
      listingTitle: "iPhone 13 Pro",
      sellerName: "Sarah Johnson",
      sellerId: "user1",
      listingId: "listing1",
      messages: [
        {
          id: "1",
          senderId: "user1",
          senderName: "Sarah Johnson",
          receiverId: userId,
          content: "Hi! I saw you're interested in my iPhone 13 Pro. It's in excellent condition, barely used!",
          listingId: "listing1",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        },
        {
          id: "2",
          senderId: userId,
          senderName: user?.name || "You",
          receiverId: "user1",
          content: "Hi Sarah! Yes, I'm very interested. Is the battery health still good?",
          listingId: "listing1",
          timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(), // 1.5 hours ago
        },
        {
          id: "3",
          senderId: "user1",
          senderName: "Sarah Johnson",
          receiverId: userId,
          content: "Yes! Battery health is at 94%. I can send you a screenshot if you'd like to see it.",
          listingId: "listing1",
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
        },
        {
          id: "4",
          senderId: userId,
          senderName: user?.name || "You",
          receiverId: "user1",
          content: "That sounds great! Would you consider $750? I can pick it up today.",
          listingId: "listing1",
          timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
        },
        {
          id: "5",
          senderId: "user1",
          senderName: "Sarah Johnson",
          receiverId: userId,
          content: "I can do $780 - that's my best price. The phone is practically new!",
          listingId: "listing1",
          timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 minutes ago
        }
      ]
    },
    {
      id: "user2_listing2",
      listingTitle: "MacBook Pro 16-inch",
      sellerName: "Mike Chen",
      sellerId: "user2",
      listingId: "listing2",
      messages: [
        {
          id: "6",
          senderId: userId,
          senderName: user?.name || "You",
          receiverId: "user2",
          content: "Hello! Is the MacBook still available?",
          listingId: "listing2",
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
        },
        {
          id: "7",
          senderId: "user2",
          senderName: "Mike Chen",
          receiverId: userId,
          content: "Yes, it's still available! Are you interested in purchasing?",
          listingId: "listing2",
          timestamp: new Date(Date.now() - 3.5 * 60 * 60 * 1000).toISOString(), // 3.5 hours ago
        },
        {
          id: "8",
          senderId: userId,
          senderName: user?.name || "You",
          receiverId: "user2",
          content: "Yes! Can you tell me more about its condition? Any scratches or issues?",
          listingId: "listing2",
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
        },
        {
          id: "9",
          senderId: "user2",
          senderName: "Mike Chen",
          receiverId: userId,
          content: "It's in excellent condition - no scratches, works perfectly. I'm selling because I upgraded to the M3 model.",
          listingId: "listing2",
          timestamp: new Date(Date.now() - 2.5 * 60 * 60 * 1000).toISOString(), // 2.5 hours ago
        }
      ]
    },
    {
      id: "user3_listing3",
      listingTitle: "Designer Handbag",
      sellerName: "Emma Wilson",
      sellerId: "user3",
      listingId: "listing3",
      messages: [
        {
          id: "10",
          senderId: "user3",
          senderName: "Emma Wilson",
          receiverId: userId,
          content: "Hi! Thanks for your interest in my handbag. It's authentic and comes with the original receipt.",
          listingId: "listing3",
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
        },
        {
          id: "11",
          senderId: userId,
          senderName: user?.name || "You",
          receiverId: "user3",
          content: "That's great! Is the price negotiable?",
          listingId: "listing3",
          timestamp: new Date(Date.now() - 5.5 * 60 * 60 * 1000).toISOString(), // 5.5 hours ago
        },
        {
          id: "12",
          senderId: "user3",
          senderName: "Emma Wilson",
          receiverId: userId,
          content: "I'm open to reasonable offers. What were you thinking?",
          listingId: "listing3",
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
        }
      ]
    }
  ];

  // Prevent hydration mismatch and initialize mock conversations
  useEffect(() => {
    setIsClient(true);
    
    // Initialize with mock conversations for demo
    const initialConversations = new Map();
    mockConversations.forEach(conv => {
      initialConversations.set(conv.id, conv.messages);
    });
    setConversations(initialConversations);
    
    // Set the first conversation as selected by default
    if (mockConversations.length > 0) {
      setSelectedConversation(mockConversations[0].id);
    }
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

  const handleMakeOffer = () => {
    if (offerAmount && parseFloat(offerAmount) > 0 && selectedConversation) {
      // Parse conversation ID to get receiver and listing
      const parts = selectedConversation.split("_");
      const receiverId = parts.find(id => id !== userId) || "unknown";
      const listingId = parts[2] || "unknown";
      
      const offerMessage: ChatMessage = {
        senderId: userId,
        senderName: user?.name || "You",
        receiverId,
        content: `💰 Made an offer of $${parseFloat(offerAmount).toFixed(2)}`,
        listingId,
        conversationId: selectedConversation,
      };
      
      console.log("💰 Sending offer:", offerMessage);
      
      // Add offer message to local state immediately for better UX
      setMessages((prev) => [...prev, offerMessage]);
      setConversations((prev) => {
        const newConversations = new Map(prev);
        const existingMessages = newConversations.get(selectedConversation) || [];
        newConversations.set(selectedConversation, [...existingMessages, offerMessage]);
        return newConversations;
      });
      
      const success = sendMessage(offerMessage);
      if (success) {
        setOfferAmount("");
        setShowOfferModal(false);
        console.log("✅ Offer sent successfully");
      } else {
        console.error("❌ Failed to send offer");
        // Remove the offer message from local state if sending failed
        setMessages((prev) => prev.filter(m => m !== offerMessage));
        setConversations((prev) => {
          const newConversations = new Map(prev);
          const existingMessages = newConversations.get(selectedConversation) || [];
          newConversations.set(selectedConversation, existingMessages.filter(m => m !== offerMessage));
          return newConversations;
        });
      }
    }
  };

  const getConversationDisplayName = (conversationId: string) => {
    const mockConv = mockConversations.find(conv => conv.id === conversationId);
    if (mockConv) {
      return `${mockConv.sellerName} - ${mockConv.listingTitle}`;
    }
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
                Array.from(conversations.keys()).map((conversationId) => {
                  const conversationMessages = conversations.get(conversationId) || [];
                  const lastMessage = conversationMessages[conversationMessages.length - 1];
                  const mockConv = mockConversations.find(conv => conv.id === conversationId);
                  
                  return (
                  <div
                    key={conversationId}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedConversation === conversationId ? "bg-purple-50 border-purple-200" : ""
                    }`}
                    onClick={() => setSelectedConversation(conversationId)}
                  >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm text-gray-900 truncate">
                            {mockConv?.sellerName || "Unknown Seller"}
                          </div>
                          <div className="text-xs text-gray-600 truncate mt-1">
                            {mockConv?.listingTitle || "Unknown Listing"}
                          </div>
                          {lastMessage && (
                            <div className="text-xs text-gray-500 mt-1 truncate">
                              {lastMessage.senderId === userId ? "You: " : ""}{lastMessage.content}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col items-end ml-2">
                          {lastMessage && (
                            <div className="text-xs text-gray-400">
                              {new Date(lastMessage.timestamp).toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </div>
                          )}
                          <div className="text-xs text-gray-400 mt-1">
                            {conversationMessages.length} msgs
                          </div>
                        </div>
                    </div>
                    </div>
                  );
                })
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
                        onClick={() => setShowOfferModal(true)}
                        disabled={!isConnected}
                        variant="outline"
                        className="px-4 py-3 border border-green-300 text-green-600 hover:bg-green-50 flex items-center space-x-2"
                      >
                        <DollarSign className="w-4 h-4" />
                        <span>Offer</span>
                      </Button>
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
      
      {/* Offer Modal */}
      {showOfferModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Make an Offer</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Offer Amount ($)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={offerAmount}
                  onChange={(e) => setOfferAmount(e.target.value)}
                  placeholder="Enter your offer amount"
                  className="w-full"
                  autoFocus
                />
              </div>
              <div className="flex space-x-3">
                <Button
                  onClick={handleMakeOffer}
                  disabled={!offerAmount || parseFloat(offerAmount) <= 0}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                >
                  Send Offer
                </Button>
                <Button
                  onClick={() => {
                    setShowOfferModal(false);
                    setOfferAmount("");
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 