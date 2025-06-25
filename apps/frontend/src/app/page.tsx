import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <section className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Listri 🛒</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">A modern marketplace for everyone.</p>
          <Button>Browse Listings</Button>
        </CardContent>
      </Card>
    </section>
  );
}