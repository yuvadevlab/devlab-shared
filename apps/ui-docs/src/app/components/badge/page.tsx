"use client";

import React from "react";
import { Badge, StatusBadge, StatusChip } from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
} from "../../../components/component-view";

export default function BadgeDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "semantic",
      title: "Semantic Color Badges",
      description:
        "Standard semantic status pills mapped to design system theme colors.",
      preview: (
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
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
        <div className="flex flex-wrap items-center justify-center gap-3">
          <StatusBadge status="Active" />
          <StatusBadge status="In Progress" />
          <StatusBadge status="Completed" />
          <StatusBadge status="Failed" />
        </div>
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
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <StatusChip status="running" />
          <StatusChip status="processing" />
          <StatusChip status="warning" />
          <StatusChip status="failed" />
        </div>
      ),
      codeSnippet: `import { StatusChip } from "@yuva-devlab/ui";

<StatusChip status="running" />
<StatusChip status="processing" />
<StatusChip status="warning" />
<StatusChip status="failed" />`,
    },
  ];

  const propsList = [
    {
      name: "variant",
      type: '"default" | "secondary" | "destructive" | "success" | "warning" | "info" | "outline"',
      default: '"default"',
      description: "Visual style variant mapped to scoped .dl-badge--* rules.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-badge",
      description:
        "Base badge styling with inline-flex, pill radius, and font-semibold.",
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

  return (
    <ComponentView
      title="Badge"
      description="Semantic status pill indicators supporting color variants, live presence dots (StatusBadge), and interactive filter chips (StatusChip)."
      category="Data Display"
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
