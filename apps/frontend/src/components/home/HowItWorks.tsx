"use client";

import { Upload, Search, MessageSquare, CreditCard, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: <Upload className="h-8 w-8" />,
    title: "Post Your Item",
    description: "Take photos, set your price, and list your item in minutes. It's that simple to start selling.",
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    icon: <Search className="h-8 w-8" />,
    title: "Browse & Discover",
    description: "Find amazing deals from local sellers. Search by category, price, or location to find exactly what you need.",
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    icon: <MessageSquare className="h-8 w-8" />,
    title: "Connect & Chat",
    description: "Message sellers directly through our secure chat system. Ask questions and negotiate prices safely.",
    color: "text-purple-600",
    bgColor: "bg-purple-50"
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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How Listri Works
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join thousands of people buying and selling locally. It's simple, safe, and secure.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                {/* Step Number */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className={`w-16 h-16 rounded-full ${step.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                      <div className={step.color}>
                        {step.icon}
                      </div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full transform -translate-y-1/2 z-20">
                    <ArrowRight className="w-6 h-6 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join our community today and start buying and selling with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-colors">
                Start Selling
              </button>
              <button className="bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 px-8 py-3 rounded-full font-semibold transition-colors">
                Browse Items
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
