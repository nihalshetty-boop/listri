"use client";

import Link from "next/link";
import {
  Smartphone,
  Monitor,
  Shirt,
  ShoppingBag,
  Sofa,
  Book,
  Dumbbell,
  ToyBrick,
  Car,
  Camera,
  Music,
  Gamepad2,
  ArrowRight,
  Search,
  Plus,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Category = {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  listingCount: number;
  popularItems: string[];
};

const categories: Category[] = [
  { 
    id: "electronics", 
    name: "Electronics", 
    description: "Smartphones, laptops, tablets, and all the latest tech gadgets",
    icon: <Smartphone className="h-8 w-8" />,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    listingCount: 1247,
    popularItems: ["iPhone", "MacBook", "Samsung Galaxy", "iPad", "Gaming Laptop"]
  },
  { 
    id: "jewelery", 
    name: "Jewelry", 
    description: "Fine jewelry, watches, and luxury accessories",
    icon: <ShoppingBag className="h-8 w-8" />,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    listingCount: 892,
    popularItems: ["Diamond Ring", "Gold Necklace", "Rolex Watch", "Pearl Earrings", "Silver Bracelet"]
  },
  { 
    id: "men's clothing", 
    name: "Men's Fashion", 
    description: "Clothing, shoes, and accessories for men",
    icon: <Shirt className="h-8 w-8" />,
    color: "text-green-600",
    bgColor: "bg-green-50",
    listingCount: 2156,
    popularItems: ["Leather Jacket", "Sneakers", "Suit", "Jeans", "T-Shirt"]
  },
  { 
    id: "women's clothing", 
    name: "Women's Fashion", 
    description: "Clothing, shoes, and accessories for women",
    icon: <ShoppingBag className="h-8 w-8" />,
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    listingCount: 3421,
    popularItems: ["Designer Bag", "Dress", "Heels", "Jeans", "Blouse"]
  },
  { 
    id: "home", 
    name: "Home & Garden", 
    description: "Furniture, decor, and everything for your home",
    icon: <Sofa className="h-8 w-8" />,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    listingCount: 1893,
    popularItems: ["Dining Table", "Sofa", "Garden Tools", "Kitchen Appliances", "Art"]
  },
  { 
    id: "books", 
    name: "Books & Media", 
    description: "Books, movies, music, and educational materials",
    icon: <Book className="h-8 w-8" />,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    listingCount: 756,
    popularItems: ["Fiction Books", "Textbooks", "Vinyl Records", "DVDs", "Magazines"]
  },
  { 
    id: "sports", 
    name: "Sports & Outdoors", 
    description: "Sports equipment, outdoor gear, and fitness items",
    icon: <Dumbbell className="h-8 w-8" />,
    color: "text-red-600",
    bgColor: "bg-red-50",
    listingCount: 1342,
    popularItems: ["Mountain Bike", "Tennis Racket", "Camping Gear", "Yoga Mat", "Running Shoes"]
  },
  { 
    id: "toys", 
    name: "Toys & Games", 
    description: "Toys, board games, and entertainment for all ages",
    icon: <Gamepad2 className="h-8 w-8" />,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    listingCount: 987,
    popularItems: ["LEGO Sets", "Board Games", "Action Figures", "Puzzles", "Video Games"]
  },
  { 
    id: "automotive", 
    name: "Automotive", 
    description: "Cars, motorcycles, parts, and automotive accessories",
    icon: <Car className="h-8 w-8" />,
    color: "text-gray-600",
    bgColor: "bg-gray-50",
    listingCount: 654,
    popularItems: ["Sedan", "SUV", "Motorcycle", "Car Parts", "Tires"]
  },
  { 
    id: "photography", 
    name: "Photography", 
    description: "Cameras, lenses, and photography equipment",
    icon: <Camera className="h-8 w-8" />,
    color: "text-teal-600",
    bgColor: "bg-teal-50",
    listingCount: 432,
    popularItems: ["DSLR Camera", "Mirrorless Camera", "Lenses", "Tripod", "Lighting"]
  },
  { 
    id: "music", 
    name: "Music", 
    description: "Musical instruments, equipment, and audio gear",
    icon: <Music className="h-8 w-8" />,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    listingCount: 567,
    popularItems: ["Guitar", "Piano", "Drums", "Microphone", "Amplifier"]
  },
  { 
    id: "gaming", 
    name: "Gaming", 
    description: "Video games, consoles, and gaming accessories",
    icon: <Gamepad2 className="h-8 w-8" />,
    color: "text-violet-600",
    bgColor: "bg-violet-50",
    listingCount: 789,
    popularItems: ["PlayStation", "Xbox", "Nintendo Switch", "Gaming PC", "Controllers"]
  },
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Browse by Category
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive categories to find exactly what you're looking for. 
            From electronics to fashion, home goods to sports equipment - we've got it all.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {categories.map((category) => (
            <Link key={category.id} href={`/browse?category=${category.id}`}>
              <Card className="bg-white shadow-sm border-0 hover:shadow-md transition-shadow duration-200 cursor-pointer group">
                <CardContent className="p-6">
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`flex items-center justify-center h-16 w-16 rounded-lg ${category.bgColor} group-hover:scale-110 transition-transform duration-200`}>
                      <div className={category.color}>
                        {category.icon}
                      </div>
                    </div>
                    <ArrowRight className={`w-5 h-5 ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-200`} />
                  </div>

                  {/* Category Info */}
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {category.description}
                    </p>
                    <p className="text-sm font-medium text-purple-600">
                      {category.listingCount.toLocaleString()} listings
                    </p>
                  </div>

                  {/* Popular Items */}
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-3">Popular items:</p>
                    <div className="flex flex-wrap gap-2">
                      {category.popularItems.slice(0, 3).map((item, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                        >
                          {item}
                        </span>
                      ))}
                      {category.popularItems.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{category.popularItems.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="bg-white shadow-sm border-0">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Can't find what you're looking for?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
              Browse all listings or post your own item to sell. Our community is always growing with new items being added daily.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/browse">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium text-base flex items-center space-x-2">
                  <Search className="w-5 h-5" />
                  <span>Browse All Listings</span>
                </Button>
              </Link>
              <Link href="/post-item">
                <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-lg font-medium text-base flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Start Selling</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 