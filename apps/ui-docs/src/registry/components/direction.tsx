"use client";

import { Direction } from "@yuva-devlab/ui";
import { ComponentView } from "@/components/component-view";

/**
 * Interactive documentation for Direction.
 */
export default function DirectionDoc() {
  return (
    <ComponentView
      title="Direction"
      category="Utility"
      description="Sets writing direction for a region and its descendants."
      preview={
        <Direction dir="rtl" lang="ar">
          مرحبا، كيف يمكنني مساعدتك؟
        </Direction>
      }
      codeSnippet={'<Direction dir="rtl" lang="ar">مرحبا</Direction>'}
      propsList={[
        {
          name: "dir",
          type: '"ltr" | "rtl"',
          default: "—",
          description: "Text direction applied to the region.",
        },
        {
          name: "children",
          type: "ReactNode",
          default: "—",
          description: "Content rendered in the requested direction.",
        },
      ]}
    />
  );
}
