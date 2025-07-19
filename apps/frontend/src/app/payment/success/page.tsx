"use client";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // You can verify the payment here if needed
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="max-w-md mx-auto mt-10 text-center">
        <p>Verifying payment...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 text-center space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="text-green-600 text-4xl mb-4">✓</div>
        <h1 className="text-2xl font-semibold text-green-800 mb-2">
          Payment Successful!
        </h1>
        <p className="text-green-700">
          Your order has been confirmed and payment processed.
        </p>
        {sessionId && (
          <p className="text-sm text-gray-600 mt-2">
            Session ID: {sessionId}
          </p>
        )}
      </div>
      
      <div className="space-y-3">
        <Link href="/dashboard">
          <Button className="w-full">Go to Dashboard</Button>
        </Link>
        <Link href="/">
          <Button variant="outline" className="w-full">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
} 