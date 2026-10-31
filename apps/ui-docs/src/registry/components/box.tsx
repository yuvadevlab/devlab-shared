"use client";

import React from "react";
import { Box, Button, Stack } from "@yuva-devlab/ui";
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
          className="dl-demo-frame dl-demo-frame--sm"
        >
          <Stack gap={3}>
            <Stack gap={1}>
              <h4 className="dl-demo-heading">Encapsulated Surface</h4>
              <p className="dl-demo-desc">
                Cleanly styled from design tokens without external utilities.
              </p>
            </Stack>
            <div>
              <Button size="sm" variant="default">
                Action
              </Button>
            </div>
          </Stack>
        </Box>
      ),
      codeSnippet: `<Box p="6" bg="card" border radius="lg" shadow="md">
  <Stack gap="3">
    <h4>Encapsulated Surface</h4>
    <p>Cleanly styled from design tokens.</p>
    <Button size="sm">Action</Button>
  </Stack>
</Box>`,
    },
    {
      id: "subtle",
      title: "Muted Surface",
      description:
        "Subtle background container with custom padding and rounded corners.",
      preview: (
        <Box
          p="4"
          bg="muted"
          radius="md"
          className="dl-demo-frame dl-demo-frame--sm dl-demo-desc"
        >
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
