"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { MapPin, Clock, Heart, Tag, ArrowRight } from "lucide-react";

export type Listing = {
  id: string | number;
  title: string;
  price: number;
  imageUrl: string;
  category: string;
  description?: string;
  createdAt?: string;
  userId?: string;
  source?: "user" | "api";
};

export function FeaturedListings() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const router = useRouter();

  useEffect(() => {
    const fetchAllListings = async () => {
      try {
        const [backendRes, fakeStoreRes] = await Promise.all([
          fetch("http://localhost:4000/api/listings"),
          fetch("https://fakestoreapi.com/products"),
        ]);

        const backendData: Listing[] = await backendRes.json();
        const fakeStoreData = await fakeStoreRes.json();

        const normalizedFakeStore: Listing[] = fakeStoreData.map((item: any) => ({
          id: `f_${item.id}`,
          title: item.title,
          price: item.price,
          imageUrl: item.image,
          category: item.category,
          description: item.description,
          source: "api" as const,
        }));

        const normalizedBackend = backendData.map((item) => ({
          ...item,
          source: "user" as const,
        }));

        setListings([...normalizedBackend, ...normalizedFakeStore]);
      } catch (err) {
        console.error("Error loading listings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllListings();
  }, []);

  const filteredListings = selectedCategory
    ? listings.filter(
        (item) =>
          item.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    : listings;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {selectedCategory
              ? `${selectedCategory} Items`
              : "Featured Listings"}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {selectedCategory
              ? `Discover amazing ${selectedCategory.toLowerCase()} items from our community`
              : "Discover amazing deals from our community of sellers"}
          </p>
          
          {selectedCategory && (
            <div className="mt-8">
              <Button
                variant="outline"
                onClick={() => router.push("/")}
                className="border-purple-300 text-purple-600 hover:bg-purple-50 px-6 py-3 rounded-lg font-medium"
              >
                View All Categories
              </Button>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : filteredListings.length === 0 ? (
          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No listings found</h3>
              <p className="text-gray-600">
                {selectedCategory
                  ? `No ${selectedCategory.toLowerCase()} items available at the moment.`
                  : "No listings available at the moment."}
              </p>
            </CardContent>
          </Card>
        ) : (
          /* Listings Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredListings.map((item) => (
              <Link
                key={`${item.source}-${item.id}`}
                href={`/listing/${item.id.toString().replace("f_", "")}`}
                className="group"
              >
                <Card className="bg-white shadow-sm border-0 hover:shadow-md transition-shadow duration-200">
                  <CardContent className="p-0">
                    {/* Image Container */}
                    <div className="relative aspect-square overflow-hidden rounded-t-lg">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-sm">
                          <Heart className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <span className="inline-flex items-center bg-white/90 backdrop-blur-sm text-gray-700 text-xs px-3 py-1 rounded-full font-medium">
                          <Tag className="w-3 h-3 mr-1" />
                          {item.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors text-lg">
                        {item.title}
                      </h3>
                      <div className="text-2xl font-bold text-gray-900 mb-4">
                        ${item.price.toFixed(2)}
                      </div>
                      
                      {/* Location and Time */}
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>Local pickup</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>2 hours ago</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* View More Button */}
        {!selectedCategory && filteredListings.length > 0 && (
          <div className="text-center mt-16">
            <Link href="/browse">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg text-lg font-medium flex items-center space-x-2">
                <span>View All Listings</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
