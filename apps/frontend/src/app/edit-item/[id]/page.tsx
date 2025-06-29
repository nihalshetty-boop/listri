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

const formSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  price: z.coerce.number().min(1),
  imageUrl: z.string().url(),
  category: z.string().min(2),
});

type FormValues = z.infer<typeof formSchema>;

export default function EditItemPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

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
    }
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle>Edit Item</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading...</p>
          ) : (
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
                Save Changes
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
