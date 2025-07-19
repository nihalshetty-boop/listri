"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
} from "lucide-react";

type Category = {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
};

const categories: Category[] = [
  { 
    id: "electronics", 
    name: "Electronics", 
    icon: <Smartphone className="h-6 w-6" />,
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  { 
    id: "jewelery", 
    name: "Jewelry", 
    icon: <ShoppingBag className="h-6 w-6" />,
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  { 
    id: "men's clothing", 
    name: "Men's Fashion", 
    icon: <Shirt className="h-6 w-6" />,
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  { 
    id: "women's clothing", 
    name: "Women's Fashion", 
    icon: <ShoppingBag className="h-6 w-6" />,
    color: "text-pink-600",
    bgColor: "bg-pink-50"
  },
  { 
    id: "home", 
    name: "Home & Garden", 
    icon: <Sofa className="h-6 w-6" />,
    color: "text-orange-600",
    bgColor: "bg-orange-50"
  },
  { 
    id: "books", 
    name: "Books & Media", 
    icon: <Book className="h-6 w-6" />,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50"
  },
  { 
    id: "sports", 
    name: "Sports & Outdoors", 
    icon: <Dumbbell className="h-6 w-6" />,
    color: "text-red-600",
    bgColor: "bg-red-50"
  },
  { 
    id: "toys", 
    name: "Toys & Games", 
    icon: <Gamepad2 className="h-6 w-6" />,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50"
  },
  { 
    id: "automotive", 
    name: "Automotive", 
    icon: <Car className="h-6 w-6" />,
    color: "text-gray-600",
    bgColor: "bg-gray-50"
  },
  { 
    id: "photography", 
    name: "Photography", 
    icon: <Camera className="h-6 w-6" />,
    color: "text-teal-600",
    bgColor: "bg-teal-50"
  },
  { 
    id: "music", 
    name: "Music", 
    icon: <Music className="h-6 w-6" />,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50"
  },
  { 
    id: "gaming", 
    name: "Gaming", 
    icon: <Gamepad2 className="h-6 w-6" />,
    color: "text-violet-600",
    bgColor: "bg-violet-50"
  },
];

export function CategoryHighlights() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Browse by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find exactly what you're looking for by exploring our curated categories
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/?category=${cat.id}`}
              className="group"
            >
              <Card className="bg-white shadow-sm border-0 hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-6 text-center">
                  <div className={`flex justify-center items-center h-16 w-16 mx-auto mb-4 rounded-lg ${cat.bgColor} group-hover:scale-110 transition-transform duration-200`}>
                    <div className={cat.color}>
                      {cat.icon}
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {cat.name}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Browse All Button */}
        <div className="text-center mt-16">
          <Link href="/categories">
            <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50 px-8 py-4 rounded-lg font-medium text-base flex items-center space-x-2">
              <span>Browse All Categories</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
