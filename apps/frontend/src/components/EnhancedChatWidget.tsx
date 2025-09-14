"use client";

import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useChat, ChatMessage } from "@/contexts/ChatContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { 
  Star, 
  MessageSquare, 
  DollarSign, 
  User, 
  Package, 
  Check, 
  X, 
  Clock,
  MapPin,
  Eye,
  Heart
} from "lucide-react";

interface Listing {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  description: string;
  location?: string;
  city?: string;
  condition?: string;
  views: number;
  favorites: number;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    rating?: number;
    reviewCount?: number;
  };
}

interface Offer {
  id: string;
  buyerId: string;
  buyerName: string;
  amount: number;
  message?: string;
  status: 'pending' | 'accepted' | 'rejected' | 'countered';
  createdAt: string;
  counterOffer?: {
    amount: number;
    message?: string;
  };
}

interface EnhancedChatWidgetProps {
  listing: Listing;
  sellerId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function EnhancedChatWidget({
  listing,
  sellerId,
  isOpen,
  onClose,
}: EnhancedChatWidgetProps) {
  const [localMessages, setLocalMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [showMakeOffer, setShowMakeOffer] = useState(false);
  const [offerAmount, setOfferAmount] = useState("");
  const [offerMessage, setOfferMessage] = useState("");
  const [offers, setOffers] = useState<Offer[]>([]);
  const [showSellerProfile, setShowSellerProfile] = useState(false);
  const [showSellerListings, setShowSellerListings] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?.id || "anonymous";
  const isSeller = userId === sellerId;

  const { sendMessage, isConnected, isConnecting, connectionStatus, addMessageListener } = useChat();

  // Mock data for demo purposes
  const mockOffers: Offer[] = [
    {
      id: "1",
      buyerId: "buyer1",
      buyerName: "John Doe",
      amount: 750,
      message: "Would you consider $750? I can pick up today.",
      status: 'pending',
      createdAt: new Date().toISOString(),
    },
    {
      id: "2", 
      buyerId: "buyer2",
      buyerName: "Jane Smith",
      amount: 800,
      message: "Is $800 acceptable? I'm very interested.",
      status: 'countered',
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      counterOffer: {
        amount: 850,
        message: "How about $850? That's my best offer."
      }
    }
  ];

  const mockSellerListings: Listing[] = [
    {
      id: "2",
      title: "MacBook Pro 16-inch",
      price: 2000,
      originalPrice: 2500,
      imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop",
      description: "Excellent condition MacBook Pro",
      location: "New York, NY",
      city: "New York",
      condition: "Like-New",
      views: 234,
      favorites: 12,
      user: {
        id: sellerId,
        firstName: "Test",
        lastName: "Seller",
        rating: 4.8,
        reviewCount: 127
      }
    },
    {
      id: "3",
      title: "iPhone 14 Pro Max",
      price: 900,
      originalPrice: 1100,
      imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=1000&auto=format&fit=crop",
      description: "Unlocked iPhone 14 Pro Max",
      location: "New York, NY",
      city: "New York", 
      condition: "Excellent",
      views: 456,
      favorites: 23,
      user: {
        id: sellerId,
        firstName: "Test",
        lastName: "Seller",
        rating: 4.8,
        reviewCount: 127
      }
    }
  ];

  useEffect(() => {
    setOffers(mockOffers);
  }, []);

  // Listen for messages related to this conversation
  useEffect(() => {
    const unsubscribe = addMessageListener((msg: ChatMessage) => {
      if (msg.listingId === listing.id && 
          (msg.senderId === userId || msg.receiverId === userId) &&
          (msg.senderId === sellerId || msg.receiverId === sellerId)) {
        setLocalMessages(prev => [...prev, msg]);
      }
    });

    return unsubscribe;
  }, [addMessageListener, listing.id, userId, sellerId]);

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
        listingId: listing.id,
      };
      
      setLocalMessages(prev => [...prev, message]);
      
      const success = sendMessage(message);
      if (success) {
        setInput("");
      } else {
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

  const handleMakeOffer = () => {
    if (offerAmount && parseFloat(offerAmount) > 0) {
      const newOffer: Offer = {
        id: Date.now().toString(),
        buyerId: userId,
        buyerName: user?.name || "Buyer",
        amount: parseFloat(offerAmount),
        message: offerMessage,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      
      setOffers(prev => [...prev, newOffer]);
      setOfferAmount("");
      setOfferMessage("");
      setShowMakeOffer(false);
      
      // Send offer as a message
      const offerMessage: ChatMessage = {
        senderId: userId,
        senderName: user?.name || "Buyer",
        receiverId: sellerId,
        content: `Made an offer of $${parseFloat(offerAmount).toFixed(2)}${offerMessage ? ` - ${offerMessage}` : ''}`,
        listingId: listing.id,
      };
      
      setLocalMessages(prev => [...prev, offerMessage]);
    }
  };

  const handleOfferAction = (offerId: string, action: 'accept' | 'reject' | 'counter') => {
    setOffers(prev => prev.map(offer => {
      if (offer.id === offerId) {
        if (action === 'counter') {
          return { ...offer, status: 'countered' as const };
        }
        return { ...offer, status: action as 'accepted' | 'rejected' };
      }
      return offer;
    }));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[600px] z-50">
      <Card className="h-full flex flex-col bg-white shadow-xl">
        {/* Header with User Ratings */}
        <div className="p-4 border-b bg-gray-50 rounded-t-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                {listing.user.firstName[0]}{listing.user.lastName[0]}
              </div>
              <div>
                <h3 className="font-semibold text-sm">{listing.user.firstName} {listing.user.lastName}</h3>
                <div className="flex items-center space-x-1">
                  {renderStars(listing.user.rating || 4.5)}
                  <span className="text-xs text-gray-500">({listing.user.reviewCount || 127})</span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-6 w-6 p-0"
            >
              ×
            </Button>
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowSellerProfile(!showSellerProfile)}
              className="flex-1"
            >
              <User className="w-4 h-4 mr-1" />
              Profile
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowSellerListings(!showSellerListings)}
              className="flex-1"
            >
              <Package className="w-4 h-4 mr-1" />
              Listings
            </Button>
            {!isSeller && (
              <Button
                size="sm"
                onClick={() => setShowMakeOffer(true)}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <DollarSign className="w-4 h-4 mr-1" />
                Make Offer
              </Button>
            )}
          </div>
        </div>

        {/* Listing Display */}
        <div className="p-4 border-b bg-gray-50">
          <div className="flex space-x-3">
            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <ImageWithFallback
                src={listing.imageUrl}
                alt={listing.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm truncate">{listing.title}</h4>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-lg font-bold text-purple-600">
                  ${listing.price.toFixed(2)}
                </span>
                {listing.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    ${listing.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-3 text-xs text-gray-500 mt-1">
                <div className="flex items-center space-x-1">
                  <Eye className="w-3 h-3" />
                  <span>{listing.views}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Heart className="w-3 h-3" />
                  <span>{listing.favorites}</span>
                </div>
                {listing.location && (
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{listing.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Seller Profile Modal */}
        {showSellerProfile && (
          <div className="p-4 border-b bg-blue-50">
            <h5 className="font-semibold text-sm mb-2">Seller Profile</h5>
            <div className="text-xs text-gray-600 space-y-1">
              <p><strong>Name:</strong> {listing.user.firstName} {listing.user.lastName}</p>
              <p><strong>Rating:</strong> {listing.user.rating || 4.5}/5 ({listing.user.reviewCount || 127} reviews)</p>
              <p><strong>Member since:</strong> January 2023</p>
              <p><strong>Response time:</strong> Usually within 1 hour</p>
            </div>
          </div>
        )}

        {/* Seller Listings */}
        {showSellerListings && (
          <div className="p-4 border-b bg-green-50 max-h-32 overflow-y-auto">
            <h5 className="font-semibold text-sm mb-2">Other Listings</h5>
            <div className="space-y-2">
              {mockSellerListings.map((item) => (
                <div key={item.id} className="flex space-x-2 text-xs">
                  <div className="w-8 h-8 rounded overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{item.title}</p>
                    <p className="text-purple-600 font-semibold">${item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Make Offer Modal */}
        {showMakeOffer && (
          <div className="p-4 border-b bg-yellow-50">
            <h5 className="font-semibold text-sm mb-2">Make an Offer</h5>
            <div className="space-y-2">
              <Input
                type="number"
                placeholder="Offer amount"
                value={offerAmount}
                onChange={(e) => setOfferAmount(e.target.value)}
                className="text-sm"
              />
              <Input
                placeholder="Message (optional)"
                value={offerMessage}
                onChange={(e) => setOfferMessage(e.target.value)}
                className="text-sm"
              />
              <div className="flex space-x-2">
                <Button size="sm" onClick={handleMakeOffer} className="flex-1">
                  Send Offer
                </Button>
                <Button size="sm" variant="outline" onClick={() => setShowMakeOffer(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Offers Section */}
        {offers.length > 0 && (
          <div className="p-4 border-b bg-gray-50 max-h-32 overflow-y-auto">
            <h5 className="font-semibold text-sm mb-2">Recent Offers</h5>
            <div className="space-y-2">
              {offers.slice(-2).map((offer) => (
                <div key={offer.id} className="bg-white p-2 rounded border text-xs">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">${offer.amount.toFixed(2)} from {offer.buyerName}</p>
                      {offer.message && <p className="text-gray-600">{offer.message}</p>}
                    </div>
                    {isSeller && offer.status === 'pending' && (
                      <div className="flex space-x-1">
                        <Button size="sm" className="h-6 w-6 p-0 bg-green-600" onClick={() => handleOfferAction(offer.id, 'accept')}>
                          <Check className="w-3 h-3" />
                        </Button>
                        <Button size="sm" className="h-6 w-6 p-0 bg-red-600" onClick={() => handleOfferAction(offer.id, 'reject')}>
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                  {offer.status === 'accepted' && (
                    <p className="text-green-600 font-medium mt-1">✓ Offer Accepted</p>
                  )}
                  {offer.status === 'rejected' && (
                    <p className="text-red-600 font-medium mt-1">✗ Offer Rejected</p>
                  )}
                  {offer.counterOffer && (
                    <p className="text-blue-600 font-medium mt-1">
                      Counter: ${offer.counterOffer.amount.toFixed(2)}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

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
              className="flex-1 text-sm"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || !isConnected || isConnecting}
              size="sm"
            >
              <MessageSquare className="w-4 h-4" />
            </Button>
          </div>
          {connectionStatus !== "connected" && (
            <p className="text-xs mt-1 text-red-500">
              {connectionStatus === "connecting" ? "Connecting..." : "Disconnected"}
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}
