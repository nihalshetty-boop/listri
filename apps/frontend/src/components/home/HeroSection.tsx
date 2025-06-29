"use client";

import { Button } from "@/components/ui/button";
import { Search, Plus, TrendingUp } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Buy, Sell, and
              <span className="block text-blue-200">Discover Great Deals</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join thousands of people buying and selling everything from electronics to furniture, 
              cars to clothing, and so much more.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder="What are you looking for?"
                className="w-full pl-12 pr-4 py-4 text-lg border-0 rounded-full focus:ring-4 focus:ring-white/20 focus:outline-none text-gray-900 placeholder-gray-500 bg-white"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full">
                Search
              </Button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/post-item">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-full flex items-center space-x-2 font-semibold">
                <Plus className="w-5 h-5" />
                <span>Start Selling</span>
              </Button>
            </Link>
            <Link href="/browse">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-full font-semibold">
                Browse Categories
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">10K+</div>
              <div className="text-blue-200">Active Listings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">5K+</div>
              <div className="text-blue-200">Happy Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">$2M+</div>
              <div className="text-blue-200">Total Sales</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
