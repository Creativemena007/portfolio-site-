import type { MetadataRoute } from "next";

import { SITE_URL } from "@/config/site";
import { PROJECTS } from "@/data/projects";
import { PUBLICATIONS } from "@/data/publications";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const projectPages: MetadataRoute.Sitemap = PROJECTS.map((p) => ({
    url: `${SITE_URL}/work/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projectPages,
    ...PUBLICATIONS.map((p) => ({
      url: `${SITE_URL}${p.href}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    // Standalone static pages in /public, served at clean URLs via rewrites.
    ...["/bookshelf", "/life-away"].map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
