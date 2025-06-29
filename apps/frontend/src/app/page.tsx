"use client";

import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedListings } from "@/components/home/FeaturedListings";
import { CategoryHighlights } from "@/components/home/CategoryHighlights";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Footer } from "@/components/home/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      <FeaturedListings />
      <CategoryHighlights />
      <HowItWorks />
      <Footer />
    </div>
  );
}
