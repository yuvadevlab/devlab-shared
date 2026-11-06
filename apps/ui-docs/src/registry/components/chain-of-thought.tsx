"use client";

import React from "react";
import {
  ChainOfThought,
  ChainOfThoughtHeader,
  ChainOfThoughtContent,
  ChainOfThoughtStep,
} from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
  type PropDefinition,
  type CssClassDefinition,
} from "@/components/component-view";

export default function ChainOfThoughtDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "basic",
      title: "Completed Reasoning Chain",
      description:
        "Collapsible thought process showing timing and granular steps.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md">
          <ChainOfThought durationSeconds={3.4} defaultOpen>
            <ChainOfThoughtHeader />
            <ChainOfThoughtContent>
              <ChainOfThoughtStep status="success">
                Read package.json workspace dependencies
              </ChainOfThoughtStep>
              <ChainOfThoughtStep status="success">
                Verified zero type errors in @yuva-devlab/tokens
              </ChainOfThoughtStep>
              <ChainOfThoughtStep status="success">
                Compiled distribution ESM and CJS bundles
              </ChainOfThoughtStep>
            </ChainOfThoughtContent>
          </ChainOfThought>
        </div>
      ),
      codeSnippet: `<ChainOfThought durationSeconds={3.4} defaultOpen>
  <ChainOfThoughtHeader />
  <ChainOfThoughtContent>
    <ChainOfThoughtStep status="success">Read workspace dependencies</ChainOfThoughtStep>
    <ChainOfThoughtStep status="success">Compiled bundles</ChainOfThoughtStep>
  </ChainOfThoughtContent>
</ChainOfThought>`,
    },
    {
      id: "streaming",
      title: "Active Thinking / Streaming",
      description:
        "Animated pulse state with live timer while LLM generates thoughts.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md">
          <ChainOfThought isThinking durationSeconds={1.8} defaultOpen>
            <ChainOfThoughtHeader />
            <ChainOfThoughtContent>
              <ChainOfThoughtStep status="success">
                Retrieved latest security advisory CVE-2026-104
              </ChainOfThoughtStep>
              <ChainOfThoughtStep status="running">
                Synthesizing mitigation strategy for container base image...
              </ChainOfThoughtStep>
            </ChainOfThoughtContent>
          </ChainOfThought>
        </div>
      ),
      codeSnippet: `<ChainOfThought isThinking durationSeconds={1.8} defaultOpen>
  <ChainOfThoughtHeader />
  <ChainOfThoughtContent>
    <ChainOfThoughtStep status="running">
      Synthesizing mitigation strategy...
    </ChainOfThoughtStep>
  </ChainOfThoughtContent>
</ChainOfThought>`,
    },
  ];

  const propsList: PropDefinition[] = [
    {
      name: "isThinking",
      type: "boolean",
      default: "false",
      description: "Whether the AI model is actively generating reasoning.",
    },
    {
      name: "durationSeconds",
      type: "number",
      default: "—",
      description: "Elapsed thinking duration displayed in summary header.",
    },
    {
      name: "defaultOpen",
      type: "boolean",
      default: "false",
      description: "Whether the thought step details are expanded by default.",
    },
  ];

  const cssClasses: CssClassDefinition[] = [
    { name: ".dl-cot", description: "Card container for reasoning chain." },
    { name: ".dl-cot__header", description: "Interactive summary button." },
    {
      name: ".dl-cot__step",
      description: "Individual step row inside thought.",
    },
  ];

  return (
    <ComponentView
      title="Chain of Thought"
      description="Visual presentation for AI model reasoning processes, featuring execution duration timers, live animated thinking states, and expandable step lists."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
