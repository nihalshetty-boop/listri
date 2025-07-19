"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, notFound } from "next/navigation";
import { RootState } from "@/store";
import Image from "next/image";
import Link from "next/link";
import { userListings } from "@/lib/userListings";
import ChatWidget from "@/components/ChatWidget";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, CreditCard, ArrowLeft, Tag, MapPin, Calendar, User } from "lucide-react";
import { createOrder, createCheckoutSession } from "@/lib/api";

type UnifiedListing = {
  id: string | number;
  title: string;
  description?: string;
  price: number;
  imageUrl: string;
  category: string;
  userId?: string;
  createdAt?: string;
  source?: "user" | "api";
};

export default function ListingDetailPage() {
  const { id } = useParams();
  const [listing, setListing] = useState<UnifiedListing | null>(null);
  const [loading, setLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);

  // Get listings from Redux store
  const reduxListings = useSelector((state: RootState) => state.listings.items);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const findListing = async () => {
      // First, check Redux store
      let foundListing = reduxListings.find((item) => item.id.toString() === id);
      
      if (foundListing) {
        setListing(foundListing);
        setLoading(false);
        return;
      }

      // Then check userListings
      const userListing = userListings.find((item) => item.id.toString() === id);
      
      if (userListing) {
        setListing(userListing);
        setLoading(false);
        return;
      }

      try {
        const backendRes = await fetch(`http://localhost:4000/api/listings`);
        if (backendRes.ok) {
          const allBackendListings = await backendRes.json();
          const backendMatch = allBackendListings.find(
            (item: any) => item.id.toString() === id
          );

          if (backendMatch) {
            setListing({ ...backendMatch, source: "user" });
            setLoading(false);
            return;
          }
        }
      } catch (error) {
        console.error("Failed to fetch listing from backend:", error);
      }

      // Finally, try to fetch from API
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (response.ok) {
          const apiListing = await response.json();
          const normalizedListing: UnifiedListing = {
            id: apiListing.id,
            title: apiListing.title,
            description: apiListing.description,
            price: apiListing.price,
            imageUrl: apiListing.image,
            category: apiListing.category,
            source: "api",
          };
          setListing(normalizedListing);
        } else {
          setListing(null);
        }
      } catch (error) {
        console.error("Failed to fetch listing from API:", error);
        setListing(null);
      } finally {
        setLoading(false);
      }
    };

    findListing();
  }, [id, reduxListings]);

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
              <Image
                src={listing.imageUrl}
                alt={listing.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-8">
            {/* Title and Price */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{listing.title}</h1>
              <p className="text-4xl lg:text-5xl font-bold text-purple-600 mb-6">
                ${listing.price.toFixed(2)}
              </p>
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
                  
                  {listing.createdAt && (
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-600">Posted:</span>
                      <span className="ml-2 font-medium text-gray-900">
                        {new Date(listing.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  
                  {listing.userId && (
                    <div className="flex items-center">
                      <User className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-600">Seller ID:</span>
                      <span className="ml-2 font-mono text-sm text-gray-900">{listing.userId}</span>
                    </div>
                  )}
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
                  {/* Only show Buy Now button for listings in our database */}
                  {listing.source === "user" && (
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

        {/* Chat Widget */}
        <ChatWidget
          listingId={listing.id.toString()}
          sellerId={listing.userId || "unknown"}
          sellerName={listing.userId || "Seller"}
          listingTitle={listing.title}
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
        />
      </div>
    </div>
  );
}
