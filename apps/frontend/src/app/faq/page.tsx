"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { useState } from "react";

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqs = [
    {
      category: "General",
      question: "What is Listri?",
      answer: "Listri is a modern marketplace platform that connects local buyers and sellers. It's designed to make buying and selling items in your community safe, easy, and convenient."
    },
    {
      category: "General",
      question: "Is Listri free to use?",
      answer: "Yes, Listri is free to browse and create listings. We only charge a small fee on successful sales to help maintain and improve our platform."
    },
    {
      category: "Account & Profile",
      question: "How do I create an account?",
      answer: "You can create an account by clicking 'Register' in the top navigation. You can sign up with your email and password, or use Google/GitHub OAuth for quick registration."
    },
    {
      category: "Account & Profile",
      question: "How do I verify my account?",
      answer: "Account verification helps build trust in our community. You can verify your account by providing a valid phone number and email address. Verified users receive a badge on their profile."
    },
    {
      category: "Buying",
      question: "How do I find items to buy?",
      answer: "You can browse items by category, use the search function, or explore featured listings on the homepage. You can also filter by price, location, and other criteria."
    },
    {
      category: "Buying",
      question: "How do I contact a seller?",
      answer: "Click the 'Contact Seller' button on any listing to open our secure chat system. You can ask questions about the item, negotiate price, and arrange meeting details."
    },
    {
      category: "Buying",
      question: "What should I do before meeting a seller?",
      answer: "Always ask detailed questions about the item's condition, request additional photos if needed, agree on a meeting location and time, and let someone know where you're going."
    },
    {
      category: "Selling",
      question: "How do I create a listing?",
      answer: "Click 'Post Item' in the navigation menu, fill out the form with your item details, upload clear photos, set a fair price, and choose the appropriate category."
    },
    {
      category: "Selling",
      question: "What makes a good listing?",
      answer: "Good listings include clear, well-lit photos from multiple angles, detailed descriptions of the item's condition, honest pricing, and prompt responses to buyer questions."
    },
    {
      category: "Selling",
      question: "How do I handle multiple interested buyers?",
      answer: "Respond to all inquiries promptly and fairly. Consider factors like who contacted you first, who can meet soonest, and who seems most serious about the purchase."
    },
    {
      category: "Safety & Security",
      question: "How can I stay safe when meeting buyers/sellers?",
      answer: "Always meet in public, well-lit locations like coffee shops, shopping centers, or police stations. Bring a friend if possible, meet during daylight hours, and trust your instincts."
    },
    {
      category: "Safety & Security",
      question: "What payment methods are safe?",
      answer: "Our secure payment system, cash in person, and verified bank transfers are the safest options. Avoid wire transfers to unknown accounts, gift cards, or cryptocurrency payments."
    },
    {
      category: "Safety & Security",
      question: "What should I do if I encounter a scam?",
      answer: "Stop all communication immediately, do not send any money or personal information, and report the incident to our support team at support@listri.com."
    },
    {
      category: "Payments & Fees",
      question: "What are Listri's fees?",
      answer: "We charge a small percentage fee on successful sales, typically 5-10% depending on the item category. The exact fee is clearly displayed before you complete the transaction."
    },
    {
      category: "Payments & Fees",
      question: "When do I pay the fees?",
      answer: "Fees are automatically deducted from the sale amount when the transaction is completed through our platform. For cash transactions, fees are charged separately."
    },
    {
      category: "Payments & Fees",
      question: "Are there any hidden costs?",
      answer: "No, all fees are clearly displayed upfront. There are no hidden costs or surprise charges. You'll always know exactly what you're paying before completing a transaction."
    },
    {
      category: "Communication",
      question: "How does the chat system work?",
      answer: "Our chat system allows secure communication between buyers and sellers. All messages are encrypted and stored on our platform for safety and dispute resolution if needed."
    },
    {
      category: "Communication",
      question: "Can I block or report users?",
      answer: "Yes, you can block users from contacting you and report suspicious behavior. Use the options in the chat interface or contact our support team for assistance."
    },
    {
      category: "Communication",
      question: "How do I know if a message is legitimate?",
      answer: "Legitimate users typically ask specific questions about the item, are willing to meet in person, and don't pressure you for personal information or unusual payment methods."
    },
    {
      category: "Technical Support",
      question: "What if I can't log into my account?",
      answer: "Try resetting your password using the 'Forgot Password' link. If that doesn't work, contact our support team at support@listri.com for assistance."
    },
    {
      category: "Technical Support",
      question: "How do I delete my account?",
      answer: "You can delete your account in your profile settings. Please note that this action is permanent and will remove all your listings and data from our platform."
    },
    {
      category: "Technical Support",
      question: "Is my personal information secure?",
      answer: "Yes, we take data security seriously. We use industry-standard encryption and never share your personal information with third parties without your consent."
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const categories = [...new Set(faqs.map(faq => faq.category))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
              Find quick answers to the most common questions about using Listri.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search FAQs..."
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Category Filter */}
        {!searchTerm && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Browse by Category</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSearchTerm(category)}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardContent className="p-0">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">
                        {faq.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                  </div>
                  {openItems.includes(index) ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                
                {openItems.includes(index) && (
                  <div className="px-6 pb-6">
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredFaqs.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No FAQ found</h3>
            <p className="text-gray-500 mb-4">
              We couldn't find any FAQs matching "{searchTerm}".
            </p>
            <button
              onClick={() => setSearchTerm("")}
              className="text-purple-600 hover:text-purple-700 font-semibold"
            >
              View all FAQs
            </button>
          </div>
        )}

        {/* Contact Support */}
        <div className="mt-16 text-center">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
              <p className="text-purple-100 mb-6">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/help" 
                  className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Visit Help Center
                </a>
                <a 
                  href="/contact" 
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
                >
                  Contact Support
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 