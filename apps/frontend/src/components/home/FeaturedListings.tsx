"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

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
    <section className="w-full max-w-6xl px-4 py-12">
      <h2 className="text-2xl font-semibold mb-2 text-center">
        {selectedCategory
          ? `Category: ${selectedCategory}`
          : "Featured Listings"}
      </h2>

      {selectedCategory && (
        <div className="text-center mb-6">
          <Button
            variant="link"
            onClick={() => router.push("/")}
            className="text-sm"
          >
            Clear Filters
          </Button>
        </div>
      )}

      {loading ? (
        <p className="text-center text-gray-500">Loading listings...</p>
      ) : filteredListings.length === 0 ? (
        <p className="text-center text-gray-500">
          No listings found for this category.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredListings.map((item) => (
            <Link
              key={`${item.source}-${item.id}`}
              href={`/listing/${item.id.toString().replace("f_", "")}`}
              className="block hover:shadow-md transition"
            >
              <Card>
                <CardContent className="p-4">
                  <div className="relative w-full h-40 mb-4">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded"
                    />
                  </div>
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
