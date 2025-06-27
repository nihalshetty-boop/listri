"use client";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { RootState } from "@/store";
import {
  deleteListing,
  selectUserListings,
} from "@/store/slices/listingsSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const listings = useSelector(
    user?.id ? selectUserListings(user.id) : () => []
  );

  const handleDelete = (id: string) => {
    dispatch(deleteListing(id));
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-12 space-y-10">
      {/* User Info */}
      <Card>
        <CardHeader>
          <CardTitle>Welcome, {user?.email ?? "User"}</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={() => router.push("/post-item")}>
            Post New Item
          </Button>
        </CardContent>
      </Card>

      {/* User Listings */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Your Listings</h2>

        {listings.length === 0 ? (
          <p className="text-muted-foreground text-sm">You haven't posted anything yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {listings.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="relative w-full h-40 mb-4">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded"
                    />
                  </div>
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    ${item.price.toFixed(2)}
                  </p>
                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/edit-item/${item.id}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </section>
  );
}
