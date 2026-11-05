import type { Metadata } from "next";
import { getComponentMetadata } from "@/services/metadata-service";
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
export default function TextDocPage() {
  return (
    <ComponentDocView
      component={{
        slug: "text",
        title: "Text",
        description:
          "Standard body, caption, code, and metric typography primitive consuming cross-brand design tokens.",
        category: "General",
        variants: TEXT_VARIANTS,
        propsList: TEXT_PROPS,
        cssClasses: TEXT_CSS,
      }}
    />
  );
}
