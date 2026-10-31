import React from "react";
import { Badge, StatusBadge, StatusChip, Flex } from "@yuva-devlab/ui";
import type { ComponentVariant } from "@/components/demo-card";
import type {
  PropDefinition,
  CssClassDefinition,
} from "@/components/api-table";

export const BADGE_VARIANTS: ComponentVariant[] = [
  {
    id: "semantic",
    title: "Semantic Color Badges",
    description:
      "Standard semantic status pills mapped to design system theme colors.",
    preview: (
      <Flex wrap="wrap" align="center" justify="center" gap={3}>
        <Badge variant="default">Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="info">Info</Badge>
        <Badge variant="destructive">Destructive</Badge>
      </Flex>
    ),
    codeSnippet: `<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="info">Info</Badge>
<Badge variant="destructive">Destructive</Badge>`,
  },
  {
    id: "status-badges",
    title: "Status Badges with Animated Indicator",
    description:
      "Specialized presence and health badges featuring a glowing / pulsing status dot.",
    preview: (
      <Flex wrap="wrap" align="center" justify="center" gap={3}>
        <StatusBadge status="Active" />
        <StatusBadge status="In Progress" />
        <StatusBadge status="Completed" />
        <StatusBadge status="Failed" />
      </Flex>
    ),
    codeSnippet: `import { StatusBadge } from "@yuva-devlab/ui";

<StatusBadge status="Active" />
<StatusBadge status="In Progress" />
<StatusBadge status="Completed" />
<StatusBadge status="Failed" />`,
  },
  {
    id: "status-chips",
    title: "Interactive Status Chips",
    description:
      "AntD-inspired filter chip buttons with count badges and click states.",
    preview: (
      <Flex wrap="wrap" align="center" justify="center" gap={3}>
        <StatusChip status="running" />
        <StatusChip status="processing" />
        <StatusChip status="warning" />
        <StatusChip status="failed" />
      </Flex>
    ),
    codeSnippet: `import { StatusChip } from "@yuva-devlab/ui";

<StatusChip status="running" />
<StatusChip status="processing" />
<StatusChip status="warning" />
<StatusChip status="failed" />`,
  },
];

export const BADGE_PROPS: PropDefinition[] = [
  {
    name: "variant",
    type: '"default" | "secondary" | "destructive" | "success" | "warning" | "info" | "outline"',
    default: '"default"',
    description: "Visual style variant mapped to scoped .dl-badge--* rules.",
  },
];

export const BADGE_CSS: CssClassDefinition[] = [
  {
    name: ".dl-badge",
    description:
      "Base badge styling with pill radius and semi-bold typography.",
  },
  {
    name: ".dl-badge--success",
    description: "Positive status tint using var(--success).",
  },
  {
    name: ".dl-badge--destructive",
    description: "Critical error status tint using var(--destructive).",
  },
  {
    name: ".dl-status-badge",
    description: "Container for status dot and text label.",
  },
];
