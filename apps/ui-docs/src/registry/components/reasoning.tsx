"use client";

import React from "react";
import { Reasoning, ReasoningContent, ReasoningTrigger } from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
  type PropDefinition,
  type CssClassDefinition,
} from "@/components/component-view";

const STREAMING_CODE = `import { Reasoning, ReasoningContent, ReasoningTrigger } from "@yuva-devlab/ui";

export function StreamingReasoningDemo() {
  return (
    <Reasoning isStreaming defaultOpen autoCollapse={false}>
      <ReasoningTrigger />
      <ReasoningContent>
        Checking Dining Out transactions in May 2026... Comparing ₹14,200
        actual outflow against ₹10,000 monthly budget limit.
      </ReasoningContent>
    </Reasoning>
  );
}`;

const COMPLETED_CODE = `import { Reasoning, ReasoningContent, ReasoningTrigger } from "@yuva-devlab/ui";

export function CompletedReasoningDemo() {
  return (
    <Reasoning isStreaming={false} durationMs={2450} defaultOpen>
      <ReasoningTrigger />
      <ReasoningContent>
        1. Aggregated 28 transactions from linked accounts.
        2. Detected ₹4,200 Dining Out budget overrun.
        3. Confirmed ₹18,500 safe-to-spend buffer remains.
      </ReasoningContent>
    </Reasoning>
  );
}`;

export default function ReasoningDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "streaming",
      title: "Live Streaming Reasoning",
      description:
        "Auto-expanding reasoning box with shimmering status label while thoughts stream.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md">
          <Reasoning isStreaming defaultOpen autoCollapse={false}>
            <ReasoningTrigger />
            <ReasoningContent>
              Checking Dining Out transactions in May 2026... Comparing ₹14,200
              actual outflow against ₹10,000 monthly budget limit.
            </ReasoningContent>
          </Reasoning>
        </div>
      ),
      codeSnippet: STREAMING_CODE,
    },
    {
      id: "completed",
      title: "Completed Thinking Summary",
      description:
        "Displays measured thinking duration and collapses smoothly once prose begins.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md">
          <Reasoning isStreaming={false} durationMs={2450} defaultOpen>
            <ReasoningTrigger />
            <ReasoningContent>
              1. Aggregated 28 transactions from linked accounts.
              {"\n"}2. Detected ₹4,200 Dining Out budget overrun.
              {"\n"}3. Confirmed ₹18,500 safe-to-spend buffer remains.
            </ReasoningContent>
          </Reasoning>
        </div>
      ),
      codeSnippet: COMPLETED_CODE,
    },
  ];

  const propsList: PropDefinition[] = [
    {
      name: "isStreaming",
      type: "boolean",
      default: "false",
      description: "Whether reasoning tokens are actively streaming.",
    },
    {
      name: "durationMs",
      type: "number",
      default: "—",
      description: "Elapsed reasoning duration in milliseconds.",
    },
    {
      name: "autoCollapse",
      type: "boolean",
      default: "true",
      description:
        "Automatically opens while streaming and collapses once finished.",
    },
    {
      name: "defaultOpen",
      type: "boolean",
      default: "false",
      description: "Initial open state in uncontrolled mode.",
    },
  ];

  const cssClasses: CssClassDefinition[] = [
    { name: ".dl-reasoning", description: "Root collapsible container." },
    {
      name: ".dl-reasoning__trigger",
      description: "Trigger button displaying Brain icon and duration.",
    },
    {
      name: ".dl-reasoning__content",
      description: "Expandable content region.",
    },
  ];

  return (
    <ComponentView
      title="Reasoning"
      description="Collapsible AI reasoning panel with live shimmering header, elapsed timer, and automatic open/collapse lifecycle during streaming."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
