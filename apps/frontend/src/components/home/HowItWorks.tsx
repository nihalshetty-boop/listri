"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Search, MessageSquare, CreditCard, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    icon: <Upload className="h-8 w-8" />,
    title: "Post Your Item",
    description: "Take photos, set your price, and list your item in minutes. It's that simple to start selling.",
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    icon: <Search className="h-8 w-8" />,
    title: "Browse & Discover",
    description: "Find amazing deals from local sellers. Search by category, price, or location to find exactly what you need.",
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    icon: <MessageSquare className="h-8 w-8" />,
    title: "Connect & Chat",
    description: "Message sellers directly through our secure chat system. Ask questions and negotiate prices safely.",
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    icon: <CreditCard className="h-8 w-8" />,
    title: "Buy & Sell Safely",
    description: "Complete transactions with confidence. Choose local pickup or secure payment options that work for you.",
    color: "text-orange-600",
    bgColor: "bg-orange-50"
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            How Listri Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of people buying and selling locally. It's simple, safe, and secure.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {steps.map((step, index) => (
            <Card key={index} className="bg-white shadow-sm border-0 hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-8 text-center relative">
                {/* Step Number */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className={`w-20 h-20 rounded-xl ${step.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                      <div className={step.color}>
                        {step.icon}
                      </div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-0 shadow-sm">
          <CardContent className="p-12 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-xl text-gray-600 mb-8">
                Join our community today and start buying and selling with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/post-item">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-medium text-base flex items-center space-x-2">
                    <span>Start Selling</span>
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/browse">
                  <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50 px-8 py-4 rounded-lg font-medium text-base">
                    Browse Items
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
