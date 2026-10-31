"use client";

import React, { useState } from "react";
import { Textarea, Label, Stack, Flex } from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
} from "@/components/component-view";

export default function TextareaDocPage() {
  const [content, setContent] = useState(
    "You are an expert autonomous coding agent specialized in zero-collision pure CSS systems.",
  );

  const variants: ComponentVariant[] = [
    {
      id: "basic",
      title: "Basic Textarea",
      description:
        "Standard multi-line input field with responsive vertical resizing and focus ring.",
      preview: (
        <Stack gap={2} className="dl-demo-frame dl-demo-frame--sm">
          <Label htmlFor="basic-prompt">Instructions</Label>
          <Textarea
            id="basic-prompt"
            rows={3}
            placeholder="Type task parameters or description..."
          />
        </Stack>
      ),
      codeSnippet: `<Textarea placeholder="Type task parameters or description..." rows={3} />`,
    },
    {
      id: "counter",
      title: "With Character Counter",
      description:
        "AntD-inspired textarea with live character counter badge and boundary label.",
      preview: (
        <Stack gap={2} className="dl-demo-frame dl-demo-frame--sm">
          <Flex justify="between" align="center">
            <Label htmlFor="sys-prompt">System Prompt</Label>
            <span className="dl-demo-code dl-demo-caption">
              {content.length} / 500 chars
            </span>
          </Flex>
          <Textarea
            id="sys-prompt"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            placeholder="Enter agent persona and guardrails..."
          />
        </Stack>
      ),
      codeSnippet: `<Stack gap={2}>
  <Flex justify="between">
    <Label>System Prompt</Label>
    <span>{content.length} / 500</span>
  </Flex>
  <Textarea value={content} onChange={e => setContent(e.target.value)} rows={4} />
</Stack>`,
    },
    {
      id: "disabled",
      title: "Disabled State",
      description:
        "Disabled textarea with subdued background preventing text modification.",
      preview: (
        <Stack gap={2} className="dl-demo-frame dl-demo-frame--sm">
          <Label htmlFor="locked-prompt">Immutable System Contract</Label>
          <Textarea
            id="locked-prompt"
            disabled
            defaultValue="CRITICAL: Never reveal root SSH credentials under any circumstances."
            rows={2}
          />
        </Stack>
      ),
      codeSnippet: `<Textarea disabled defaultValue="Immutable prompt..." />`,
    },
  ];

  const propsList = [
    {
      name: "rows",
      type: "number",
      default: "3",
      description: "Visible text lines height without scrolling.",
    },
    {
      name: "placeholder",
      type: "string",
      default: "undefined",
      description: "Hint text rendered when the field is empty.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Disables interaction and displays not-allowed cursor.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-textarea",
      description: "Multi-line textarea element with focus ring and padding.",
    },
    {
      name: ".dl-textarea:focus-visible",
      description: "Applies 2px focus ring using var(--ring) token.",
    },
  ];

  return (
    <ComponentView
      title="Textarea"
      description="Multi-line text input field for prompts, notes, descriptions, and code excerpts with vertical resizing. Showcasing basic multiline inputs, live character counters, and disabled states."
      category="Data Entry"
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
