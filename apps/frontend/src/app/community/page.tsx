"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Users, Heart, Shield, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Community Guidelines</h1>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
              Help us maintain a safe, respectful, and trustworthy marketplace for everyone. 
              These guidelines ensure that Listri remains a positive environment for buying and selling.
            </p>
            <p className="text-indigo-200 mt-4">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Core Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Respect</h3>
                <p className="text-gray-600 text-sm">
                  Treat everyone with kindness, dignity, and respect. We value diverse perspectives and backgrounds.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Safety</h3>
                <p className="text-gray-600 text-sm">
                  Prioritize your safety and the safety of others. Follow our safety guidelines and trust your instincts.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Honesty</h3>
                <p className="text-gray-600 text-sm">
                  Be truthful in your listings, communications, and transactions. Honesty builds trust in our community.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Do's and Don'ts */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Do's and Don'ts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-green-600 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  What to Do
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Be honest about item condition and history</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Take clear, accurate photos of your items</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Respond promptly to messages and inquiries</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Meet in safe, public locations</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Be respectful in all communications</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Report suspicious or inappropriate behavior</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Follow local laws and regulations</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Leave honest reviews after transactions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-red-600 flex items-center">
                  <XCircle className="w-5 h-5 mr-2" />
                  What Not to Do
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>List prohibited or illegal items</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>Use misleading photos or descriptions</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>Harass, threaten, or bully other users</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>Attempt to scam or defraud others</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>Share personal information without consent</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>Create multiple accounts to manipulate ratings</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>Use offensive or inappropriate language</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>Meet in unsafe or private locations</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Prohibited Items */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Prohibited Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-red-600">Illegal Items</h3>
                <ul className="space-y-1 text-gray-600 text-sm">
                  <li>• Drugs and controlled substances</li>
                  <li>• Weapons and ammunition</li>
                  <li>• Counterfeit goods</li>
                  <li>• Stolen property</li>
                  <li>• Items requiring special licenses</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-red-600">Dangerous Items</h3>
                <ul className="space-y-1 text-gray-600 text-sm">
                  <li>• Explosives and fireworks</li>
                  <li>• Hazardous chemicals</li>
                  <li>• Recalled products</li>
                  <li>• Items that could cause harm</li>
                  <li>• Unsafe or defective products</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-red-600">Inappropriate Content</h3>
                <ul className="space-y-1 text-gray-600 text-sm">
                  <li>• Adult content and services</li>
                  <li>• Hate speech materials</li>
                  <li>• Offensive or discriminatory items</li>
                  <li>• Items promoting violence</li>
                  <li>• Copyright-infringing content</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-red-600">Services & Digital Goods</h3>
                <ul className="space-y-1 text-gray-600 text-sm">
                  <li>• Professional services</li>
                  <li>• Digital downloads</li>
                  <li>• Gift cards and vouchers</li>
                  <li>• Subscription services</li>
                  <li>• Intangible items</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-red-600">Animals & Living Things</h3>
                <ul className="space-y-1 text-gray-600 text-sm">
                  <li>• Live animals</li>
                  <li>• Plants and seeds</li>
                  <li>• Animal products</li>
                  <li>• Endangered species</li>
                  <li>• Veterinary services</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-red-600">Personal Information</h3>
                <ul className="space-y-1 text-gray-600 text-sm">
                  <li>• Personal documents</li>
                  <li>• Financial information</li>
                  <li>• Medical records</li>
                  <li>• Government IDs</li>
                  <li>• Private data</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Communication Guidelines */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Communication Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-green-600">Appropriate Communication</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Be polite and professional</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Ask relevant questions about items</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Respond promptly to messages</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Use clear, respectful language</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Keep conversations focused on transactions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-red-600">Inappropriate Communication</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>Harassment or bullying</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>Offensive or discriminatory language</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>Spam or unsolicited messages</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>Personal attacks or threats</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>Attempts to circumvent platform rules</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enforcement */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Enforcement & Consequences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-yellow-600">1</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Warning</h3>
                <p className="text-gray-600 text-sm">
                  First-time violations may result in a warning and educational resources.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600">2</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Temporary Suspension</h3>
                <p className="text-gray-600 text-sm">
                  Repeated violations may lead to temporary account suspension.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-red-600">3</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Permanent Ban</h3>
                <p className="text-gray-600 text-sm">
                  Severe or repeated violations may result in permanent account termination.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-gray-600">4</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Legal Action</h3>
                <p className="text-gray-600 text-sm">
                  Illegal activities may be reported to law enforcement authorities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Reporting */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Reporting Violations</h2>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <p className="text-gray-600 mb-6">
                If you encounter someone violating our community guidelines, please report them immediately. 
                Your reports help us maintain a safe and trustworthy marketplace.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Report Users</h4>
                  <p className="text-sm text-gray-600">
                    Report users who violate our guidelines through the chat interface or contact form.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Report Listings</h4>
                  <p className="text-sm text-gray-600">
                    Flag inappropriate or prohibited items using the report button on listing pages.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Contact Support</h4>
                  <p className="text-sm text-gray-600">
                    Reach out to our support team for urgent safety concerns or complex issues.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Help Us Build a Better Community</h3>
              <p className="text-indigo-100 mb-6">
                By following these guidelines, you help create a safe, respectful, and trustworthy marketplace for everyone.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/safety" 
                  className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Safety Guide
                </Link>
                <Link 
                  href="/contact" 
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors"
                >
                  Report Issues
                </Link>
                <Link 
                  href="/help" 
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors"
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