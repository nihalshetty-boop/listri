"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { MapPin, Clock, Heart } from "lucide-react";

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
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {selectedCategory
              ? `${selectedCategory} Items`
              : "Featured Listings"}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {selectedCategory
              ? `Discover amazing ${selectedCategory.toLowerCase()} items from our community`
              : "Discover amazing deals from our community of sellers"}
          </p>
          
          {selectedCategory && (
            <div className="mt-6">
              <Button
                variant="outline"
                onClick={() => router.push("/")}
                className="text-blue-600 border-blue-600 hover:bg-blue-50"
              >
                View All Categories
              </Button>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredListings.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No listings found</h3>
            <p className="text-gray-500">
              {selectedCategory
                ? `No ${selectedCategory.toLowerCase()} items available at the moment.`
                : "No listings available at the moment."}
            </p>
          </div>
        ) : (
          /* Listings Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredListings.map((item) => (
              <Link
                key={`${item.source}-${item.id}`}
                href={`/listing/${item.id.toString().replace("f_", "")}`}
                className="group"
              >
                <div className="marketplace-card group-hover:shadow-lg">
                  {/* Image Container */}
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                        <Heart className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span className="category-badge">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <div className="price-tag mb-3">
                      ${item.price.toFixed(2)}
                    </div>
                    
                    {/* Location and Time */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>Local pickup</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>2 hours ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* View More Button */}
        {!selectedCategory && filteredListings.length > 0 && (
          <div className="text-center mt-12">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold">
              View All Listings
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
