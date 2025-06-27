import type { Listing } from "@/components/home/FeaturedListings";

export const userListings: Listing[] = [
  {
    id: 1001,
    title: "Bluetooth Speaker",
    price: 45.0,
    imageUrl: "/images/bluetooth.png",
    category: "electronics",
    source: "user",
  },
  {
    id: 1002,
    title: "Handmade Bracelet",
    price: 20.0,
    imageUrl: "/images/bracelet.png",
    category: "jewelery",
    source: "user" as const,
  },
];
