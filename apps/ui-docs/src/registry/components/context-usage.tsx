"use client";

import React from "react";
import {
  Context,
  ContextContent,
  ContextContentBody,
  ContextContentHeader,
  ContextTrigger,
} from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
  type PropDefinition,
  type CssClassDefinition,
} from "@/components/component-view";
import { createExampleSource } from "@/lib/create-example-source";

export default function ContextDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "default",
      title: "Context Usage",
      description:
        "A hover card that reports the context window usage and token breakdown.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md">
          <Context
            usedTokens={10660}
            maxTokens={128000}
            modelId="Model context"
            usage={{
              inputTokens: 8420,
              outputTokens: 1260,
              reasoningTokens: 980,
            }}
          >
            <ContextTrigger />
            <ContextContent>
              <ContextContentHeader />
              <ContextContentBody />
            </ContextContent>
          </Context>
        </div>
      ),
      codeSnippet: createExampleSource({
        imports: [
          "Context",
          "ContextTrigger",
          "ContextContent",
          "ContextContentHeader",
          "ContextContentBody",
        ],
        body: `<Context
  usedTokens={10660}
  maxTokens={128000}
  modelId="Model context"
  usage={{
    inputTokens: 8420,
    outputTokens: 1260,
    reasoningTokens: 980,
  }}
>
  <ContextTrigger />
  <ContextContent>
    <ContextContentHeader />
    <ContextContentBody />
  </ContextContent>
</Context>`,
      }),
    },
  ];

  const propsList: PropDefinition[] = [
    {
      name: "usedTokens",
      type: "number",
      default: "—",
      description: "Total tokens used in the active context window.",
    },
    {
      name: "maxTokens",
      type: "number",
      default: "—",
      description: "Maximum token capacity for the selected model.",
    },
    {
      name: "usage",
      type: "TokenUsageBreakdown",
      default: "undefined",
      description: "Optional counts for input, output, reasoning, and cache.",
    },
    {
      name: "modelId",
      type: "string",
      default: '"Context"',
      description: "Optional model label displayed in the detail panel.",
    },
  ];

  const cssClasses: CssClassDefinition[] = [
    {
      name: ".dl-hover-card",
      description: "Shared themed hover-card surface for the context details.",
    },
    {
      name: ".dl-progress",
      description: "Shared progress indicator for context-window utilization.",
    },
  ];

  return (
    <ComponentView
      title="Context"
      description="Shows context-window utilization and token category counts in a hover card."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
