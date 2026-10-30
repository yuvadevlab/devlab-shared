import type { Metadata } from "next";
import { getComponentMetadata } from "@/services/metadata-service";
import { highlightCode } from "@/services/highlight-service";
import { ComponentDocView } from "@/components/component-doc-view";
import { BUTTON_VARIANTS, BUTTON_PROPS, BUTTON_CSS } from "./button-doc-data";

export const metadata: Metadata = getComponentMetadata("button");

/**
 * Ultra-thin page route wrapper for the Button component documentation.
 * Follows the FinAI / OrchestrAI SSR architecture.
 */
export default async function ButtonDocPage() {
  const highlightedVariants = await Promise.all(
    BUTTON_VARIANTS.map(async (v) => ({
      ...v,
      highlightedHtml: await highlightCode(v.codeSnippet, "tsx"),
    })),
  );

  return (
    <ComponentDocView
      component={{
        slug: "button",
        title: "Button",
        description:
          "Primary interactive trigger for forms, dialogs, and actions. Showcasing all style variants, sizes, icon compositions, and disabled states.",
        category: "General",
        variants: highlightedVariants,
        propsList: BUTTON_PROPS,
        cssClasses: BUTTON_CSS,
      }}
    />
  );
}
