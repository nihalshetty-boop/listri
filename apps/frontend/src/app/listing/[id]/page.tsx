"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, notFound } from "next/navigation";
import { RootState } from "@/store";
import Link from "next/link";
import EnhancedChatWidget from "@/components/EnhancedChatWidget";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, CreditCard, ArrowLeft, Tag, MapPin, Calendar, User, Eye, Heart } from "lucide-react";
import { createOrder, createCheckoutSession, getListings } from "@/lib/api";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

type Listing = {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  category: string;
  condition?: string;
  location?: string;
  city?: string;
  state?: string;
  buyingMethod?: string;
  negotiable: boolean;
  isSold: boolean;
  views: number;
  favorites: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: {
    id: string;
    name: string;
    email: string;
    firstName?: string;
    lastName?: string;
    city?: string;
    country?: string;
    avatarUrl?: string;
  };
};

export default function ListingDetailPage() {
  const { id } = useParams();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);

  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const allListings = await getListings();
        const foundListing = allListings.find((item) => item.id === id);
        
        if (foundListing) {
          setListing(foundListing);
        } else {
          setListing(null);
        }
      } catch (error) {
        console.error("Failed to fetch listing:", error);
        setListing(null);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading listing...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!listing) return notFound();

  const handleBuyNow = async () => {
    if (!user || !listing) return;
    
    setProcessingPayment(true);
    try {
      // Create order first
      const order = await createOrder({
        listingId: listing.id.toString(),
        priceAtOrder: listing.price,
        quantity: 1,
        status: 'PENDING'
      });

      // Create checkout session
      const { url } = await createCheckoutSession(order.id);
      
      // Redirect to Stripe checkout
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Failed to process payment. Please try again.');
    } finally {
      setProcessingPayment(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/browse" className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Browse
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <div>
            <div className="relative w-full h-96 lg:h-[500px] rounded-lg overflow-hidden bg-white shadow-sm">
              <ImageWithFallback
                src={listing.imageUrl}
                alt={listing.title}
                fill
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-8">
            {/* Title and Price */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{listing.title}</h1>
              <div className="flex items-center space-x-4 mb-6">
                <p className="text-4xl lg:text-5xl font-bold text-purple-600">
                  ${listing.price.toFixed(2)}
                </p>
                {listing.originalPrice && listing.originalPrice > listing.price && (
                  <p className="text-2xl lg:text-3xl font-medium text-gray-500 line-through">
                    ${listing.originalPrice.toFixed(2)}
                  </p>
                )}
              </div>
              
              {/* Engagement Stats */}
              <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>{listing.views} views</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Heart className="w-4 h-4" />
                  <span>{listing.favorites} favorites</span>
                </div>
                {listing.condition && (
                  <span className="capitalize bg-gray-100 px-2 py-1 rounded text-xs">
                    {listing.condition}
                  </span>
                )}
              </div>
            </div>

            {/* Category and Details */}
            <Card className="bg-white shadow-sm border-0">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Tag className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-gray-600">Category:</span>
                    <span className="ml-2 font-medium text-gray-900 capitalize">{listing.category}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-gray-600">Posted:</span>
                    <span className="ml-2 font-medium text-gray-900">
                      {new Date(listing.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-gray-600">Location:</span>
                    <span className="ml-2 font-medium text-gray-900">
                      {listing.location || listing.city || 'Location not specified'}
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <User className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-gray-600">Seller:</span>
                    <span className="ml-2 font-medium text-gray-900">
                      {listing.user.firstName && listing.user.lastName 
                        ? `${listing.user.firstName} ${listing.user.lastName}`
                        : listing.user.name}
                    </span>
                  </div>
                  
                  {listing.buyingMethod && (
                    <div className="flex items-center">
                      <span className="text-gray-600">Buying Method:</span>
                      <span className="ml-2 font-medium text-gray-900 capitalize">
                        {listing.buyingMethod}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center">
                    <span className="text-gray-600">Negotiable:</span>
                    <span className="ml-2 font-medium text-gray-900">
                      {listing.negotiable ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            {listing.description && (
              <Card className="bg-white shadow-sm border-0">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{listing.description}</p>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="space-y-4">
              {user ? (
                <>
                  {!listing.isSold && (
                    <Button
                      onClick={handleBuyNow}
                      disabled={processingPayment}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-lg font-medium text-lg flex items-center justify-center space-x-2"
                    >
                      {processingPayment ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-5 h-5" />
                          <span>Buy Now</span>
                        </>
                      )}
                    </Button>
                  )}
                  
                  {listing.isSold && (
                    <div className="w-full bg-gray-100 text-gray-600 py-4 px-6 rounded-lg font-medium text-lg text-center">
                      This item has been sold
                    </div>
                  )}
                  
                  <Button
                    onClick={() => setIsChatOpen(true)}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 px-6 rounded-lg font-medium text-lg flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Contact Seller</span>
                  </Button>
                  
                  <Link href="/messages">
                    <Button 
                      variant="outline" 
                      className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 py-4 px-6 rounded-lg font-medium text-lg flex items-center justify-center space-x-2"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>View Messages</span>
                    </Button>
                  </Link>
                </>
              ) : (
                <Link href="/login">
                  <Button 
                    variant="outline" 
                    className="w-full border-purple-300 text-purple-600 hover:bg-purple-50 py-4 px-6 rounded-lg font-medium text-lg"
                  >
                    Login to Buy or Contact Seller
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Chat Widget */}
        <EnhancedChatWidget
          listing={listing}
          sellerId={listing.userId}
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
        />
      </div>
    </div>
  );
}
