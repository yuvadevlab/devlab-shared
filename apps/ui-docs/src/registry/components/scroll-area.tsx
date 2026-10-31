"use client";

import React from "react";
import { ScrollArea, ScrollBar } from "@yuva-devlab/ui";
import { ComponentView, ComponentVariant } from "@/components/component-view";

const mockTags = Array.from({ length: 25 }).map(
  (_, i, a) => `v1.2.0-rc.${a.length - i}`,
);

const horizontalTags = [
  "Frontend",
  "Design System",
  "TypeScript",
  "Radix UI",
  "Ant Design",
  "Next.js",
  "ESLint",
  "TurboRepo",
  "TailwindCSS",
  "Resilience",
];

/**
 * Documentation page for ScrollArea component showcasing vertical and horizontal scrolling.
 */
export default function ScrollAreaDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "vertical",
      title: "Vertical Scroll List",
      description:
        "Smooth vertical scroll area with custom styled thumb indicators.",
      preview: (
        <div className="w-full max-w-xs border border-border rounded-xl bg-card overflow-hidden shadow-xs">
          <div className="p-2.5 border-b border-border bg-muted/30">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Release Tags ({mockTags.length})
            </h4>
          </div>
          <ScrollArea className="h-44 p-3">
            <div className="space-y-1 font-mono text-xs">
              {mockTags.map((tag) => (
                <div
                  key={tag}
                  className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition cursor-pointer"
                >
                  {tag}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      ),
      codeSnippet: `<ScrollArea className="h-44 w-56 rounded-md border p-3">
  <div className="space-y-1">
    {tags.map((tag) => (
      <div key={tag} className="text-xs font-mono">{tag}</div>
    ))}
  </div>
</ScrollArea>`,
    },
    {
      id: "horizontal",
      title: "Horizontal Tag Ribbon",
      description:
        "Horizontal scroll viewport suitable for filter chip lists or breadcrumb segments.",
      preview: (
        <div className="w-full max-w-sm border border-border rounded-xl bg-card p-3 shadow-xs">
          <ScrollArea className="w-full whitespace-nowrap pb-2">
            <div className="flex gap-2">
              {horizontalTags.map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1 rounded-full text-xs font-medium border border-border bg-muted/40 text-foreground shrink-0 cursor-pointer hover:bg-primary hover:text-primary-foreground transition"
                >
                  {item}
                </span>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      ),
      codeSnippet: `<ScrollArea className="w-full whitespace-nowrap">
  <div className="flex gap-2">
    {tags.map(tag => (
      <span key={tag} className="px-2.5 py-1 rounded-full text-xs border">{tag}</span>
    ))}
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>`,
    },
  ];

  const propsList = [
    {
      name: "type",
      type: '"auto" | "always" | "scroll" | "hover"',
      default: '"hover"',
      description: "Visibility mode for showing the themed scrollbar.",
    },
    {
      name: "orientation",
      type: '"vertical" | "horizontal"',
      default: '"vertical"',
      description: "Scroll axis direction for the viewport.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-scroll-area",
      description: "Root scroll area wrapper.",
    },
    {
      name: ".dl-scroll-bar",
      description: "Custom scrollbar track and thumb elements.",
    },
  ];

  return (
    <ComponentView
      title="Scroll Area"
      description="Augments native scroll functionality for custom cross-browser styling with consistent scrollbar controls."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
