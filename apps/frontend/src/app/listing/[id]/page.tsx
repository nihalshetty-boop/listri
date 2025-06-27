"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, notFound } from "next/navigation";
import { RootState } from "@/store";
import Image from "next/image";
import Link from "next/link";
import { userListings } from "@/lib/userListings";

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

  // Get listings from Redux store
  const reduxListings = useSelector((state: RootState) => state.listings.items);

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
      <section className="max-w-4xl mx-auto px-4 py-12">
        <p className="text-center">Loading...</p>
      </section>
    );
  }

  if (!listing) return notFound();

  return (
    <section className="max-w-4xl mx-auto px-4 py-12 space-y-6">
      <div className="relative w-full h-64 sm:h-96 rounded overflow-hidden">
        <Image
          src={listing.imageUrl}
          alt={listing.title}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div>
        <h1 className="text-3xl font-bold">{listing.title}</h1>
        <p className="text-muted-foreground text-sm">{listing.category}</p>
        <p className="text-xl font-semibold mt-2">${listing.price.toFixed(2)}</p>
      </div>

      {listing.description && (
        <div>
          <p className="text-sm text-muted-foreground">{listing.description}</p>
        </div>
      )}

      {listing.createdAt && (
        <div>
          <p className="text-sm">Posted on: {new Date(listing.createdAt).toLocaleDateString()}</p>
        </div>
      )}

      {listing.userId && (
        <div>
          <p className="text-sm">
            Seller ID: <span className="font-mono text-muted-foreground">{listing.userId}</span>
          </p>
        </div>
      )}

      <div>
        <button
          disabled
          className="text-sm text-muted-foreground italic cursor-not-allowed"
        >
          Contact Seller (coming soon)
        </button>
      </div>

      <div className="mt-6">
        <Link href="/" className="text-sm underline text-blue-600 hover:text-blue-800">
          ← Back to Home
        </Link>
      </div>
    </section>
  );
}
