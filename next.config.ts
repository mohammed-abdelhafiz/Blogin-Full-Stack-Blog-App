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
        hostname: "agile-tern-707.convex.cloud",//development
        protocol: "https",
      },
      {
        hostname: "groovy-dalmatian-476.convex.cloud",//production
        protocol: "https",
      }
    ],
  },
  cacheComponents:true,
};

export default nextConfig;
