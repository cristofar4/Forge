import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Remote photography is loaded directly in the browser (the build sandbox is
  // network-restricted), so we skip the server image optimizer and let the
  // browser fetch the real assets. See components/media/SmartImage.tsx.
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "assets.mixkit.co" },
    ],
  },
};

export default nextConfig;
