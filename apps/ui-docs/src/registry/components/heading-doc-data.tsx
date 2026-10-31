import React from "react";
import { Heading, Stack } from "@yuva-devlab/ui";
import type { ComponentVariant } from "@/components/demo-card";
import type {
  PropDefinition,
  CssClassDefinition,
} from "@/components/api-table";

export const HEADING_VARIANTS: ComponentVariant[] = [
  {
    id: "sizes",
    title: "Typography Hierarchy Scale",
    description:
      "Full heading scale from display down to h6, adapting to brand font stacks.",
    preview: (
      <Stack gap={3}>
        <Heading size="display">Display Title</Heading>
        <Heading size="h1">Heading 1</Heading>
        <Heading size="h2">Heading 2</Heading>
        <Heading size="h3">Heading 3</Heading>
        <Heading size="h4">Heading 4</Heading>
        <Heading size="h5">Heading 5</Heading>
        <Heading size="h6">Heading 6</Heading>
      </Stack>
    ),
    codeSnippet: `<Heading size="display">Display Title</Heading>
<Heading size="h1">Heading 1</Heading>
<Heading size="h2">Heading 2</Heading>
<Heading size="h3">Heading 3</Heading>
<Heading size="h4">Heading 4</Heading>
<Heading size="h5">Heading 5</Heading>
<Heading size="h6">Heading 6</Heading>`,
  },
  {
    id: "decoupled",
    title: "Decoupled Semantic Hierarchy",
    description:
      "Render semantic h1 tags for document SEO outlines while displaying compact h3 visual styles.",
    preview: (
      <Stack gap={3}>
        <Heading as="h1" size="h3">
          Semantic H1 Tag with Visual H3 Styling (Accessible Page Header)
        </Heading>
        <Heading as="h2" size="display">
          Semantic H2 Tag with Visual Display Styling (Hero Section)
        </Heading>
      </Stack>
    ),
    codeSnippet: `// Render semantic <h1> for SEO and accessibility, but styled visually as <h3>
<Heading as="h1" size="h3">
  Semantic H1 Tag with Visual H3 Styling
</Heading>

// Render semantic <h2> for section outline, but styled as massive display
<Heading as="h2" size="display">
  Semantic H2 Tag with Visual Display Styling
</Heading>`,
  },
  {
    id: "colors",
    title: "Semantic Color Variants",
    description:
      "Color tokens applied dynamically via data-typography-color attributes.",
    preview: (
      <Stack gap={2}>
        <Heading size="h4" color="default">
          Default Heading
        </Heading>
        <Heading size="h4" color="primary">
          Primary Brand Heading
        </Heading>
        <Heading size="h4" color="muted">
          Muted Section Subtitle
        </Heading>
        <Heading size="h4" color="success">
          Positive Growth Milestone
        </Heading>
        <Heading size="h4" color="warning">
          Action Required Alert
        </Heading>
        <Heading size="h4" color="destructive">
          Critical Error Alert
        </Heading>
      </Stack>
    ),
    codeSnippet: `<Heading size="h4" color="default">Default Heading</Heading>
<Heading size="h4" color="primary">Primary Brand Heading</Heading>
<Heading size="h4" color="muted">Muted Section Subtitle</Heading>
<Heading size="h4" color="success">Positive Growth Milestone</Heading>
<Heading size="h4" color="warning">Action Required Alert</Heading>
<Heading size="h4" color="destructive">Critical Error Alert</Heading>`,
  },
];

export const HEADING_PROPS: PropDefinition[] = [
  {
    name: "as",
    type: '"h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div"',
    default: "size (or h2)",
    description: "Underlying HTML semantic tag element rendered in the DOM.",
  },
  {
    name: "size",
    type: '"display" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"',
    default: '"h2"',
    description: "Visual size level corresponding to the design token scale.",
  },
  {
    name: "color",
    type: '"default" | "muted" | "subtle" | "primary" | "destructive" | "warning" | "success" | "info"',
    default: '"default"',
    description: "Semantic color token variant.",
  },
  {
    name: "weight",
    type: '"normal" | "medium" | "semibold" | "bold" | "extrabold"',
    default: "undefined",
    description: "Explicit font-weight override.",
  },
  {
    name: "align",
    type: '"left" | "center" | "right"',
    default: '"left"',
    description: "Horizontal text alignment.",
  },
  {
    name: "truncate",
    type: "boolean",
    default: "false",
    description: "Truncate overflow text with ellipsis on a single line.",
  },
];

export const HEADING_CSS: CssClassDefinition[] = [
  {
    name: ".dl-heading",
    description: "Base styling applied to all heading elements.",
  },
  {
    name: ".dl-display",
    description: "Display heading: 3rem (48px) / 1.15 / 800 weight.",
  },
  {
    name: ".dl-h1",
    description: "Level 1 Heading: 2.25rem (36px) / 1.2 / 700 weight.",
  },
  {
    name: ".dl-h2",
    description: "Level 2 Heading: 1.75rem (28px) / 1.25 / 600 weight.",
  },
  {
    name: ".dl-h3",
    description: "Level 3 Heading: 1.375rem (22px) / 1.3 / 600 weight.",
  },
  {
    name: ".dl-h4",
    description: "Level 4 Heading: 1.125rem (18px) / 1.35 / 600 weight.",
  },
  {
    name: ".dl-h5",
    description: "Level 5 Heading: 1rem (16px) / 1.4 / 500 weight.",
  },
  {
    name: ".dl-h6",
    description: "Level 6 Heading: 0.875rem (14px) / 1.45 / 500 weight.",
  },
];
