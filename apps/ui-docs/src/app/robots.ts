import type { MetadataRoute } from "next";
import { resolveDocsBaseUrl } from "@/config/site.constants";

/**
 * Server-generated robots.txt for DevLab UI documentation.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${resolveDocsBaseUrl()}/sitemap.xml`,
  };
}
