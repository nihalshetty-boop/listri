"use client";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchBar from '@/components/SearchBar';
import { searchListings } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Tag } from 'lucide-react';

type SearchResult = {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  source?: string;
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || '';

  const categories = [
    'Electronics',
    'Clothing',
    'Books',
    'Home & Garden',
    'Sports',
    'Toys',
    'Automotive',
    'Health & Beauty'
  ];

  const handleSearch = async (query: string, category?: string) => {
    setLoading(true);
    setError('');
    
    try {
      const searchResults = await searchListings(query, category);
      setResults(searchResults);
    } catch (err: any) {
      setError(err.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery, initialCategory);
    }
  }, [initialQuery, initialCategory]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Search Results</h1>
          <p className="text-xl text-gray-600">Find exactly what you're looking for</p>
        </div>

        {/* Search Bar */}
        <Card className="bg-white shadow-sm border-0 mb-8">
          <CardContent className="p-6">
            <SearchBar onSearch={handleSearch} categories={categories} />
          </CardContent>
        </Card>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Searching...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-12 text-center">
              <div className="text-red-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Search Error</h3>
              <p className="text-red-600">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* No Results */}
        {!loading && !error && results.length === 0 && initialQuery && (
          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600 mb-4">We couldn't find any listings for "{initialQuery}"</p>
              <p className="text-sm text-gray-500">Try adjusting your search terms or browse our categories</p>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {!loading && !error && results.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-lg text-gray-600">
                Found <span className="font-semibold text-gray-900">{results.length}</span> result{results.length !== 1 ? 's' : ''} for <span className="font-semibold text-gray-900">"{initialQuery}"</span>
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {results.map((item) => (
                <Link 
                  key={item.id} 
                  href={`/listing/${item.id}`}
                  className="group block"
                >
                  <Card className="bg-white shadow-sm border-0 hover:shadow-md transition-shadow duration-200">
                    <CardContent className="p-0">
                      <div className="relative h-48 rounded-t-lg overflow-hidden">
                        <Image
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
                          <span className="text-xl font-bold text-purple-600">
                            ${item.price.toFixed(2)}
                          </span>
                          <span className="inline-flex items-center text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            <Tag className="w-3 h-3 mr-1" />
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Empty State (no search yet) */}
        {!loading && !error && results.length === 0 && !initialQuery && (
          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Your Search</h3>
              <p className="text-gray-600">Use the search bar above to find items you're looking for</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 