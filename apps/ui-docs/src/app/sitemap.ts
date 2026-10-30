import type { MetadataRoute } from "next";
import { getAllComponentSlugs } from "../services/components-service";

/**
 * Server-generated sitemap indexing all 56 components and docs routes.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://devlab-ui.vercel.app";
  const slugs = getAllComponentSlugs();

  const componentRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${baseUrl}/components/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/docs/installation`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/docs/tokens`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...componentRoutes,
  ];
}
