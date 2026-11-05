import type { Metadata } from "next";
import { getComponentMetadata } from "@/services/metadata-service";
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
export default function HeadingDocPage() {
  return (
    <ComponentDocView
      component={{
        slug: "heading",
        title: "Heading",
        description:
          "Accessible heading primitive that decouples semantic DOM hierarchy (as='h1') from visual presentation styling (size='h3').",
        category: "General",
        variants: HEADING_VARIANTS,
        propsList: HEADING_PROPS,
        cssClasses: HEADING_CSS,
      }}
    />
  );
}
