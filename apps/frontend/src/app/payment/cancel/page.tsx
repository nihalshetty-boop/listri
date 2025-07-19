"use client";
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function PaymentCancelPage() {
  return (
    <div className="max-w-md mx-auto mt-10 text-center space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="text-yellow-600 text-4xl mb-4">⚠</div>
        <h1 className="text-2xl font-semibold text-yellow-800 mb-2">
          Payment Cancelled
        </h1>
        <p className="text-yellow-700">
          Your payment was cancelled. No charges were made to your account.
        </p>
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