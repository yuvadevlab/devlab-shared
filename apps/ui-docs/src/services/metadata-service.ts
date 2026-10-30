import type { Metadata } from "next";
import { COMPONENTS_LIST } from "../config/components-meta";

/**
 * Generates SEO and social graph metadata for a component documentation page.
 *
 * @param slug - Component route slug
 * @returns Next.js Metadata object
 */
export function getComponentMetadata(slug: string): Metadata {
  const meta = COMPONENTS_LIST.find((c) => c.slug === slug);

  if (!meta) {
    return {
      title: "Component Not Found — DevLab UI",
      description: "The requested component documentation could not be found.",
    };
  }

  const title = `${meta.name} — DevLab UI Component`;
  const description = meta.description;

  return {
    title,
    description,
    keywords: meta.keywords,
    openGraph: {
      title,
      description,
      type: "article",
      siteName: "DevLab UI Design System",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
