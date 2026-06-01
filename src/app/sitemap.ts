import type { MetadataRoute } from "next";
import { articles } from "@/data/articles";
import { guides } from "@/data/guides";

const baseUrl = "https://presenteia.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date()
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date()
    },
    {
      url: `${baseUrl}/presentes`,
      lastModified: new Date()
    },
    ...articles.map((article) => ({
      url: `${baseUrl}/blog/${article.slug}`,
      lastModified: new Date(article.date)
    })),
    ...guides.map((guide) => ({
      url: `${baseUrl}/presentes/${guide.slug}`,
      lastModified: new Date()
    }))
  ];
}
