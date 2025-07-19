import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { ReduxProvider } from "@/components/ReduxProvider";
import ChatProviderWrapper from "@/components/ChatProviderWrapper";
import Header from "@/components/Header";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Listri - Buy & Sell Anything, Easily",
  description: "A modern marketplace for everyone. Buy, sell, and discover great deals on Listri.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-gray-50">
        <SessionProviderWrapper>
        <ReduxProvider>
          <ChatProviderWrapper>
            <Header />
              {children}
          </ChatProviderWrapper>
        </ReduxProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
