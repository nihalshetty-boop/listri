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

const formSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  price: z.coerce.number().min(1),
  imageUrl: z.string().url(),
  category: z.string().min(2),
});

type FormValues = z.infer<typeof formSchema>;

export default function PostItemPage() {
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
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
      // Optionally show a user-facing error
    }
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle>Post a New Item</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input placeholder="Title" {...register("title")} />
            {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}

            <Textarea placeholder="Description" {...register("description")} />
            {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}

            <Input placeholder="Price (USD)" type="number" step="0.01" {...register("price")} />
            {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}

            <Input placeholder="Image URL" {...register("imageUrl")} />
            {errors.imageUrl && <p className="text-sm text-red-500">{errors.imageUrl.message}</p>}

            <Input placeholder="Category" {...register("category")} />
            {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}

            <Button type="submit" className="w-full">
              Post Item
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
