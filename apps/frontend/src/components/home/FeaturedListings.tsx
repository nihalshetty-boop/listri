"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { userListings } from "@/lib/userListings";

export type Listing = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  category: string;
  source?: "user" | "api"; 
};

export function FeaturedListings() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const router = useRouter();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();

        const normalizedApiListings: Listing[] = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          imageUrl: item.image,
          category: item.category,
          source: "api",
        }));

        const allListings = [...userListings, ...normalizedApiListings];
        setListings(allListings);
      } catch (err) {
        console.error("Failed to fetch listings", err);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
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
            <Card key={`${item.source}-${item.id}`}>
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
          ))}
        </div>
      )}
    </section>
  );
}
