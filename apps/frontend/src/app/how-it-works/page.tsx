"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ShoppingCart, MessageSquare, Shield, CreditCard } from "lucide-react";
import Link from "next/link";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">How Listri Works</h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Your complete guide to buying and selling safely on Listri. Learn how to navigate our marketplace, 
              connect with buyers and sellers, and make secure transactions.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* For Buyers Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">For Buyers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">1. Browse & Search</h3>
                <p className="text-gray-600">
                  Explore thousands of items in our marketplace. Use filters to find exactly what you're looking for.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">2. Contact Seller</h3>
                <p className="text-gray-600">
                  Message the seller directly through our secure chat system. Ask questions and negotiate prices.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">3. Verify & Meet</h3>
                <p className="text-gray-600">
                  Meet in a safe, public location. Verify the item condition before completing the transaction.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">4. Complete Purchase</h3>
                <p className="text-gray-600">
                  Pay securely through our platform or arrange cash payment. Leave a review after your purchase.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* For Sellers Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">For Sellers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Create Listing</h3>
                <p className="text-gray-600">
                  Take clear photos and write detailed descriptions. Set a fair price and choose your category.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Respond to Inquiries</h3>
                <p className="text-gray-600">
                  Answer buyer questions promptly. Be honest about item condition and history.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Arrange Meeting</h3>
                <p className="text-gray-600">
                  Choose a safe, public location. Bring the item and any relevant documentation.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">4</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Complete Sale</h3>
                <p className="text-gray-600">
                  Accept payment and hand over the item. Build your reputation with positive reviews.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Safety Tips Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Safety First</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-purple-600">Meeting Safely</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <ArrowRight className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                    <span>Always meet in a public, well-lit location</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <ArrowRight className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                    <span>Bring a friend or family member if possible</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <ArrowRight className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                    <span>Trust your instincts - if something feels wrong, walk away</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <ArrowRight className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                    <span>Meet during daylight hours when possible</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-purple-600">Payment Security</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <ArrowRight className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                    <span>Use our secure payment system when possible</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <ArrowRight className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                    <span>Be cautious of overpayment scams</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <ArrowRight className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                    <span>Verify cash authenticity before accepting</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <ArrowRight className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                    <span>Never share personal financial information</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-purple-100 mb-6">
                Join thousands of users buying and selling safely on Listri.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/browse" 
                  className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Browse Items
                </Link>
                <Link 
                  href="/post-item" 
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
                >
                  Sell Your Items
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 