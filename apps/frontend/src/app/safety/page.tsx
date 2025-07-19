"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Shield, AlertTriangle, Users, CreditCard, MapPin, Clock, Phone, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function SafetyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Safety First</h1>
            <p className="text-xl text-red-100 max-w-3xl mx-auto">
              Your safety is our top priority. Follow these guidelines to ensure secure and successful transactions on Listri.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Meeting Safety */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Meeting Safely</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Choose Safe Locations</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Police stations or courthouses</li>
                  <li>• Shopping mall parking lots</li>
                  <li>• Coffee shops or restaurants</li>
                  <li>• Bank lobbies</li>
                  <li>• Gas stations with cameras</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Timing Matters</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Meet during daylight hours</li>
                  <li>• Avoid late night meetings</li>
                  <li>• Choose busy times at public places</li>
                  <li>• Let someone know your plans</li>
                  <li>• Set a time limit for meetings</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Bring Company</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Bring a friend or family member</li>
                  <li>• Tell someone where you're going</li>
                  <li>• Share the meeting location</li>
                  <li>• Have someone call to check in</li>
                  <li>• Consider meeting in groups</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Payment Safety */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Payment Security</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <CreditCard className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Secure Payment Methods</h3>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">✅ Recommended</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Listri's secure payment system</li>
                      <li>• Cash in person</li>
                      <li>• Bank transfers (verified accounts)</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">❌ Avoid</h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• Wire transfers to unknown accounts</li>
                      <li>• Gift cards or cryptocurrency</li>
                      <li>• Overpayment scams</li>
                      <li>• Sharing bank account details</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Red Flags to Watch For</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>Buyer offers more than asking price</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>Requests to ship items before payment</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>Pressure to complete transaction quickly</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>Unusual payment methods or requests</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>Refuses to meet in public locations</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Communication Safety */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Safe Communication</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Using Listri Chat</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Keep all communication on our platform</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Ask detailed questions about the item</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Request additional photos if needed</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Agree on meeting details in advance</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Report suspicious behavior immediately</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">✅ Safe to Share</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• First name only</li>
                      <li>• General meeting location</li>
                      <li>• Item-specific questions</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">❌ Never Share</h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• Full address or home location</li>
                      <li>• Phone number (use platform chat)</li>
                      <li>• Financial information</li>
                      <li>• Social security number</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Emergency Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-red-50">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-red-800">Emergency</h3>
                <p className="text-red-600 font-semibold text-lg">911</p>
                <p className="text-gray-600 text-sm mt-2">Call immediately if you feel unsafe</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-blue-50">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-blue-800">Listri Support</h3>
                <p className="text-blue-600 font-semibold text-lg">support@listri.com</p>
                <p className="text-gray-600 text-sm mt-2">Report issues or suspicious activity</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-green-50">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-green-800">Local Police</h3>
                <p className="text-green-600 font-semibold text-lg">Non-Emergency</p>
                <p className="text-gray-600 text-sm mt-2">Report scams or fraud attempts</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-red-600 to-red-700 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Stay Safe, Stay Smart</h3>
              <p className="text-red-100 mb-6">
                Remember: If something feels wrong, trust your instincts and walk away. 
                Your safety is more important than any transaction.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/how-it-works" 
                  className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Learn More
                </Link>
                <Link 
                  href="/contact" 
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors"
                >
                  Contact Support
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 