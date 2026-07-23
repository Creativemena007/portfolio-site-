import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/bookshelf", destination: "/bookshelf.html" },
      { source: "/life-away", destination: "/life-away.html" },
    ];
  },
};

export default nextConfig;
