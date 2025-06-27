"use client";

import { Upload, Search, Handshake, CreditCard } from "lucide-react";

const steps = [
  {
    icon: <Upload className="h-6 w-6" />,
    title: "Post Your Item",
    description: "Easily list items for sale with photos, price, and details.",
  },
  {
    icon: <Search className="h-6 w-6" />,
    title: "Browse Listings",
    description: "Find great deals from real users across all categories.",
  },
  {
    icon: <Handshake className="h-6 w-6" />,
    title: "Connect & Reserve",
    description: "Message sellers or mark items as pending while negotiating.",
  },
  {
    icon: <CreditCard className="h-6 w-6" />,
    title: "Secure Payment",
    description: "Pay through integrated gateways or on pickup — your choice.",
  },
];

export function HowItWorks() {
  return (
    <section className="w-full max-w-6xl px-4 py-12">
      <h2 className="text-2xl font-semibold mb-10 text-center">How It Works</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {steps.map((step, index) => (
          <div
            key={index}
            className="rounded-lg border p-6 hover:shadow-md transition bg-muted"
          >
            <div className="flex justify-center items-center w-12 h-12 mx-auto mb-4 rounded-full bg-white border">
              {step.icon}
            </div>
            <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
