"use client";

import React from "react";
import { Container, Box, Stack } from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
} from "@/components/component-view";

export default function ContainerDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "sizes",
      title: "Constrained Max-Width Containers",
      description:
        "Centered container providing consistent horizontal margins and bounds.",
      preview: (
        <Stack gap={3} className="dl-demo-frame">
          <Container size="sm">
            <Box p="3" bg="muted" radius="md" className="dl-demo-desc">
              Container size="sm" (max-width: 640px)
            </Box>
          </Container>
          <Container size="md">
            <Box p="3" bg="card" border radius="md" className="dl-demo-desc">
              Container size="md" (max-width: 768px)
            </Box>
          </Container>
        </Stack>
      ),
      codeSnippet: `<Container size="sm">
  <Box p="3" bg="muted">Small Container</Box>
</Container>
<Container size="md">
  <Box p="3" bg="card" border>Medium Container</Box>
</Container>`,
    },
  ];

  const propsList = [
    {
      name: "size",
      type: '"sm" | "md" | "lg" | "xl" | "2xl" | "fluid"',
      default: '"xl"',
      description: "Responsive max-width threshold constraint.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-container",
      description: "Centered auto-margin container with horizontal padding.",
    },
  ];

  return (
    <ComponentView
      title="Container"
      description="Centered max-width content boundary with responsive breakpoint thresholds in @layer dl-layout."
      category="Layout"
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
