"use client";

import { Button } from "@/components/ui/button";
import { Search, Plus, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-red-600 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center">
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              Buy, Sell, and
              <span className="block text-purple-200">Discover Great Deals</span>
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              Join thousands of people buying and selling everything from electronics to furniture, 
              cars to clothing, and so much more in your local community.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder="What are you looking for?"
                className="w-full pl-16 pr-32 py-4 text-lg border-0 rounded-full focus:ring-4 focus:ring-white/20 focus:outline-none text-gray-900 placeholder-gray-500 bg-white shadow-lg"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-medium">
                Search
              </Button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link href="/post-item">
              <Button className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-10 py-4 rounded-full flex items-center space-x-3 font-semibold shadow-lg">
                <Plus className="w-6 h-6" />
                <span>Start Selling</span>
              </Button>
            </Link>
            <Link href="/browse">
              <Button className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 text-lg px-10 py-4 rounded-full font-semibold border-2 border-white/30">
                Browse Categories
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-3">10K+</div>
              <div className="text-purple-200 text-lg">Active Listings</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-3">5K+</div>
              <div className="text-purple-200 text-lg">Happy Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-3">$2M+</div>
              <div className="text-purple-200 text-lg">Total Sales</div>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-red-500"></div>
    </section>
  );
}
