import type { Metadata } from "next";
import { getComponentMetadata } from "@/services/metadata-service";
import { highlightCode } from "@/services/highlight-service";
import { ComponentDocView } from "@/components/component-doc-view";
import {
  TEXT_VARIANTS,
  TEXT_PROPS,
  TEXT_CSS,
} from "@/registry/components/text-doc-data";

export const metadata: Metadata = getComponentMetadata("text");

/**
 * Page route wrapper for the Text component documentation.
 */
export default async function TextDocPage() {
  const highlightedVariants = await Promise.all(
    TEXT_VARIANTS.map(async (v) => ({
      ...v,
      highlightedHtml: await highlightCode(v.codeSnippet, "tsx"),
    })),
  );

  return (
    <ComponentDocView
      component={{
        slug: "text",
        title: "Text",
        description:
          "Standard body, caption, code, and metric typography primitive consuming cross-brand design tokens.",
        category: "General",
        variants: highlightedVariants,
        propsList: TEXT_PROPS,
        cssClasses: TEXT_CSS,
      }}
    />
  );
}
