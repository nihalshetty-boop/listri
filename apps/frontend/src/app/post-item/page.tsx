"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Upload, Tag, DollarSign, FileText, Image as ImageIcon } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().min(1, "Price must be at least $1"),
  imageUrl: z.string().url("Please enter a valid image URL"),
  category: z.string().min(2, "Category is required"),
});

type FormValues = z.infer<typeof formSchema>;

const categories = [
  "Electronics",
  "Clothing",
  "Books",
  "Home & Garden",
  "Sports",
  "Toys",
  "Automotive",
  "Health & Beauty",
  "Music",
  "Gaming",
  "Photography",
  "Other"
];

export default function PostItemPage() {
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    if (!user) return;

    const newListing = {
      ...data,
      userId: user.id,
    };

    try {
      const response = await fetch("http://localhost:4000/api/listings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newListing),
      });

      if (!response.ok) {
        throw new Error("Failed to create listing");
      }

      router.push("/dashboard");
    } catch (err) {
      console.error("Failed to post listing:", err);
      alert("Failed to create listing. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Post a New Item</h1>
          <p className="text-xl text-gray-600">Share your item with the Listri community</p>
        </div>

        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-2xl font-semibold text-gray-900">Item Details</CardTitle>
            <p className="text-gray-600 mt-2">Fill in the details below to create your listing</p>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Item Title
                </label>
                <Input 
                  placeholder="Enter a descriptive title for your item"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base"
                  {...register("title")} 
                />
                {errors.title && (
                  <p className="text-sm text-red-500 mt-2">{errors.title.message}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Description
                </label>
                <Textarea 
                  placeholder="Describe your item in detail (condition, features, etc.)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base min-h-[120px]"
                  {...register("description")} 
                />
                {errors.description && (
                  <p className="text-sm text-red-500 mt-2">{errors.description.message}</p>
                )}
              </div>

              {/* Price and Category Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Price (USD)
                  </label>
                  <Input 
                    type="number" 
                    step="0.01" 
                    placeholder="0.00"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base"
                    {...register("price")} 
                  />
                  {errors.price && (
                    <p className="text-sm text-red-500 mt-2">{errors.price.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                    <Tag className="w-4 h-4 mr-2" />
                    Category
                  </label>
                  <select
                    {...register("category")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base bg-white"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-sm text-red-500 mt-2">{errors.category.message}</p>
                  )}
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Image URL
                </label>
                <Input 
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base"
                  {...register("imageUrl")} 
                />
                {errors.imageUrl && (
                  <p className="text-sm text-red-500 mt-2">{errors.imageUrl.message}</p>
                )}
                <p className="text-sm text-gray-500 mt-2">
                  Enter a direct link to an image of your item
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-medium text-base flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Creating Listing...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      <span>Create Listing</span>
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Tips Section */}
        <Card className="bg-white shadow-sm border-0 mt-8">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Tips for a Great Listing</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                <p>Use clear, high-quality images that show your item from multiple angles</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                <p>Write detailed descriptions including condition, dimensions, and any defects</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                <p>Set a competitive price by checking similar items in your area</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                <p>Respond quickly to buyer inquiries to increase your chances of selling</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
