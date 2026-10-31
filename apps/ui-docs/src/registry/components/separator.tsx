"use client";

import React from "react";
import { Separator, Stack, Flex } from "@yuva-devlab/ui";
import { ComponentView, ComponentVariant } from "@/components/component-view";

/**
 * Documentation page for Separator component showcasing horizontal and vertical dividers.
 */
export default function SeparatorDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "horizontal",
      title: "Horizontal Content Divider",
      description:
        "Visually separates grouped sections of text or form field modules.",
      preview: (
        <Stack gap={3} className="dl-demo-frame dl-demo-frame--sm dl-demo-desc">
          <div>
            <h4 className="dl-demo-heading">DevLab Microservices</h4>
            <p className="dl-demo-desc">
              Foundation cloud packages and design tokens.
            </p>
          </div>
          <Separator />
          <div>
            <p className="dl-demo-desc">
              Core foundation system built with Radix UI and enterprise tokens.
            </p>
          </div>
        </Stack>
      ),
      codeSnippet: `<Stack gap={3}>
  <h4>DevLab Microservices</h4>
  <p>Foundation packages.</p>
  <Separator />
  <p>System details.</p>
</Stack>`,
    },
    {
      id: "vertical",
      title: "Vertical Inline Separators",
      description:
        "Separates inline elements such as header navigation links or toolbar buttons.",
      preview: (
        <Flex align="center" gap={3} className="dl-demo-box dl-demo-desc">
          <span className="dl-demo-heading">Packages</span>
          <Separator orientation="vertical" />
          <span className="dl-demo-desc">Documentation</span>
          <Separator orientation="vertical" />
          <span className="dl-demo-desc">Changelog</span>
          <Separator orientation="vertical" />
          <span className="dl-demo-desc">GitHub</span>
        </Flex>
      ),
      codeSnippet: `<Flex align="center" gap={3}>
  <span>Packages</span>
  <Separator orientation="vertical" />
  <span>Documentation</span>
  <Separator orientation="vertical" />
  <span>GitHub</span>
</Flex>`,
    },
  ];

  const propsList = [
    {
      name: "orientation",
      type: '"horizontal" | "vertical"',
      default: '"horizontal"',
      description: "Visual axis and aria-orientation attribute value.",
    },
    {
      name: "decorative",
      type: "boolean",
      default: "true",
      description:
        "Whether the separator is purely decorative or semantically divides landmark sections.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-separator",
      description: "Base rule line matching border-color variables.",
    },
    {
      name: ".dl-separator-horizontal",
      description: "Full-width 1px horizontal rule.",
    },
    {
      name: ".dl-separator-vertical",
      description: "Full-height 1px vertical column divider.",
    },
  ];

  return (
    <ComponentView
      title="Separator"
      description="Visually or semantically separates content, inspired by Ant Design's Divider."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
