"use client";

import React from "react";
import { ContextUsage, Stack } from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
  type PropDefinition,
  type CssClassDefinition,
} from "@/components/component-view";

const CARD_CODE = `import { ContextUsage, Stack } from "@yuva-devlab/ui";

export function ContextUsageDemo() {
  return (
    <Stack gap={4}>
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
    </Stack>
  );
}`;

const COMPACT_CODE = `import { ContextUsage } from "@yuva-devlab/ui";

export function CompactContextPillDemo() {
  return (
    <ContextUsage
      variant="compact"
      label="Gemini 2.5 Pro (200k)"
      usedTokens={64200}
      maxTokens={200000}
      breakdown={{
        inputTokens: 52000,
        outputTokens: 12200,
        reasoningTokens: 8400,
        cachedTokens: 31000,
      }}
    />
  );
}`;

export default function ContextUsageDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "default",
      title: "Context Utilization Card",
      description:
        "Progress ring, horizontal meter, and token category breakdown cards.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md">
          <Stack gap={4}>
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
          </Stack>
        </div>
      ),
      codeSnippet: CARD_CODE,
    },
    {
      id: "compact",
      title: "Compact Hover Pill",
      description:
        "Inline prompt-bar pill showing radial token usage with HoverCard breakdown details.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md">
          <ContextUsage
            variant="compact"
            label="Gemini 2.5 Pro (200k)"
            usedTokens={64200}
            maxTokens={200000}
            breakdown={{
              inputTokens: 52000,
              outputTokens: 12200,
              reasoningTokens: 8400,
              cachedTokens: 31000,
            }}
          />
        </div>
      ),
      codeSnippet: COMPACT_CODE,
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
      name: "variant",
      type: '"card" | "compact"',
      default: '"card"',
      description: "Expanded gauge card or compact HoverCard ring pill.",
    },
    {
      name: "breakdown",
      type: "TokenUsageBreakdown",
      default: "—",
      description:
        "Optional counts for input, output, reasoning, and cached tokens.",
    },
  ];

  const cssClasses: CssClassDefinition[] = [
    {
      name: ".dl-context-usage",
      description: "Outer card container for token utilization gauge.",
    },
    {
      name: ".dl-context-compact__trigger",
      description: "Pill button trigger displaying radial usage ring.",
    },
  ];

  return (
    <ComponentView
      title="Context"
      description="Token usage indicator visualizing LLM context window consumption, remaining capacity thresholds, and category breakdowns."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
