"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Shield, MessageSquare, FileText, Clock, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

export default function DisputesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Dispute Resolution</h1>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto">
              We're here to help resolve conflicts and ensure fair transactions for all users. 
              Learn how to handle disputes and get the support you need.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Common Dispute Types */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Common Dispute Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <XCircle className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Item Not as Described</h3>
                <p className="text-gray-600 text-sm mb-4">
                  The item received doesn't match the listing description or photos.
                </p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Different condition than stated</li>
                  <li>• Missing features or parts</li>
                  <li>• Incorrect size or specifications</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">No-Show or Cancellation</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Buyer or seller fails to show up for the scheduled meeting.
                </p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Last-minute cancellations</li>
                  <li>• Repeated no-shows</li>
                  <li>• Unreasonable delays</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Payment Issues</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Problems with payment methods or transaction completion.
                </p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Payment not received</li>
                  <li>• Disputed charges</li>
                  <li>• Refund disagreements</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Communication Problems</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Issues with messaging, harassment, or inappropriate behavior.
                </p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Harassment or threats</li>
                  <li>• Spam or scams</li>
                  <li>• Unresponsive users</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Safety Concerns</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Suspicious behavior or safety threats during transactions.
                </p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Aggressive behavior</li>
                  <li>• Suspicious requests</li>
                  <li>• Safety threats</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Policy Violations</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Users violating Listri's terms of service or community guidelines.
                </p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Prohibited items</li>
                  <li>• Multiple accounts</li>
                  <li>• Terms violations</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Resolution Process */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Dispute Resolution Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Report the Issue</h3>
                <p className="text-gray-600 text-sm">
                  Contact our support team with detailed information about the dispute, including screenshots and evidence.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Investigation</h3>
                <p className="text-gray-600 text-sm">
                  Our team reviews all evidence and communication to understand the situation and determine the best resolution.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Mediation</h3>
                <p className="text-gray-600 text-sm">
                  We facilitate communication between parties to reach a mutually acceptable resolution when possible.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600">4</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Resolution</h3>
                <p className="text-gray-600 text-sm">
                  Final decision is made and implemented, which may include refunds, account actions, or other remedies.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How to Report */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How to Report a Dispute</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-orange-600">Required Information</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Listing ID or transaction details</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Clear description of the issue</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Screenshots of relevant messages</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Photos of items (if applicable)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Timeline of events</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Your preferred resolution</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-orange-600">Reporting Channels</h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">📧 Email Support</h4>
                    <p className="text-blue-600 font-semibold">disputes@listri.com</p>
                    <p className="text-sm text-blue-700 mt-1">For detailed disputes with evidence</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">💬 Live Chat</h4>
                    <p className="text-green-600 font-semibold">Available 24/7</p>
                    <p className="text-sm text-green-700 mt-1">For urgent safety concerns</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">📞 Phone Support</h4>
                    <p className="text-purple-600 font-semibold">1-800-LISTRI</p>
                    <p className="text-sm text-purple-700 mt-1">For complex disputes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Prevention Tips */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Preventing Disputes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-green-600">For Sellers</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Take clear, honest photos of your items</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Provide detailed, accurate descriptions</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Respond promptly to buyer questions</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Be honest about item condition and history</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Meet in safe, public locations</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-green-600">For Buyers</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Ask detailed questions before meeting</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Request additional photos if needed</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Inspect items thoroughly before paying</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Use secure payment methods</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Keep all communication on the platform</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-orange-600 to-orange-700 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Need to Report a Dispute?</h3>
              <p className="text-orange-100 mb-6">
                Our support team is here to help resolve conflicts and ensure fair outcomes for all users.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/contact" 
                  className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Report Dispute
                </Link>
                <Link 
                  href="/safety" 
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors"
                >
                  Safety Guide
                </Link>
                <Link 
                  href="/help" 
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors"
                >
                  Get Help
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 