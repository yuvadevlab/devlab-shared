"use client";

import React from "react";
import { Kbd, KbdGroup, Stack } from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
  type PropDefinition,
  type CssClassDefinition,
} from "@/components/component-view";

export default function KbdDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "basic",
      title: "Keycap Sizes",
      description: "Keyboard keycaps in small, medium, and large dimensions.",
      preview: (
        <div
          className="dl-demo-frame dl-demo-frame--sm"
          style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
        >
          <Kbd size="sm">⌘K</Kbd>
          <Kbd size="md">⌘K</Kbd>
          <Kbd size="lg">⌘K</Kbd>
        </div>
      ),
      codeSnippet: `<Kbd size="sm">⌘K</Kbd>
<Kbd size="md">⌘K</Kbd>
<Kbd size="lg">⌘K</Kbd>`,
    },
    {
      id: "variants",
      title: "Styles & Sequences",
      description:
        "Visual variants (default, outline, ghost) and multi-key groups with delimiters.",
      preview: (
        <Stack gap={3} className="dl-demo-frame dl-demo-frame--sm">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Kbd variant="default">Ctrl</Kbd>
            <Kbd variant="outline">Alt</Kbd>
            <Kbd variant="ghost">Shift</Kbd>
          </div>
          <KbdGroup separator="+">
            <Kbd>Ctrl</Kbd>
            <Kbd>Shift</Kbd>
            <Kbd>P</Kbd>
          </KbdGroup>
        </Stack>
      ),
      codeSnippet: `<KbdGroup separator="+">
  <Kbd>Ctrl</Kbd>
  <Kbd>Shift</Kbd>
  <Kbd>P</Kbd>
</KbdGroup>`,
    },
  ];

  const propsList: PropDefinition[] = [
    {
      name: "variant",
      type: '"default" | "outline" | "ghost"',
      default: '"default"',
      description: "Visual appearance style of the keycap.",
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      description: "Keycap height and font scale.",
    },
    {
      name: "separator",
      type: "ReactNode",
      default: "—",
      description: "Optional delimiter between keys inside KbdGroup.",
    },
  ];

  const cssClasses: CssClassDefinition[] = [
    { name: ".dl-kbd", description: "Base styling for individual keycap." },
    {
      name: ".dl-kbd-group",
      description: "Row container grouping multiple keycaps.",
    },
  ];

  return (
    <ComponentView
      title="Kbd"
      description="Semantic keycap element and sequence container for displaying keyboard shortcuts and hotkeys."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
