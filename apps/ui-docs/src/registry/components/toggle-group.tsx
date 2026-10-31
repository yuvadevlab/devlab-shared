"use client";

import React, { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@yuva-devlab/ui";
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
        <div className="flex flex-col items-center gap-3">
          <ToggleGroup
            type="single"
            value={alignment}
            onValueChange={(val) => val && setAlignment(val)}
            variant="outline"
          >
            <ToggleGroupItem value="left" aria-label="Align left">
              <AlignLeft className="size-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Align center">
              <AlignCenter className="size-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Align right">
              <AlignRight className="size-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="justify" aria-label="Align justify">
              <AlignJustify className="size-4" />
            </ToggleGroupItem>
          </ToggleGroup>
          <div className="text-xs text-muted-foreground font-mono">
            Alignment:{" "}
            <span className="text-primary font-bold">{alignment}</span>
          </div>
        </div>
      ),
      codeSnippet: `<ToggleGroup type="single" value={align} onValueChange={setAlign} variant="outline">
  <ToggleGroupItem value="left"><AlignLeft className="size-4" /></ToggleGroupItem>
  <ToggleGroupItem value="center"><AlignCenter className="size-4" /></ToggleGroupItem>
  <ToggleGroupItem value="right"><AlignRight className="size-4" /></ToggleGroupItem>
</ToggleGroup>`,
    },
    {
      id: "multiple",
      title: "Multiple Select (Formatting)",
      description:
        "Checkbox-style non-exclusive toggle group allowing multiple concurrent selections.",
      preview: (
        <div className="flex flex-col items-center gap-3">
          <ToggleGroup
            type="multiple"
            value={formats}
            onValueChange={setFormats}
            variant="outline"
          >
            <ToggleGroupItem value="bold" aria-label="Bold">
              <Bold className="size-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Italic">
              <Italic className="size-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Underline">
              <Underline className="size-4" />
            </ToggleGroupItem>
          </ToggleGroup>
          <div className="text-xs text-muted-foreground font-mono">
            Active:{" "}
            <span className="text-primary font-bold">
              {formats.join(", ") || "None"}
            </span>
          </div>
        </div>
      ),
      codeSnippet: `<ToggleGroup type="multiple" value={formats} onValueChange={setFormats} variant="outline">
  <ToggleGroupItem value="bold"><Bold className="size-4" /></ToggleGroupItem>
  <ToggleGroupItem value="italic"><Italic className="size-4" /></ToggleGroupItem>
  <ToggleGroupItem value="underline"><Underline className="size-4" /></ToggleGroupItem>
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
