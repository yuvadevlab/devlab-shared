import type { Metadata } from "next";
import { getComponentMetadata } from "@/services/metadata-service";
import { ComponentDocView } from "@/components/component-doc-view";
import {
  BUTTON_VARIANTS,
  BUTTON_PROPS,
  BUTTON_CSS,
} from "@/registry/components/button-doc-data";

export const metadata: Metadata = getComponentMetadata("button");

/**
 * Ultra-thin page route wrapper for the Button component documentation.
 * Follows the FinAI / OrchestrAI SSR architecture.
 */
export default function ButtonDocPage() {
  return (
    <ComponentDocView
      component={{
        slug: "button",
        title: "Button",
        description:
          "Primary interactive trigger for forms, dialogs, and actions. Showcasing all style variants, sizes, icon compositions, and disabled states.",
        category: "General",
        variants: BUTTON_VARIANTS,
        propsList: BUTTON_PROPS,
        cssClasses: BUTTON_CSS,
      }}
    />
  );
}
