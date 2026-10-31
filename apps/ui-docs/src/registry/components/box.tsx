"use client";

import React from "react";
import { Box, Button } from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
} from "@/components/component-view";

export default function BoxDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "surface",
      title: "Card Surface Box",
      description: "Box with card background, padding, border, and elevation.",
      preview: (
        <Box
          p="6"
          bg="card"
          border
          radius="lg"
          shadow="md"
          className="w-full max-w-sm"
        >
          <h4 className="font-semibold text-sm mb-1">Encapsulated Surface</h4>
          <p className="text-xs text-muted-foreground mb-4">
            Zero Tailwind utility classes needed. Sourced from design tokens.
          </p>
          <Button size="sm" variant="default">
            Action
          </Button>
        </Box>
      ),
      codeSnippet: `<Box p="6" bg="card" border radius="lg" shadow="md">
  <h4>Encapsulated Surface</h4>
  <p>Zero Tailwind utility classes needed.</p>
  <Button size="sm">Action</Button>
</Box>`,
    },
    {
      id: "subtle",
      title: "Muted Surface",
      description:
        "Subtle background container with custom padding and rounded corners.",
      preview: (
        <Box p="4" bg="muted" radius="md" className="w-full max-w-sm text-xs">
          Token-driven muted background box.
        </Box>
      ),
      codeSnippet: `<Box p="4" bg="muted" radius="md">
  Token-driven muted background box.
</Box>`,
    },
  ];

  const propsList = [
    {
      name: "p",
      type: '"0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "10"',
      description: "Internal padding token mapped to --space-* CSS variables.",
    },
    {
      name: "bg",
      type: '"background" | "card" | "surface" | "surface-2" | "muted" | "transparent"',
      description: "Background surface token.",
    },
    {
      name: "border",
      type: "boolean",
      default: "false",
      description: "Whether to render a 1px border using var(--border).",
    },
    {
      name: "radius",
      type: '"none" | "sm" | "md" | "lg" | "xl" | "full"',
      description: "Border radius token mapped to --radius-* CSS variables.",
    },
    {
      name: "shadow",
      type: '"none" | "sm" | "md" | "lg" | "glass"',
      description: "Elevation shadow scale token.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-box",
      description: "Base bounding container in @layer dl-layout.",
    },
  ];

  return (
    <ComponentView
      title="Box"
      description="Primitive bounding container for padding, borders, shadows, and surfaces in @layer dl-layout."
      category="Layout"
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
