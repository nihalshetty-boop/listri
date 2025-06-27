"use client";

import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedListings } from "@/components/home/FeaturedListings";
import { CategoryHighlights } from "@/components/home/CategoryHighlights";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Footer } from "@/components/home/Footer";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center w-full space-y-8 px-4 py-8">
      <section className="w-full max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Welcome to Listri</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">A modern marketplace for everyone.</p>
            <Button>Browse Listings</Button>
          </CardContent>
        </Card>
      </section>

      <HeroSection />
      <FeaturedListings />
      <CategoryHighlights />
      <HowItWorks />
      <Footer />
    </main>
  );
}
