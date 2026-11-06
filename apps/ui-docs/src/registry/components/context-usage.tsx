"use client";

import React from "react";
import { ContextUsage } from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
  type PropDefinition,
  type CssClassDefinition,
} from "@/components/component-view";

export default function ContextUsageDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "default",
      title: "Context Utilization Gauge",
      description:
        "Progress gauge displaying tokens used vs total limit with detailed category breakdowns.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md">
          <div className="w-full max-w-md space-y-4">
            <ContextUsage
              label="Claude 3.5 Sonnet (200k)"
              usedTokens={48200}
              maxTokens={200000}
              breakdown={{
                inputTokens: 42000,
                outputTokens: 6200,
                cachedTokens: 38000,
              }}
            />

            <ContextUsage
              label="Context Warning Threshold"
              usedTokens={156000}
              maxTokens={200000}
              breakdown={{
                inputTokens: 142000,
                outputTokens: 14000,
              }}
            />
          </div>
        </div>
      ),
      codeSnippet: `<ContextUsage
  label="Claude 3.5 Sonnet (200k)"
  usedTokens={48200}
  maxTokens={200000}
  breakdown={{ inputTokens: 42000, outputTokens: 6200 }}
/>`,
    },
  ];

  const propsList: PropDefinition[] = [
    {
      name: "usedTokens",
      type: "number",
      default: "—",
      description: "Total number of tokens consumed in current context.",
    },
    {
      name: "maxTokens",
      type: "number",
      default: "—",
      description: "Total context window capacity limit.",
    },
    {
      name: "breakdown",
      type: "TokenUsageBreakdown",
      default: "—",
      description:
        "Optional details for input, output, reasoning, and cached tokens.",
    },
    {
      name: "label",
      type: "string",
      default: '"Context Window"',
      description: "Title label displayed above the gauge.",
    },
  ];

  const cssClasses: CssClassDefinition[] = [
    {
      name: ".dl-context-usage",
      description: "Outer card container for token gauge.",
    },
    {
      name: ".dl-context-usage__bar-bg",
      description: "Background track for the token progress bar.",
    },
    {
      name: ".dl-context-usage__bar-fill",
      description:
        "Colored fill indicator with warning and danger transitions.",
    },
  ];

  return (
    <ComponentView
      title="Context"
      description="Token usage gauge visualizing LLM context window consumption, remaining capacity thresholds, and token category breakdowns."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
