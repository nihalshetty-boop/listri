"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Edit, Save, ArrowLeft, FileText, Tag, DollarSign, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

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

export default function EditItemPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/listings");
        const data = await res.json();
        const listing = data.find((item: any) => item.id === id);

        if (!listing) {
          console.error("Listing not found");
          router.push("/dashboard");
          return;
        }

        setValue("title", listing.title);
        setValue("description", listing.description || "");
        setValue("price", listing.price);
        setValue("imageUrl", listing.imageUrl);
        setValue("category", listing.category);
      } catch (err) {
        console.error("Error loading listing:", err);
        router.push("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id, router, setValue]);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`http://localhost:4000/api/listings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to update listing");

      router.push("/dashboard");
    } catch (err) {
      console.error("Failed to update listing:", err);
      alert("Failed to update listing. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading listing...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Edit Item</h1>
          <p className="text-xl text-gray-600">Update your listing details</p>
        </div>

        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-2xl font-semibold text-gray-900">Item Details</CardTitle>
            <p className="text-gray-600 mt-2">Update the information below to modify your listing</p>
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
                      <span>Updating...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      <span>Save Changes</span>
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
