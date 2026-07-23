import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Clean URLs for the standalone static pages in /public: link to /bookshelf
  // and /life-away (no .html); the files themselves keep their extension.
  async rewrites() {
    return [
      { source: "/bookshelf", destination: "/bookshelf.html" },
      { source: "/life-away", destination: "/life-away.html" },
    ];
  },
};

export default nextConfig;
