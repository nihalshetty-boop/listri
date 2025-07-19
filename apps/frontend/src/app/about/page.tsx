import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Shield, Heart, TrendingUp, CheckCircle, Star } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Listri</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Listri is a modern buy-and-sell marketplace platform designed for simplicity and trust.
            Our mission is to help people discover great deals and safely exchange goods within their communities.
          </p>
        </div>

        {/* Mission Section */}
        <Card className="bg-white shadow-sm border-0 mb-12">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  We believe that everyone should have access to a safe, reliable, and user-friendly platform 
                  to buy and sell items. Whether you're decluttering your home, looking for a great deal, 
                  or starting a small business, Listri provides the tools and community you need.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Our platform combines cutting-edge technology with a focus on user experience, 
                  making it easy for anyone to list items, find what they're looking for, and 
                  complete transactions with confidence.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="w-64 h-64 bg-gradient-to-br from-purple-500 to-red-500 rounded-full flex items-center justify-center">
                  <Heart className="w-16 h-16 text-white" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Trust & Safety</h3>
              <p className="text-gray-600 text-sm">
                We prioritize the safety of our community with secure payments, 
                verified users, and comprehensive buyer protection.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Community First</h3>
              <p className="text-gray-600 text-sm">
                Building strong local communities where people can connect, 
                trade, and support each other in their buying and selling journey.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600 text-sm">
                Continuously improving our platform with the latest technology 
                to provide the best possible experience for our users.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <Card className="bg-white shadow-sm border-0 mb-12">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 text-center">Why Choose Listri?</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Easy to Use</h4>
                  <p className="text-gray-600 text-sm">Intuitive interface designed for users of all technical levels</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Secure Payments</h4>
                  <p className="text-gray-600 text-sm">Protected transactions with industry-standard security</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Real-time Chat</h4>
                  <p className="text-gray-600 text-sm">Instant messaging between buyers and sellers</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Local Focus</h4>
                  <p className="text-gray-600 text-sm">Connect with people in your area for easy meetups</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">No Hidden Fees</h4>
                  <p className="text-gray-600 text-sm">Transparent pricing with no surprise charges</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">24/7 Support</h4>
                  <p className="text-gray-600 text-sm">Help is always available when you need it</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">10K+</div>
              <div className="text-gray-600">Active Listings</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">5K+</div>
              <div className="text-gray-600">Happy Users</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">$2M+</div>
              <div className="text-gray-600">Total Sales</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">4.8</div>
              <div className="text-gray-600 flex items-center justify-center">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                User Rating
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="bg-white shadow-sm border-0">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
              Join thousands of users who are already buying and selling on Listri. 
              It only takes a few minutes to create your first listing or start browsing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium text-base">
                  Join Listri
                </Button>
              </Link>
              <Link href="/browse">
                <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-lg font-medium text-base">
                  Browse Listings
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
