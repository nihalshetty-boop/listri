"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Shield, Eye, Lock, Users, Database, Globe } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
            </p>
            <p className="text-blue-200 mt-4">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Information We Collect */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Information We Collect</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-blue-600">Personal Information</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Name and contact information</li>
                  <li>• Email address and phone number</li>
                  <li>• Profile information and preferences</li>
                  <li>• Payment information (processed securely)</li>
                  <li>• Profile photos and verification documents</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Database className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-green-600">Usage Information</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Browsing and search history</li>
                  <li>• Items viewed and favorited</li>
                  <li>• Transaction history</li>
                  <li>• Communication logs</li>
                  <li>• Device and browser information</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How We Use Information */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">How We Use Your Information</h2>
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-purple-600">Service Provision</h3>
                <p className="text-gray-600 mb-4">
                  We use your information to provide, maintain, and improve our marketplace services, including:
                </p>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Creating and managing your account</li>
                  <li>• Processing transactions and payments</li>
                  <li>• Facilitating communication between users</li>
                  <li>• Providing customer support</li>
                  <li>• Sending important service updates</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-purple-600">Safety and Security</h3>
                <p className="text-gray-600 mb-4">
                  Your information helps us maintain a safe and secure marketplace:
                </p>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Verifying user identities</li>
                  <li>• Preventing fraud and abuse</li>
                  <li>• Investigating suspicious activity</li>
                  <li>• Enforcing our terms of service</li>
                  <li>• Protecting against security threats</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-purple-600">Personalization</h3>
                <p className="text-gray-600 mb-4">
                  We use your information to personalize your experience:
                </p>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Recommending relevant items</li>
                  <li>• Showing personalized search results</li>
                  <li>• Tailoring notifications and alerts</li>
                  <li>• Improving our services based on usage patterns</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Information Sharing */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Information Sharing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Lock className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-red-600">We Do NOT Share</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Personal contact information</li>
                  <li>• Financial information</li>
                  <li>• Private messages</li>
                  <li>• Account passwords</li>
                  <li>• Verification documents</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-green-600">What Is Visible</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Public profile information</li>
                  <li>• Item listings and descriptions</li>
                  <li>• Public reviews and ratings</li>
                  <li>• General location (city/area)</li>
                  <li>• Account verification status</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Data Security */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Data Security</h2>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Encryption</h4>
                  <p className="text-sm text-gray-600">
                    All data is encrypted in transit and at rest using industry-standard protocols.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Access Control</h4>
                  <p className="text-sm text-gray-600">
                    Strict access controls ensure only authorized personnel can access your data.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Database className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Regular Audits</h4>
                  <p className="text-sm text-gray-600">
                    We regularly audit our security practices and update them as needed.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Your Rights */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Your Privacy Rights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-blue-600">Access and Control</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Access your personal information</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Update or correct your information</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Delete your account and data</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Export your data</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-blue-600">Communication Preferences</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Control email notifications</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Manage marketing communications</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Set privacy preferences</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Opt out of data collection</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Cookies and Tracking */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Cookies and Tracking</h2>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <p className="text-gray-600 mb-6">
                We use cookies and similar technologies to enhance your experience, analyze usage, and provide personalized content.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Essential Cookies</h4>
                  <p className="text-sm text-gray-600">
                    Required for basic site functionality and security. Cannot be disabled.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Analytics Cookies</h4>
                  <p className="text-sm text-gray-600">
                    Help us understand how users interact with our site to improve performance.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Marketing Cookies</h4>
                  <p className="text-sm text-gray-600">
                    Used to deliver relevant advertisements and measure campaign effectiveness.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <div className="text-center">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Questions About Privacy?</h3>
              <p className="text-blue-100 mb-6">
                If you have questions about this privacy policy or how we handle your data, please contact us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contact" 
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Contact Us
                </a>
                <a 
                  href="/cookies" 
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                >
                  Cookie Policy
                </a>
                <a 
                  href="/terms" 
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                >
                  Terms of Service
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 