import type { Metadata } from "next";
import { getComponentMetadata } from "@/services/metadata-service";
import { highlightCode } from "@/services/highlight-service";
import { ComponentDocView } from "@/components/component-doc-view";
import {
  CALENDAR_VARIANTS,
  CALENDAR_PROPS,
  CALENDAR_CSS,
} from "./calendar-doc-data";

export const metadata: Metadata = getComponentMetadata("calendar");

/**
 * Ultra-thin page route wrapper for the Calendar component documentation.
 * Follows the FinAI / OrchestrAI SSR architecture with server syntax highlighting.
 */
export default async function CalendarDocPage() {
  const highlightedVariants = await Promise.all(
    CALENDAR_VARIANTS.map(async (v) => ({
      ...v,
      highlightedHtml: await highlightCode(v.codeSnippet, "tsx"),
    })),
  );

  return (
    <ComponentDocView
      component={{
        slug: "calendar",
        title: "Calendar",
        description:
          "A clean, accessible date field and calendar component for selecting dates and date ranges, inspired by Ant Design's Calendar.",
        category: "Data Entry",
        variants: highlightedVariants,
        propsList: CALENDAR_PROPS,
        cssClasses: CALENDAR_CSS,
      }}
    />
  );
}
