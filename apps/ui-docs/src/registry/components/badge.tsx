import type { Metadata } from "next";
import { getComponentMetadata } from "@/services/metadata-service";
import { ComponentDocView } from "@/components/component-doc-view";
import {
  BADGE_VARIANTS,
  BADGE_PROPS,
  BADGE_CSS,
} from "@/registry/components/badge-doc-data";

export const metadata: Metadata = getComponentMetadata("badge");

/**
 * Ultra-thin page route wrapper for the Badge component documentation.
 * The shared demo card generates complete source from each preview.
 */
export default function BadgeDocPage() {
  return (
    <ComponentDocView
      component={{
        slug: "badge",
        title: "Badge",
        description:
          "Semantic status pill indicators supporting color variants, live presence dots (StatusBadge), and interactive filter chips (StatusChip).",
        category: "Data Display",
        variants: BADGE_VARIANTS,
        propsList: BADGE_PROPS,
        cssClasses: BADGE_CSS,
      }}
    />
  );
}
