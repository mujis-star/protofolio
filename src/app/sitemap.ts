import { MetadataRoute } from "next";
import content from "@/data/content.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mujeeb-rahman-portfolio.vercel.app";

  const projectUrls = content.projects.map((project) => ({
    url: `${baseUrl}/projects/${project.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...projectUrls,
  ];
}
