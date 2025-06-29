import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['fakestoreapi.com', "placehold.co"],
  },
   experimental: {// ✅ Explicitly tell Next to use this
  },
  pageExtensions: ['ts', 'tsx'],
};

module.exports = nextConfig;