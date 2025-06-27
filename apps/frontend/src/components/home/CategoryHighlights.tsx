"use client";

import Link from "next/link";
import {
  Gem,
  Monitor,
  Shirt,
  ShoppingBag,
  Sofa,
  Book,
  Dumbbell,
  ToyBrick,
} from "lucide-react";

type Category = {
  id: string;
  name: string;
  icon: React.ReactNode;
};

const categories: Category[] = [
  { id: "electronics", name: "Electronics", icon: <Monitor className="h-6 w-6" /> },
  { id: "jewelery", name: "Jewelry", icon: <Gem className="h-6 w-6" /> },
  { id: "men's clothing", name: "Men's Clothing", icon: <Shirt className="h-6 w-6" /> },
  { id: "women's clothing", name: "Women's Clothing", icon: <ShoppingBag className="h-6 w-6" /> },
  { id: "home", name: "Home", icon: <Sofa className="h-6 w-6" /> },
  { id: "books", name: "Books", icon: <Book className="h-6 w-6" /> },
  { id: "sports", name: "Sports", icon: <Dumbbell className="h-6 w-6" /> },
  { id: "toys", name: "Toys", icon: <ToyBrick className="h-6 w-6" /> },
];

export function CategoryHighlights() {
  return (
    <section className="w-full max-w-6xl px-4 py-12">
      <h2 className="text-2xl font-semibold mb-6 text-center">Browse by Category</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/?category=${cat.id}`}
            className="rounded-lg border bg-muted p-4 text-center hover:shadow-md hover:bg-accent transition focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <div className="flex justify-center items-center h-12 w-12 mx-auto mb-2 rounded-full bg-white border">
              {cat.icon}
            </div>
            <p className="text-sm font-medium">{cat.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
