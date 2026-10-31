import React from "react";
import { Text, Stack } from "@yuva-devlab/ui";
import type { ComponentVariant } from "@/components/demo-card";
import type {
  PropDefinition,
  CssClassDefinition,
} from "@/components/api-table";

export const TEXT_VARIANTS: ComponentVariant[] = [
  {
    id: "variants",
    title: "Typography Scale Variants",
    description:
      "Standard body text scale from large lead paragraphs to compact code and metrics.",
    preview: (
      <Stack gap={3}>
        <Text variant="body-lg">
          Body Large: Introductory paragraph and lead copy.
        </Text>
        <Text variant="body">
          Body Default: Standard reading copy with balanced 1.5 line height.
        </Text>
        <Text variant="body-sm">
          Body Small: Compact UI controls, metadata, and card secondary text.
        </Text>
        <Text variant="caption">
          Caption: Footnotes, timestamps, micro-copy, and form helper text.
        </Text>
        <Text variant="code">const config = await loadConfig("finai");</Text>
        <Text variant="metric">$124,592.50 USD</Text>
      </Stack>
    ),
    codeSnippet: `<Text variant="body-lg">Body Large: Introductory paragraph and lead copy.</Text>
<Text variant="body">Body Default: Standard reading copy.</Text>
<Text variant="body-sm">Body Small: Compact UI controls, metadata.</Text>
<Text variant="caption">Caption: Footnotes, timestamps, micro-copy.</Text>
<Text variant="code">const config = await loadConfig("finai");</Text>
<Text variant="metric">$124,592.50 USD</Text>`,
  },
  {
    id: "colors",
    title: "Semantic Text Colors",
    description:
      "Multi-brand semantic color tokens applied to body and inline text.",
    preview: (
      <Stack gap={2}>
        <Text color="default">Default high-contrast foreground text</Text>
        <Text color="muted">
          Muted secondary text for subtitles and metadata
        </Text>
        <Text color="subtle">
          Subtle low-emphasis text for non-critical information
        </Text>
        <Text color="primary">Primary brand color text for highlights</Text>
        <Text color="success">
          Success text indicating completed tasks or growth
        </Text>
        <Text color="warning">
          Warning text indicating pending action required
        </Text>
        <Text color="destructive">
          Destructive text indicating error or failure
        </Text>
        <Text color="info">Informational telemetry text</Text>
      </Stack>
    ),
    codeSnippet: `<Text color="default">Default text</Text>
<Text color="muted">Muted text</Text>
<Text color="primary">Primary text</Text>
<Text color="success">Success text</Text>
<Text color="warning">Warning text</Text>
<Text color="destructive">Destructive text</Text>`,
  },
  {
    id: "truncation",
    title: "Single-Line Truncation",
    description: "Automatic text ellipsis truncation for overflowing strings.",
    preview: (
      <div className="dl-demo-frame--sm">
        <Text truncate>
          This is an extremely long string of text that will be cleanly
          truncated with an ellipsis when constrained.
        </Text>
      </div>
    ),
    codeSnippet: `<Text truncate>
  This is an extremely long string of text that will be cleanly truncated with an ellipsis.
</Text>`,
  },
];

export const TEXT_PROPS: PropDefinition[] = [
  {
    name: "as",
    type: '"p" | "span" | "div" | "label" | "small" | "strong" | "em" | "code"',
    default: '"p"',
    description: "Underlying HTML semantic element rendered in the DOM.",
  },
  {
    name: "variant",
    type: '"body-lg" | "body" | "body-sm" | "caption" | "code" | "metric"',
    default: '"body"',
    description: "Typographic scale variant.",
  },
  {
    name: "color",
    type: '"default" | "muted" | "subtle" | "primary" | "destructive" | "warning" | "success" | "info"',
    default: '"default"',
    description: "Semantic color token variant.",
  },
  {
    name: "weight",
    type: '"normal" | "medium" | "semibold" | "bold"',
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
    description: "Truncate text with ellipsis on a single line.",
  },
];

export const TEXT_CSS: CssClassDefinition[] = [
  {
    name: ".dl-text",
    description: "Base styling applied to all text elements.",
  },
  {
    name: ".dl-body-lg",
    description: "Large Body Text: 1.125rem (18px) / 1.55 / 400 weight.",
  },
  {
    name: ".dl-body",
    description: "Default Body Text: 0.9375rem (15px) / 1.5 / 400 weight.",
  },
  {
    name: ".dl-body-sm",
    description: "Small Body Text: 0.8125rem (13px) / 1.45 / 400 weight.",
  },
  {
    name: ".dl-caption",
    description: "Caption / Footnote: 0.75rem (12px) / 1.4 / 500 weight.",
  },
  {
    name: ".dl-code",
    description: "Monospace Inline Code: 0.8125rem (13px) / 1.45 / 400 weight.",
  },
  {
    name: ".dl-metric",
    description:
      "Metric Display: 2rem (32px) / 1.2 / 700 weight / tabular-nums.",
  },
];
