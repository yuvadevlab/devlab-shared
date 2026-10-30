import type { Metadata } from "next";
import { getComponentMetadata } from "../../../services/metadata-service";
import { highlightCode } from "../../../services/highlight-service";
import { ComponentDocView } from "../../../components/component-doc-view";
import { BADGE_VARIANTS, BADGE_PROPS, BADGE_CSS } from "./badge-doc-data";

export const metadata: Metadata = getComponentMetadata("badge");

/**
 * Ultra-thin page route wrapper for the Badge component documentation.
 * Follows the FinAI / OrchestrAI SSR architecture with server syntax highlighting.
 */
export default async function BadgeDocPage() {
  const highlightedVariants = await Promise.all(
    BADGE_VARIANTS.map(async (v) => ({
      ...v,
      highlightedHtml: await highlightCode(v.codeSnippet, "tsx"),
    })),
  );

  return (
    <ComponentDocView
      component={{
        slug: "badge",
        title: "Badge",
        description:
          "Semantic status pill indicators supporting color variants, live presence dots (StatusBadge), and interactive filter chips (StatusChip).",
        category: "Data Display",
        variants: highlightedVariants,
        propsList: BADGE_PROPS,
        cssClasses: BADGE_CSS,
      }}
    />
  );
}
