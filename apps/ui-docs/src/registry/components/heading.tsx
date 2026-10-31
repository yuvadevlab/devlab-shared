import type { Metadata } from "next";
import { getComponentMetadata } from "@/services/metadata-service";
import { highlightCode } from "@/services/highlight-service";
import { ComponentDocView } from "@/components/component-doc-view";
import {
  HEADING_VARIANTS,
  HEADING_PROPS,
  HEADING_CSS,
} from "@/registry/components/heading-doc-data";

export const metadata: Metadata = getComponentMetadata("heading");

/**
 * Page route wrapper for the Heading component documentation.
 */
export default async function HeadingDocPage() {
  const highlightedVariants = await Promise.all(
    HEADING_VARIANTS.map(async (v) => ({
      ...v,
      highlightedHtml: await highlightCode(v.codeSnippet, "tsx"),
    })),
  );

  return (
    <ComponentDocView
      component={{
        slug: "heading",
        title: "Heading",
        description:
          "Accessible heading primitive that decouples semantic DOM hierarchy (as='h1') from visual presentation styling (size='h3').",
        category: "General",
        variants: highlightedVariants,
        propsList: HEADING_PROPS,
        cssClasses: HEADING_CSS,
      }}
    />
  );
}
