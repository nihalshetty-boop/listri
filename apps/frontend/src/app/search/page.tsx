"use client";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Filter, Grid, List, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

type SearchResult = {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  category: string;
  condition?: string;
  location?: string;
  city?: string;
  views: number;
  favorites: number;
  isSold: boolean;
  user: {
    id: string;
    firstName: string;
    lastName: string;
  };
};

const TEST_LISTINGS: SearchResult[] = [
  {
    id: '1',
    title: 'Designer Handbag - Louis Vuitton',
    description: 'Beautiful luxury designer handbag in excellent condition',
    price: 500,
    originalPrice: 600,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
    category: "women's clothing",
    condition: 'Excellent',
    location: 'New York',
    city: 'New York',
    views: 150,
    favorites: 25,
    isSold: false,
    user: { id: '1', firstName: 'Sarah', lastName: 'Johnson' }
  },
  {
    id: '2',
    title: 'Mountain Bike - Trek Marlin 7',
    description: 'High-performance mountain bike perfect for trails',
    price: 800,
    originalPrice: 1000,
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64',
    category: 'sports',
    condition: 'Good',
    location: 'California',
    city: 'San Francisco',
    views: 200,
    favorites: 40,
    isSold: false,
    user: { id: '2', firstName: 'Mike', lastName: 'Chen' }
  },
  {
    id: '3',
    title: 'Gaming Laptop - RTX 3070',
    description: 'Powerful gaming laptop with RTX 3070 graphics',
    price: 1200,
    originalPrice: 1500,
    imageUrl: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5',
    category: 'electronics',
    condition: 'Like New',
    location: 'Texas',
    city: 'Austin',
    views: 300,
    favorites: 60,
    isSold: false,
    user: { id: '3', firstName: 'Alex', lastName: 'Rodriguez' }
  },
  {
    id: '4',
    title: 'Vintage Leather Jacket',
    description: 'Authentic vintage leather jacket from the 80s',
    price: 250,
    imageUrl: 'https://images.unsplash.com/photo-1544966503-7cc4a7f632b8',
    category: "men's clothing",
    condition: 'Fair',
    location: 'Oregon',
    city: 'Portland',
    views: 180,
    favorites: 35,
    isSold: false,
    user: { id: '4', firstName: 'Tom', lastName: 'Wilson' }
  },
  {
    id: '5',
    title: 'Antique Dining Table Set',
    description: 'Beautiful antique oak dining table with 6 chairs',
    price: 1200,
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7',
    category: 'home',
    condition: 'Good',
    location: 'Massachusetts',
    city: 'Boston',
    views: 120,
    favorites: 20,
    isSold: false,
    user: { id: '5', firstName: 'Emily', lastName: 'Davis' }
  },
  {
    id: '6',
    title: 'Professional Camera - Canon EOS',
    description: 'High-end DSLR camera for professional photography',
    price: 1800,
    originalPrice: 2200,
    imageUrl: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a',
    category: 'photography',
    condition: 'Excellent',
    location: 'Colorado',
    city: 'Denver',
    views: 250,
    favorites: 45,
    isSold: false,
    user: { id: '6', firstName: 'Lisa', lastName: 'Smith' }
  }
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [listings, setListings] = useState<SearchResult[]>(TEST_LISTINGS);
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>(TEST_LISTINGS);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'relevance' | 'price_low' | 'price_high' | 'newest'>('relevance');

  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || 'all';

  const categories = [
    'all',
    'electronics',
    'jewelry',
    "men's clothing",
    "women's clothing",
    'home',
    'books',
    'sports',
    'toys',
    'automotive',
    'photography',
    'music',
    'gaming'
  ];

  // Simple search function
  const performSearch = (searchQuery: string, searchCategory: string = 'all') => {
    let filtered = [...listings];

    // Filter by category
    if (searchCategory !== 'all') {
      filtered = filtered.filter(item => item.category === searchCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const searchTerm = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm)
      );
    }

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price_low':
          return a.price - b.price;
        case 'price_high':
          return b.price - a.price;
        case 'newest':
          return 0; // Would use createdAt if available
        case 'relevance':
        default:
          if (searchQuery.trim()) {
            const aTitleMatch = a.title.toLowerCase().includes(searchQuery.toLowerCase());
            const bTitleMatch = b.title.toLowerCase().includes(searchQuery.toLowerCase());
            if (aTitleMatch && !bTitleMatch) return -1;
            if (!aTitleMatch && bTitleMatch) return 1;
          }
          return 0;
      }
    });

    setFilteredResults(filtered);
  };

  // Update search results when query or category changes
  useEffect(() => {
    performSearch(query, category);
  }, [query, category, sortBy, listings]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {query ? `Search Results for "${query}"` : 'Browse All Listings'}
          </h1>
          <p className="text-xl text-gray-600">
            {filteredResults.length > 0 
              ? `Found ${filteredResults.length} result${filteredResults.length !== 1 ? 's' : ''}`
              : 'Find exactly what you\'re looking for'
            }
          </p>
        </div>

        {/* Filters and Controls */}
        <Card className="bg-white shadow-sm border-0 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              {/* Category Filter */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <select
                    value={category}
                    onChange={(e) => {
                      const url = new URL(window.location.href);
                      if (e.target.value === 'all') {
                        url.searchParams.delete('category');
                      } else {
                        url.searchParams.set('category', e.target.value);
                      }
                      window.location.href = url.toString();
                    }}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort Options */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                  </select>
                </div>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="flex items-center space-x-1"
                >
                  <Grid className="w-4 h-4" />
                  <span>Grid</span>
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="flex items-center space-x-1"
                >
                  <List className="w-4 h-4" />
                  <span>List</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* No Results */}
        {filteredResults.length === 0 && query && (
          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600 mb-4">We couldn't find any listings for "{query}"</p>
              <p className="text-sm text-gray-500">Try adjusting your search terms or browse our categories</p>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {filteredResults.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredResults.map((item) => (
              <Link 
                key={item.id} 
                href={`/listing/${item.id}`}
                className="group block"
              >
                <Card className={`bg-white shadow-sm border-0 hover:shadow-md transition-shadow duration-200 ${item.isSold ? 'opacity-75' : ''}`}>
                  <CardContent className="p-0">
                    <div className="relative h-48 rounded-t-lg overflow-hidden">
                      {item.isSold && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
                          <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                            SOLD
                          </span>
                        </div>
                      )}
                      <ImageWithFallback
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-purple-600">
                            ${item.price.toFixed(2)}
                          </span>
                          {item.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              ${item.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <span className="inline-flex items-center text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          <Tag className="w-3 h-3 mr-1" />
                          {item.category}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{item.location || item.city || 'Location not specified'}</span>
                        <span>{item.views} views</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State (no search yet) */}
        {filteredResults.length === 0 && !query && (
          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Your Search</h3>
              <p className="text-gray-600">Use the search bar in the header to find items you're looking for</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}