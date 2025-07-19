"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Bug, Lightbulb, Star, Send, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function FeedbackPage() {
  const [feedbackType, setFeedbackType] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const feedbackTypes = [
    {
      id: "general",
      title: "General Feedback",
      description: "Share your thoughts about Listri",
      icon: <MessageSquare className="w-6 h-6" />,
      color: "bg-blue-100 text-blue-600"
    },
    {
      id: "bug",
      title: "Bug Report",
      description: "Report technical issues or problems",
      icon: <Bug className="w-6 h-6" />,
      color: "bg-red-100 text-red-600"
    },
    {
      id: "feature",
      title: "Feature Request",
      description: "Suggest new features or improvements",
      icon: <Lightbulb className="w-6 h-6" />,
      color: "bg-green-100 text-green-600"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the feedback to your backend
    console.log({
      type: feedbackType,
      rating,
      subject,
      message,
      email
    });
    setSubmitted(true);
  };

  const resetForm = () => {
    setFeedbackType("");
    setRating(0);
    setSubject("");
    setMessage("");
    setEmail("");
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="border-0 shadow-lg max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
            <p className="text-gray-600 mb-6">
              Your feedback has been submitted successfully. We appreciate you taking the time to help us improve Listri.
            </p>
            <div className="space-y-3">
              <Button onClick={resetForm} className="w-full">
                Submit More Feedback
              </Button>
              <Button variant="outline" onClick={() => window.history.back()} className="w-full">
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Send Feedback</h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Help us improve Listri by sharing your thoughts, reporting issues, or suggesting new features. 
              Your feedback is invaluable to us.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Feedback Type Selection */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">What type of feedback do you have?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {feedbackTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setFeedbackType(type.id)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        feedbackType === type.id
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className={`w-12 h-12 ${type.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                        {type.icon}
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">{type.title}</h4>
                      <p className="text-sm text-gray-600">{type.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Overall Rating */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">How would you rate your experience with Listri?</h3>
                <div className="flex justify-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`p-2 rounded-lg transition-colors ${
                        rating >= star ? "text-yellow-500" : "text-gray-300"
                      }`}
                    >
                      <Star className="w-8 h-8 fill-current" />
                    </button>
                  ))}
                </div>
                <p className="text-center text-sm text-gray-600 mt-2">
                  {rating === 0 && "Click to rate"}
                  {rating === 1 && "Poor"}
                  {rating === 2 && "Fair"}
                  {rating === 3 && "Good"}
                  {rating === 4 && "Very Good"}
                  {rating === 5 && "Excellent"}
                </p>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <Input
                  id="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Brief summary of your feedback"
                  required
                  className="w-full"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Details *
                </label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    feedbackType === "bug" 
                      ? "Please describe the issue, steps to reproduce, and what you expected to happen..."
                      : feedbackType === "feature"
                      ? "Please describe the feature you'd like to see and how it would help you..."
                      : "Please share your thoughts, suggestions, or any other feedback..."
                  }
                  required
                  rows={6}
                  className="w-full"
                />
              </div>

              {/* Email (Optional) */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address (Optional)
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full"
                />
                <p className="text-sm text-gray-500 mt-1">
                  We'll only use this to follow up on your feedback if needed.
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <Button 
                  type="submit" 
                  disabled={!feedbackType || !subject || !message}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Feedback
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">We Read Everything</h3>
              <p className="text-sm text-gray-600">
                Every piece of feedback is reviewed by our team to help improve Listri.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Your Ideas Matter</h3>
              <p className="text-sm text-gray-600">
                Many of our best features started as user suggestions. Share your ideas!
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Bug className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quick Bug Fixes</h3>
              <p className="text-sm text-gray-600">
                We prioritize bug reports to ensure a smooth experience for all users.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Alternative Contact Methods */}
        <div className="mt-12 text-center">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-green-600 to-green-700 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Need Immediate Help?</h3>
              <p className="text-green-100 mb-6">
                For urgent issues or account problems, contact our support team directly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/help" 
                  className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Help Center
                </a>
                <a 
                  href="/contact" 
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
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