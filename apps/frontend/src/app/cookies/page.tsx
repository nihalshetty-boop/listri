"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Cookie, Shield, Settings, BarChart3, Target, Info } from "lucide-react";
import Link from "next/link";

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Cookie className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
            <p className="text-xl text-yellow-100 max-w-3xl mx-auto">
              Learn how we use cookies and similar technologies to enhance your experience on Listri.
            </p>
            <p className="text-yellow-200 mt-4">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* What Are Cookies */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">What Are Cookies?</h2>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Info className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-gray-600 mb-4">
                    Cookies are small text files that are stored on your device when you visit a website. 
                    They help websites remember information about your visit, such as your preferred language 
                    and other settings, which can make your next visit easier and the site more useful to you.
                  </p>
                  <p className="text-gray-600">
                    We use cookies and similar technologies to provide, protect, and improve our services, 
                    to understand how you use our platform, and to personalize your experience.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Types of Cookies */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Types of Cookies We Use</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-red-600">Essential Cookies</h3>
                <p className="text-gray-600 text-sm mb-4">
                  These cookies are necessary for the website to function properly and cannot be disabled.
                </p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Authentication and security</li>
                  <li>• Shopping cart functionality</li>
                  <li>• Basic site navigation</li>
                  <li>• Form submissions</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-blue-600">Analytics Cookies</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Help us understand how visitors interact with our website to improve performance.
                </p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Page views and navigation</li>
                  <li>• User behavior patterns</li>
                  <li>• Performance metrics</li>
                  <li>• Error tracking</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-green-600">Marketing Cookies</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Used to deliver relevant advertisements and measure campaign effectiveness.
                </p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Personalized ads</li>
                  <li>• Campaign tracking</li>
                  <li>• Social media integration</li>
                  <li>• Retargeting</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Settings className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-purple-600">Preference Cookies</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Remember your choices and preferences to provide a personalized experience.
                </p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Language preferences</li>
                  <li>• Display settings</li>
                  <li>• Search history</li>
                  <li>• Favorite items</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Cookie className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-orange-600">Functional Cookies</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Enable enhanced functionality and personalization of the website.
                </p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Chat functionality</li>
                  <li>• Social sharing</li>
                  <li>• Third-party integrations</li>
                  <li>• Advanced features</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <Info className="w-6 h-6 text-gray-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-600">Third-Party Cookies</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Set by external services we use to enhance our platform functionality.
                </p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Payment processors</li>
                  <li>• Analytics services</li>
                  <li>• Social media platforms</li>
                  <li>• Advertising networks</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Cookie Details */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Detailed Cookie Information</h2>
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-red-600">Essential Cookies (Required)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 font-semibold">Cookie Name</th>
                        <th className="text-left py-2 font-semibold">Purpose</th>
                        <th className="text-left py-2 font-semibold">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="py-2 font-mono text-xs">session_id</td>
                        <td className="py-2">Maintains your login session</td>
                        <td className="py-2">Session</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2 font-mono text-xs">csrf_token</td>
                        <td className="py-2">Protects against cross-site request forgery</td>
                        <td className="py-2">Session</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-mono text-xs">cart_id</td>
                        <td className="py-2">Stores your shopping cart items</td>
                        <td className="py-2">7 days</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-blue-600">Analytics Cookies (Optional)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 font-semibold">Cookie Name</th>
                        <th className="text-left py-2 font-semibold">Purpose</th>
                        <th className="text-left py-2 font-semibold">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="py-2 font-mono text-xs">_ga</td>
                        <td className="py-2">Google Analytics tracking</td>
                        <td className="py-2">2 years</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2 font-mono text-xs">_gid</td>
                        <td className="py-2">Google Analytics session tracking</td>
                        <td className="py-2">24 hours</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-mono text-xs">_gat</td>
                        <td className="py-2">Google Analytics request rate limiting</td>
                        <td className="py-2">1 minute</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-green-600">Marketing Cookies (Optional)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 font-semibold">Cookie Name</th>
                        <th className="text-left py-2 font-semibold">Purpose</th>
                        <th className="text-left py-2 font-semibold">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="py-2 font-mono text-xs">_fbp</td>
                        <td className="py-2">Facebook advertising tracking</td>
                        <td className="py-2">3 months</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-mono text-xs">ads_prefs</td>
                        <td className="py-2">Advertising preferences</td>
                        <td className="py-2">1 year</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Managing Cookies */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Managing Your Cookie Preferences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-blue-600">Browser Settings</h3>
                <p className="text-gray-600 mb-4">
                  You can control cookies through your browser settings. Here's how to manage them:
                </p>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• <strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                  <li>• <strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                  <li>• <strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                  <li>• <strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-blue-600">Cookie Consent</h3>
                <p className="text-gray-600 mb-4">
                  When you first visit our site, you'll see a cookie consent banner where you can:
                </p>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Accept all cookies</li>
                  <li>• Reject non-essential cookies</li>
                  <li>• Customize your preferences</li>
                  <li>• Learn more about each type</li>
                </ul>
                <p className="text-gray-600 mt-4 text-sm">
                  You can change your preferences at any time through our cookie settings.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Impact of Disabling Cookies */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Impact of Disabling Cookies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-red-600">Essential Cookies</h3>
                <p className="text-gray-600 mb-4">
                  <strong>Cannot be disabled</strong> - These are required for basic site functionality.
                </p>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• You won't be able to log in</li>
                  <li>• Shopping cart won't work</li>
                  <li>• Forms won't submit properly</li>
                  <li>• Security features will be disabled</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-orange-600">Optional Cookies</h3>
                <p className="text-gray-600 mb-4">
                  <strong>Can be disabled</strong> - But this may affect your experience.
                </p>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Less personalized content</li>
                  <li>• No saved preferences</li>
                  <li>• Generic advertisements</li>
                  <li>• Limited analytics data</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Updates and Contact */}
        <div className="text-center">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-yellow-600 to-yellow-700 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Questions About Cookies?</h3>
              <p className="text-yellow-100 mb-6">
                If you have questions about our use of cookies or want to update your preferences, please contact us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contact" 
                  className="bg-white text-yellow-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Contact Us
                </a>
                <a 
                  href="/privacy" 
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-yellow-600 transition-colors"
                >
                  Privacy Policy
                </a>
                <a 
                  href="/terms" 
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-yellow-600 transition-colors"
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