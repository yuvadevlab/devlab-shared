import type { MetadataRoute } from "next";

/**
 * Server-generated robots.txt for DevLab UI documentation.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://devlab-ui.vercel.app/sitemap.xml",
  };
}
