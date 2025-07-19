"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Search, MessageSquare, Phone, Mail, FileText, Shield, CreditCard, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const helpCategories = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Getting Started",
      description: "Learn the basics of buying and selling on Listri",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Payments & Billing",
      description: "Everything about payments, refunds, and fees",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Safety & Security",
      description: "How to stay safe while using our platform",
      color: "bg-red-100 text-red-600"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Communication",
      description: "Using chat, messaging, and notifications",
      color: "bg-purple-100 text-purple-600"
    }
  ];

  const faqs = [
    {
      category: "Getting Started",
      question: "How do I create my first listing?",
      answer: "To create your first listing, click on 'Post Item' in the navigation menu. Fill out the form with your item details, upload photos, set a price, and choose a category. Once submitted, your listing will be live on the marketplace."
    },
    {
      category: "Getting Started",
      question: "How do I contact a seller?",
      answer: "On any listing page, you'll find a 'Contact Seller' button. Click it to open our secure chat system where you can message the seller directly with questions about the item."
    },
    {
      category: "Payments & Billing",
      question: "What payment methods are accepted?",
      answer: "We accept credit cards, debit cards, and bank transfers through our secure payment system. For local transactions, cash payments are also common when meeting in person."
    },
    {
      category: "Payments & Billing",
      question: "Are there any fees for selling?",
      answer: "Listri charges a small percentage fee on successful sales. The exact fee depends on the item category and is clearly displayed before you complete the transaction."
    },
    {
      category: "Safety & Security",
      question: "How can I stay safe when meeting buyers/sellers?",
      answer: "Always meet in public, well-lit locations like coffee shops, shopping centers, or police stations. Bring a friend if possible, and trust your instincts. Never share personal financial information."
    },
    {
      category: "Safety & Security",
      question: "What should I do if I encounter a scam?",
      answer: "If you suspect a scam, stop all communication immediately and report it to our support team. Never send money or personal information to suspicious users."
    },
    {
      category: "Communication",
      question: "How do I know if a message is from a real user?",
      answer: "All messages on Listri go through our verification system. Users with verified profiles have a checkmark badge. Be cautious of users who refuse to meet in person or ask for unusual payment methods."
    },
    {
      category: "Communication",
      question: "Can I block or report a user?",
      answer: "Yes, you can block users from contacting you and report suspicious behavior. Use the options in the chat interface or contact our support team for assistance."
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Help Center</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Find answers to common questions and get the support you need to make the most of Listri.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for help articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Help Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Help Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {helpCategories.map((category, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                  <p className="text-gray-600 text-sm">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          
          {searchTerm && (
            <div className="text-center mb-8">
              <p className="text-gray-600">
                Showing {filteredFaqs.length} results for "{searchTerm}"
              </p>
            </div>
          )}

          <div className="space-y-6">
            {filteredFaqs.map((faq, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-purple-600 font-semibold text-sm">?</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {faq.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold mb-3 text-gray-900">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredFaqs.length === 0 && searchTerm && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No results found</h3>
              <p className="text-gray-500">
                Try searching with different keywords or browse our help categories above.
              </p>
            </div>
          )}
        </div>

        {/* Contact Support */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Still Need Help?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-blue-50">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-blue-800">Live Chat</h3>
                <p className="text-blue-600 font-semibold mb-3">Available 24/7</p>
                <p className="text-gray-600 text-sm mb-4">Get instant help from our support team</p>
                <Link 
                  href="/contact" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
                >
                  Start Chat
                </Link>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-green-50">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-green-800">Email Support</h3>
                <p className="text-green-600 font-semibold mb-3">support@listri.com</p>
                <p className="text-gray-600 text-sm mb-4">Get detailed responses within 24 hours</p>
                <Link 
                  href="/contact" 
                  className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors"
                >
                  Send Email
                </Link>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-purple-50">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-purple-800">Phone Support</h3>
                <p className="text-purple-600 font-semibold mb-3">1-800-LISTRI</p>
                <p className="text-gray-600 text-sm mb-4">Speak directly with our team</p>
                <Link 
                  href="/contact" 
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors"
                >
                  Call Now
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="text-center">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Additional Resources</h3>
              <p className="text-blue-100 mb-6">
                Explore our comprehensive guides and policies to learn more about using Listri safely and effectively.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/how-it-works" 
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  How It Works
                </Link>
                <Link 
                  href="/safety" 
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                >
                  Safety Guide
                </Link>
                <Link 
                  href="/terms" 
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                >
                  Terms of Service
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 