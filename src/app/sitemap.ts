import type { MetadataRoute } from "next";
import { articles } from "@/data/articles";
import { guides } from "@/data/guides";

const baseUrl = "https://presenteia.io";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9
    },
    {
      url: `${baseUrl}/presentes`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9
    },
    ...articles.map((article) => ({
      url: `${baseUrl}/blog/${article.slug}`,
      lastModified: new Date(article.date),
      changeFrequency: "monthly" as const,
      priority: 0.8
    })),
    ...guides.map((guide) => ({
      url: `${baseUrl}/presentes/${guide.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8
    }))
  ];
}
