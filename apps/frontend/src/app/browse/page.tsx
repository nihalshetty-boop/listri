"use client";

import { useState, useEffect } from "react";
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  MapPin, 
  SlidersHorizontal, 
  Star, 
  DollarSign, 
  Calendar,
  TrendingUp,
  X,
  ChevronDown,
  Check,
  Users,
  Truck,
  CreditCard,
  Handshake,
  MessageCircle,
  Eye,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { getListings } from "@/lib/api";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import EnhancedChatWidget from "@/components/EnhancedChatWidget";

interface Listing {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: string;
  location?: string;
  city?: string;
  state?: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  condition?: string;
  buyingMethod?: string;
  isSold: boolean;
  soldDate?: string;
  soldPrice?: number;
  views: number;
  favorites: number;
  negotiable: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    firstName?: string;
    lastName?: string;
    city?: string;
    country?: string;
    avatarUrl?: string;
  };
}

interface FilterState {
  search: string;
  category: string;
  priceRange: [number, number];
  location: string;
  sellerRating: number;
  condition: string[];
  buyingMethod: string[];
  showSold: boolean;
  negotiable: boolean | null;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export default function BrowsePage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'all',
    priceRange: [0, 10000],
    location: 'all',
    sellerRating: 0,
    condition: [],
    buyingMethod: [],
    showSold: false,
    negotiable: null,
    sortBy: 'date',
    sortOrder: 'desc'
  });

  const categories = [
    { id: 'all', name: 'All Categories', count: 1247 },
    { id: 'electronics', name: 'Electronics', count: 234 },
    { id: 'jewelry', name: 'Jewelry', count: 89 },
    { id: "men's clothing", name: "Men's Fashion", count: 156 },
    { id: "women's clothing", name: "Women's Fashion", count: 198 },
    { id: 'home', name: 'Home & Garden', count: 167 },
    { id: 'books', name: 'Books & Media', count: 78 },
    { id: 'sports', name: 'Sports & Outdoors', count: 134 },
    { id: 'toys', name: 'Toys & Games', count: 45 },
    { id: 'automotive', name: 'Automotive', count: 67 },
    { id: 'photography', name: 'Photography', count: 23 },
    { id: 'music', name: 'Music', count: 34 },
    { id: 'gaming', name: 'Gaming', count: 56 },
  ];

  const locations = [
    { id: 'all', name: 'All Locations', count: 1247 },
    { id: 'san-francisco', name: 'San Francisco, CA', count: 234 },
    { id: 'los-angeles', name: 'Los Angeles, CA', count: 198 },
    { id: 'new-york', name: 'New York, NY', count: 167 },
    { id: 'chicago', name: 'Chicago, IL', count: 134 },
    { id: 'miami', name: 'Miami, FL', count: 89 },
    { id: 'denver', name: 'Denver, CO', count: 67 },
    { id: 'seattle', name: 'Seattle, WA', count: 56 },
    { id: 'austin', name: 'Austin, TX', count: 45 },
  ];

  const conditions = [
    { id: 'new', name: 'New', count: 234 },
    { id: 'like-new', name: 'Like New', count: 456 },
    { id: 'good', name: 'Good', count: 345 },
    { id: 'fair', name: 'Fair', count: 123 },
    { id: 'poor', name: 'Poor', count: 89 },
  ];

  const buyingMethods = [
    { id: 'pickup', name: 'Local Pickup', icon: Handshake, count: 567 },
    { id: 'shipping', name: 'Shipping', icon: Truck, count: 234 },
    { id: 'both', name: 'Both Options', icon: Users, count: 446 },
  ];

  const sortOptions = [
    { id: 'date', name: 'Date Listed', icon: Calendar },
    { id: 'price', name: 'Price', icon: DollarSign },
    { id: 'popularity', name: 'Popularity', icon: TrendingUp },
    { id: 'rating', name: 'Seller Rating', icon: Star },
    { id: 'views', name: 'Most Viewed', icon: Users },
  ];

  // Fetch real listings from API
  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const data = await getListings();
        setListings(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
        // Set empty array on error
        setListings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const updateFilters = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleArrayFilter = (key: 'condition' | 'buyingMethod', value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value) 
        ? prev[key].filter(item => item !== value)
        : [...prev[key], value]
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      priceRange: [0, 10000],
      location: 'all',
      sellerRating: 0,
      condition: [],
      buyingMethod: [],
      showSold: false,
      negotiable: null,
      sortBy: 'date',
      sortOrder: 'desc'
    });
    setActiveFilters([]);
  };

  const handleOpenChat = (listing: Listing) => {
    setSelectedListing(listing);
    setIsChatOpen(true);
  };

  const filteredListings = listings.filter(listing => {
    const matchesSearch = !filters.search || 
      listing.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      listing.description.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesCategory = filters.category === 'all' || listing.category === filters.category;
    
    const matchesPrice = listing.price >= filters.priceRange[0] && listing.price <= filters.priceRange[1];
    
    const locationString = listing.location || listing.city || 'Location not specified';
    const matchesLocation = filters.location === 'all' || 
      locationString.toLowerCase().includes(filters.location.toLowerCase());
    
    // For now, we'll skip seller rating since we don't have that data yet
    const matchesSellerRating = true; // listing.sellerRating >= filters.sellerRating;
    
    const matchesCondition = filters.condition.length === 0 || 
      (listing.condition && filters.condition.includes(listing.condition));
    
    const matchesBuyingMethod = filters.buyingMethod.length === 0 || 
      (listing.buyingMethod && filters.buyingMethod.includes(listing.buyingMethod));
    
    const matchesSold = filters.showSold ? listing.isSold : !listing.isSold;
    
    const matchesNegotiable = filters.negotiable === null || listing.negotiable === filters.negotiable;

    return matchesSearch && matchesCategory && matchesPrice && matchesLocation && 
           matchesSellerRating && matchesCondition && matchesBuyingMethod && 
           matchesSold && matchesNegotiable;
  });

  const sortedListings = [...filteredListings].sort((a, b) => {
    let comparison = 0;
    
    switch (filters.sortBy) {
      case 'price':
        comparison = a.price - b.price;
        break;
      case 'date':
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;
      case 'popularity':
        comparison = b.views - a.views;
        break;
      case 'rating':
        comparison = b.sellerRating - a.sellerRating;
        break;
      case 'views':
        comparison = b.views - a.views;
        break;
      default:
        comparison = 0;
    }
    
    return filters.sortOrder === 'asc' ? comparison : -comparison;
  });

  const activeFilterCount = [
    filters.search && 'Search',
    filters.category !== 'all' && 'Category',
    filters.priceRange[0] > 0 || filters.priceRange[1] < 10000 ? 'Price' : null,
    filters.location !== 'all' && 'Location',
    filters.sellerRating > 0 && 'Seller Rating',
    filters.condition.length > 0 && 'Condition',
    filters.buyingMethod.length > 0 && 'Buying Method',
    filters.negotiable !== null && 'Negotiable',
    filters.showSold && 'Sold Items'
  ].filter(Boolean).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading listings...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Browse All Listings</h1>
          <p className="text-xl text-gray-600">Discover amazing deals from sellers in your area</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card className="bg-white shadow-sm border-0 sticky top-4">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">Filters</CardTitle>
                  <div className="flex items-center gap-2">
                    {activeFilterCount > 0 && (
                      <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full">
                        {activeFilterCount}
                      </span>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      Clear all
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
              {/* Search */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                    placeholder="Search listings..."
                      value={filters.search}
                      onChange={(e) => updateFilters('search', e.target.value)}
                      className="pl-10"
                  />
                </div>
              </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                    value={filters.category}
                    onChange={(e) => updateFilters('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                        {category.name} ({category.count})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="50"
                      value={filters.priceRange[0]}
                      onChange={(e) => updateFilters('priceRange', [parseInt(e.target.value), filters.priceRange[1]])}
                      className="w-full"
                    />
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="50"
                      value={filters.priceRange[1]}
                      onChange={(e) => updateFilters('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <select
                    value={filters.location}
                    onChange={(e) => updateFilters('location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  >
                    {locations.map(location => (
                      <option key={location.id} value={location.id}>
                        {location.name} ({location.count})
                    </option>
                  ))}
                </select>
              </div>

                {/* Seller Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Seller Rating: {filters.sellerRating > 0 ? `${filters.sellerRating}+` : 'Any'}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.1"
                    value={filters.sellerRating}
                    onChange={(e) => updateFilters('sellerRating', parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>

                {/* Condition */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                  <div className="space-y-2">
                    {conditions.map(condition => (
                      <label key={condition.id} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.condition.includes(condition.id)}
                          onChange={() => toggleArrayFilter('condition', condition.id)}
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {condition.name} ({condition.count})
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Buying Method */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Buying Method</label>
                  <div className="space-y-2">
                    {buyingMethods.map(method => {
                      const Icon = method.icon;
                      return (
                        <label key={method.id} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters.buyingMethod.includes(method.id)}
                            onChange={() => toggleArrayFilter('buyingMethod', method.id)}
                            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                          />
                          <Icon className="w-4 h-4 ml-2 text-gray-500" />
                          <span className="ml-2 text-sm text-gray-700">
                            {method.name} ({method.count})
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Additional Options */}
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.showSold}
                      onChange={(e) => updateFilters('showSold', e.target.checked)}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Show sold listings</span>
                  </label>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Negotiable</label>
                    <select
                      value={filters.negotiable === null ? 'any' : filters.negotiable.toString()}
                      onChange={(e) => {
                        const value = e.target.value === 'any' ? null : e.target.value === 'true';
                        updateFilters('negotiable', value);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    >
                      <option value="any">Any</option>
                      <option value="true">Negotiable</option>
                      <option value="false">Fixed Price</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Top Controls */}
            <Card className="bg-white shadow-sm border-0 mb-6">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  {/* Mobile Filter Toggle */}
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
                  </Button>

                  {/* Results Count */}
                  <div className="text-gray-600">
                    Showing <span className="font-semibold text-gray-900">{sortedListings.length}</span> of <span className="font-semibold text-gray-900">{listings.length}</span> listings
                  </div>

                  {/* Sort and View Controls */}
                  <div className="flex items-center gap-4">
                    {/* Sort */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Sort by:</span>
                      <select
                        value={filters.sortBy}
                        onChange={(e) => updateFilters('sortBy', e.target.value)}
                        className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        {sortOptions.map(option => (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateFilters('sortOrder', filters.sortOrder === 'asc' ? 'desc' : 'asc')}
                        className="p-1"
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform ${filters.sortOrder === 'asc' ? 'rotate-180' : ''}`} />
                      </Button>
                    </div>

                    {/* View Mode */}
                    <div className="flex items-center space-x-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'bg-purple-600 hover:bg-purple-700' : 'border-gray-300'}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-purple-600 hover:bg-purple-700' : 'border-gray-300'}
                >
                  <List className="w-4 h-4" />
                </Button>
                    </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Listings Grid/List */}
            {sortedListings.length === 0 ? (
          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No listings found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </CardContent>
          </Card>
        ) : (
          <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
          }>
                {sortedListings.map((listing) => (
              <div key={listing.id} className="relative">
                    <Link href={`/listing/${listing.id}`}>
                      <Card className={`bg-white shadow-sm border-0 hover:shadow-md transition-shadow cursor-pointer ${listing.isSold ? 'opacity-75' : ''}`}>
                  <CardContent className="p-0">
                    <div className={viewMode === 'grid' ? "p-4" : "p-6 flex gap-6"}>
                      {/* Image */}
                      <div className={viewMode === 'grid' 
                            ? "aspect-square bg-gray-200 rounded-lg mb-4 flex items-center justify-center overflow-hidden relative"
                            : "w-32 h-32 bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden relative"
                          }>
                            {listing.isSold && (
                              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
                                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                  SOLD
                                </span>
                              </div>
                            )}
                            <ImageWithFallback
                              src={listing.imageUrl}
                              alt={listing.title}
                              fill
                              className="object-cover"
                              objectFit="cover"
                            />
                      </div>
                      
                      {/* Content */}
                      <div className={viewMode === 'grid' ? "" : "flex-1"}>
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-semibold text-gray-900 line-clamp-2 text-lg flex-1">
                          {listing.title}
                        </h3>
                              {listing.negotiable && (
                                <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full ml-2">
                                  Negotiable
                                </span>
                              )}
                            </div>
                            
                            <div className="mb-3">
                              {listing.isSold ? (
                                <div>
                                  <p className="text-lg font-bold text-red-600">
                                    Sold for ${listing.soldPrice?.toFixed(2)}
                                  </p>
                                  <p className="text-sm text-gray-500 line-through">
                                    Originally ${listing.originalPrice?.toFixed(2)}
                                  </p>
                                </div>
                              ) : (
                                <div>
                                  <div className="flex items-center gap-2">
                                    <p className="text-2xl font-bold text-purple-600">
                          ${listing.price.toFixed(2)}
                        </p>
                                    {listing.originalPrice && (
                                      <p className="text-sm text-gray-500 line-through">
                                        ${listing.originalPrice.toFixed(2)}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                            
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {listing.description}
                        </p>
                            
                            <div className="space-y-2">
                        <div className="flex items-center text-gray-500 text-sm">
                          <MapPin className="w-4 h-4 mr-1" />
                                {listing.location || listing.city || 'Location not specified'}
                              </div>
                              
                              <div className="flex items-center text-gray-500 text-sm">
                                <span className="font-medium">{listing.user.name || listing.user.firstName || 'Unknown Seller'}</span>
                                <span className="mx-2">•</span>
                                <span className="text-xs text-gray-400">
                                  {new Date(listing.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                              
                              <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>{listing.views} views</span>
                                <span>{listing.favorites} favorites</span>
                                {listing.condition && (
                                  <span className="capitalize">{listing.condition}</span>
                                )}
                              </div>
                        </div>
                            
                            <div className="mt-3">
                          <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                            {listing.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              
              {/* Chat Button */}
              <Button
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleOpenChat(listing);
                }}
                className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
              </Button>
            </div>
            ))}
          </div>
        )}
          </div>
        </div>
      </div>
      
      {/* Enhanced Chat Widget */}
      {selectedListing && (
        <EnhancedChatWidget
          listing={selectedListing}
          sellerId={selectedListing.userId}
          isOpen={isChatOpen}
          onClose={() => {
            setIsChatOpen(false);
            setSelectedListing(null);
          }}
        />
      )}
    </div>
  );
} 