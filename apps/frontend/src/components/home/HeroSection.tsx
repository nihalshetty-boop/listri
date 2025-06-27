"use client";

import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="w-full bg-white py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Buy, Sell, and Discover Great Deals on Listri
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          A modern, user-friendly marketplace for everyone.
        </p>
        <Button size="lg">Get Started</Button>
      </div>
    </section>
  );
}
