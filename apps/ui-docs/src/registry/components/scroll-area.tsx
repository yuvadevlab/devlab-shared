"use client";

import React from "react";
import { ScrollArea, ScrollBar, Flex, Stack } from "@yuva-devlab/ui";
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
  "PlatformCSS",
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
        <div className="dl-demo-frame dl-demo-frame--xs dl-demo-box">
          <div className="dl-demo-box--collapsible-header">
            <h4 className="dl-demo-label">Release Tags ({mockTags.length})</h4>
          </div>
          <ScrollArea className="dl-demo-scroll-area">
            <Stack gap={1} className="dl-demo-code">
              {mockTags.map((tag) => (
                <div key={tag} className="dl-demo-sidebar-btn">
                  {tag}
                </div>
              ))}
            </Stack>
          </ScrollArea>
        </div>
      ),
      codeSnippet: `<ScrollArea className="dl-demo-scroll-area">
  <Stack gap="1">
    {tags.map((tag) => (
      <div key={tag}>{tag}</div>
    ))}
  </Stack>
</ScrollArea>`,
    },
    {
      id: "horizontal",
      title: "Horizontal Tag Ribbon",
      description:
        "Horizontal scroll viewport suitable for filter chip lists or breadcrumb segments.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--sm dl-demo-box">
          <ScrollArea className="dl-demo-frame">
            <Flex gap={2}>
              {horizontalTags.map((item) => (
                <span key={item} className="dl-variant-pill">
                  {item}
                </span>
              ))}
            </Flex>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      ),
      codeSnippet: `<ScrollArea className="dl-demo-frame">
  <Flex gap="2">
    {tags.map(tag => (
      <span key={tag} className="dl-variant-pill">{tag}</span>
    ))}
  </Flex>
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
