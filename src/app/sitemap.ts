import type { MetadataRoute } from "next";
import { getPublishedPosts, getPublishedProjects } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://frediant.com";
  const posts = getPublishedPosts();
  const projects = getPublishedProjects();

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/projects`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...(posts.length > 0
      ? [{
          url: `${base}/blog`,
          lastModified: new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.8,
        }]
      : []),
    ...projects.map((project) => ({
      url: `${base}/projects/${project.slug}`,
      lastModified: project.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...posts.map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
