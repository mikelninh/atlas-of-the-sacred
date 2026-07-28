import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "commons.wikimedia.org" }],
  },
  trailingSlash: true,
};

export default nextConfig;
