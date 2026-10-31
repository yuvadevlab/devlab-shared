"use client";

import React from "react";
import { Separator } from "@yuva-devlab/ui";
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
        <div className="w-full max-w-sm space-y-3 text-xs p-2">
          <div>
            <h4 className="font-semibold text-foreground text-sm">
              DevLab Microservices
            </h4>
            <p className="text-muted-foreground mt-0.5">
              Foundation cloud packages and design tokens.
            </p>
          </div>
          <Separator />
          <div>
            <p className="text-muted-foreground">
              Core foundation system built with Radix UI and enterprise tokens.
            </p>
          </div>
        </div>
      ),
      codeSnippet: `<div>
  <h4>DevLab Microservices</h4>
  <p>Foundation packages.</p>
  <Separator className="my-3" />
  <p>System details.</p>
</div>`,
    },
    {
      id: "vertical",
      title: "Vertical Inline Separators",
      description:
        "Separates inline elements such as header navigation links or toolbar buttons.",
      preview: (
        <div className="flex h-5 items-center space-x-3 text-xs p-4 border border-border rounded-xl bg-card">
          <span className="text-foreground font-medium">Packages</span>
          <Separator orientation="vertical" />
          <span className="text-muted-foreground hover:text-foreground cursor-pointer">
            Documentation
          </span>
          <Separator orientation="vertical" />
          <span className="text-muted-foreground hover:text-foreground cursor-pointer">
            Changelog
          </span>
          <Separator orientation="vertical" />
          <span className="text-muted-foreground hover:text-foreground cursor-pointer">
            GitHub
          </span>
        </div>
      ),
      codeSnippet: `<div className="flex h-5 items-center space-x-3 text-xs">
  <span>Packages</span>
  <Separator orientation="vertical" />
  <span>Documentation</span>
  <Separator orientation="vertical" />
  <span>GitHub</span>
</div>`,
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
