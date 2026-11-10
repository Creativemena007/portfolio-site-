import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 only optimizes quality values on this allowlist (default [75]).
    // 40 is the "lite" rendition AdaptiveImage requests on slow / data-saver
    // connections; 75 is the default full-quality tier.
    qualities: [40, 75],
  },
  // The first publication launched at /publications/echo-to-council before
  // it was retitled. Keep the old address working for links already shared.
  async redirects() {
    return [
      {
        source: "/publications/echo-to-council",
        destination: "/publications/the-idea-was-right",
        permanent: true,
      },
    ];
  },
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
