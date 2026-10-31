"use client";

import React, { useState } from "react";
import { ToggleGroup, ToggleGroupItem, Stack } from "@yuva-devlab/ui";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Bold,
  Italic,
  Underline,
} from "lucide-react";
import { ComponentView, ComponentVariant } from "@/components/component-view";

/**
 * Documentation page for ToggleGroup component showcasing single and multiple selection modes.
 */
export default function ToggleGroupDocPage() {
  const [alignment, setAlignment] = useState("left");
  const [formats, setFormats] = useState<string[]>(["bold"]);

  const variants: ComponentVariant[] = [
    {
      id: "single",
      title: "Single Select (Exclusive)",
      description:
        "Radio-style mutually exclusive toggle group, commonly used for text alignments or layout density.",
      preview: (
        <Stack align="center" gap={3}>
          <ToggleGroup
            type="single"
            value={alignment}
            onValueChange={(val) => val && setAlignment(val)}
            variant="outline"
          >
            <ToggleGroupItem value="left" aria-label="Align left">
              <AlignLeft className="dl-demo-icon" />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Align center">
              <AlignCenter className="dl-demo-icon" />
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Align right">
              <AlignRight className="dl-demo-icon" />
            </ToggleGroupItem>
            <ToggleGroupItem value="justify" aria-label="Align justify">
              <AlignJustify className="dl-demo-icon" />
            </ToggleGroupItem>
          </ToggleGroup>
          <div className="dl-demo-code dl-demo-caption">
            Alignment: <span className="dl-demo-heading">{alignment}</span>
          </div>
        </Stack>
      ),
      codeSnippet: `<ToggleGroup type="single" value={align} onValueChange={setAlign} variant="outline">
  <ToggleGroupItem value="left"><AlignLeft className="dl-demo-icon" /></ToggleGroupItem>
  <ToggleGroupItem value="center"><AlignCenter className="dl-demo-icon" /></ToggleGroupItem>
  <ToggleGroupItem value="right"><AlignRight className="dl-demo-icon" /></ToggleGroupItem>
</ToggleGroup>`,
    },
    {
      id: "multiple",
      title: "Multiple Select (Formatting)",
      description:
        "Checkbox-style non-exclusive toggle group allowing multiple concurrent selections.",
      preview: (
        <Stack align="center" gap={3}>
          <ToggleGroup
            type="multiple"
            value={formats}
            onValueChange={setFormats}
            variant="outline"
          >
            <ToggleGroupItem value="bold" aria-label="Bold">
              <Bold className="dl-demo-icon" />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Italic">
              <Italic className="dl-demo-icon" />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Underline">
              <Underline className="dl-demo-icon" />
            </ToggleGroupItem>
          </ToggleGroup>
          <div className="dl-demo-code dl-demo-caption">
            Active:{" "}
            <span className="dl-demo-heading">
              {formats.join(", ") || "None"}
            </span>
          </div>
        </Stack>
      ),
      codeSnippet: `<ToggleGroup type="multiple" value={formats} onValueChange={setFormats} variant="outline">
  <ToggleGroupItem value="bold"><Bold className="dl-demo-icon" /></ToggleGroupItem>
  <ToggleGroupItem value="italic"><Italic className="dl-demo-icon" /></ToggleGroupItem>
  <ToggleGroupItem value="underline"><Underline className="dl-demo-icon" /></ToggleGroupItem>
</ToggleGroup>`,
    },
  ];

  const propsList = [
    {
      name: "type",
      type: '"single" | "multiple"',
      default: '"single"',
      description:
        "Whether a single or multiple items can be toggled simultaneously.",
    },
    {
      name: "variant",
      type: '"default" | "outline"',
      default: '"default"',
      description: "Visual style variant for toggle items.",
    },
    {
      name: "size",
      type: '"default" | "sm" | "lg"',
      default: '"default"',
      description: "Dimension preset for toggle button items.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-toggle-group",
      description: "Flex container grouping toggle item buttons together.",
    },
    {
      name: ".dl-toggle-group-item",
      description: "Individual selectable toggle segment.",
    },
  ];

  return (
    <ComponentView
      title="Toggle Group"
      description="A set of two-state buttons that can be toggled on or off, inspired by Ant Design's Radio.Group button style and Segmented controls."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
