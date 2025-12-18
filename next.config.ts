import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "images.pexels.com",
        protocol: "https",
      },
      {
        hostname: "agile-tern-707.convex.cloud",
        protocol: "https",
      }
    ],
  },
};

export default nextConfig;
