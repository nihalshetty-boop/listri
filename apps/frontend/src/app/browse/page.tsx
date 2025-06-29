"use client";

import { useState, useEffect } from "react";
import { Search, Filter, Grid, List, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface Listing {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  location: string;
  imageUrl: string;
  createdAt: string;
}

export default function BrowsePage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'jewelery', name: 'Jewelry' },
    { id: "men's clothing", name: "Men's Fashion" },
    { id: "women's clothing", name: "Women's Fashion" },
    { id: 'home', name: 'Home & Garden' },
    { id: 'books', name: 'Books & Media' },
    { id: 'sports', name: 'Sports & Outdoors' },
    { id: 'toys', name: 'Toys & Games' },
    { id: 'automotive', name: 'Automotive' },
    { id: 'photography', name: 'Photography' },
    { id: 'music', name: 'Music' },
    { id: 'gaming', name: 'Gaming' },
  ];

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockListings: Listing[] = [
      {
        id: '1',
        title: 'iPhone 13 Pro - Excellent Condition',
        price: 799,
        description: 'Like new iPhone 13 Pro, 256GB, Pacific Blue. Includes original box and accessories.',
        category: 'electronics',
        location: 'San Francisco, CA',
        imageUrl: '/images/phone.jpg',
        createdAt: '2024-01-15'
      },
      {
        id: '2',
        title: 'Vintage Leather Jacket',
        price: 150,
        description: 'Authentic vintage leather jacket, size M, perfect condition.',
        category: "men's clothing",
        location: 'Los Angeles, CA',
        imageUrl: '/images/jacket.jpg',
        createdAt: '2024-01-14'
      },
      {
        id: '3',
        title: 'Gaming Laptop - RTX 3070',
        price: 1200,
        description: 'High-performance gaming laptop with RTX 3070, 16GB RAM, 512GB SSD.',
        category: 'electronics',
        location: 'New York, NY',
        imageUrl: '/images/laptop.jpg',
        createdAt: '2024-01-13'
      },
      {
        id: '4',
        title: 'Antique Dining Table Set',
        price: 800,
        description: 'Beautiful antique dining table with 6 chairs, solid wood construction.',
        category: 'home',
        location: 'Chicago, IL',
        imageUrl: '/images/table.jpg',
        createdAt: '2024-01-12'
      },
      {
        id: '5',
        title: 'Mountain Bike - Trek Marlin 7',
        price: 450,
        description: 'Excellent condition mountain bike, perfect for trails and commuting.',
        category: 'sports',
        location: 'Denver, CO',
        imageUrl: '/images/bike.jpg',
        createdAt: '2024-01-11'
      },
      {
        id: '6',
        title: 'Designer Handbag - Louis Vuitton',
        price: 1200,
        description: 'Authentic Louis Vuitton Neverfull bag, includes dust bag and authenticity card.',
        category: "women's clothing",
        location: 'Miami, FL',
        imageUrl: '/images/bag.jpg',
        createdAt: '2024-01-10'
      }
    ];

    setTimeout(() => {
      setListings(mockListings);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || listing.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading listings...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse All Listings</h1>
          <p className="text-gray-600">Discover amazing deals from sellers in your area</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search listings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredListings.length} of {listings.length} listings
          </p>
        </div>

        {/* Listings Grid/List */}
        {filteredListings.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No listings found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
          }>
            {filteredListings.map((listing) => (
              <Link key={listing.id} href={`/listing/${listing.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-0">
                    <div className={viewMode === 'grid' ? "p-4" : "p-6 flex gap-4"}>
                      {/* Image */}
                      <div className={viewMode === 'grid' 
                        ? "aspect-square bg-gray-200 rounded-lg mb-4 flex items-center justify-center"
                        : "w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center"
                      }>
                        <div className="text-gray-400 text-sm">Image</div>
                      </div>
                      
                      {/* Content */}
                      <div className={viewMode === 'grid' ? "" : "flex-1"}>
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                          {listing.title}
                        </h3>
                        <p className="text-2xl font-bold text-blue-600 mb-2">
                          ${listing.price}
                        </p>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                          {listing.description}
                        </p>
                        <div className="flex items-center text-gray-500 text-sm">
                          <MapPin className="w-4 h-4 mr-1" />
                          {listing.location}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 