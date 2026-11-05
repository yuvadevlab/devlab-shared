"use client";

import React from "react";
import {
  Trace,
  TraceLine,
  TraceIcon,
  TraceTitle,
  TraceContent,
  TraceCollapsible,
  TraceCollapsibleTrigger,
  TraceCollapsibleContent,
} from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
  type PropDefinition,
  type CssClassDefinition,
} from "@/components/component-view";
import { createExampleSource } from "@/lib/create-example-source";

export default function TraceDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "basic",
      title: "Step Execution Sequence",
      description:
        "Step-by-step progress tracking with success, running, and error states.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md">
          <Trace>
            <TraceLine status="success">
              <TraceIcon status="success" />
              <TraceTitle>Resolved dependencies in pnpm-lock.yaml</TraceTitle>
            </TraceLine>
            <TraceLine status="success">
              <TraceIcon status="success" />
              <TraceTitle>Validated TypeScript declarations</TraceTitle>
            </TraceLine>
            <TraceLine status="running">
              <TraceIcon status="running" />
              <TraceTitle className="dl-shimmer">
                Running unit tests across 12 packages...
              </TraceTitle>
            </TraceLine>
          </Trace>
        </div>
      ),
      codeSnippet: createExampleSource({
        imports: ["Trace", "TraceIcon", "TraceLine", "TraceTitle"],
        body: `<Trace>
  <TraceLine status="success">
    <TraceIcon status="success" />
    <TraceTitle>Resolved workspace dependencies</TraceTitle>
  </TraceLine>
  <TraceLine status="success">
    <TraceIcon status="success" />
    <TraceTitle>Validated TypeScript declarations</TraceTitle>
  </TraceLine>
  <TraceLine status="running">
    <TraceIcon status="running" />
    <TraceTitle className="dl-shimmer">
      Running unit tests across 12 packages...
    </TraceTitle>
  </TraceLine>
</Trace>`,
      }),
    },
    {
      id: "collapsible",
      title: "Collapsible Step Group",
      description: "Expandable trace group for multi-step agent research.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md">
          <Trace variant="card">
            <TraceCollapsible defaultOpen>
              <TraceCollapsibleTrigger>
                <TraceLine status="success">
                  <TraceIcon status="success" />
                  <TraceTitle>Researched in 3 steps</TraceTitle>
                </TraceLine>
              </TraceCollapsibleTrigger>
              <TraceCollapsibleContent>
                <TraceContent>
                  <div className="flex flex-col gap-1.5 pl-4 border-l border-border mt-1">
                    <span className="text-xs text-muted-foreground">
                      1. Queried database schema
                    </span>
                    <span className="text-xs text-muted-foreground">
                      2. Checked authentication token scopes
                    </span>
                    <span className="text-xs text-muted-foreground">
                      3. Formatted JSON payload
                    </span>
                  </div>
                </TraceContent>
              </TraceCollapsibleContent>
            </TraceCollapsible>
          </Trace>
        </div>
      ),
      codeSnippet: createExampleSource({
        imports: [
          "Trace",
          "TraceCollapsible",
          "TraceCollapsibleContent",
          "TraceCollapsibleTrigger",
          "TraceContent",
          "TraceIcon",
          "TraceLine",
          "TraceTitle",
        ],
        body: `<Trace variant="card">
  <TraceCollapsible defaultOpen>
    <TraceCollapsibleTrigger>
      <TraceLine status="success">
        <TraceIcon status="success" />
        <TraceTitle>Researched in 3 steps</TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent>
      <TraceContent>
        <div className="mt-1 flex flex-col gap-1.5 border-l border-border pl-4">
          <span className="text-xs text-muted-foreground">1. Queried database schema</span>
          <span className="text-xs text-muted-foreground">2. Checked authentication token scopes</span>
          <span className="text-xs text-muted-foreground">3. Formatted JSON payload</span>
        </div>
      </TraceContent>
    </TraceCollapsibleContent>
  </TraceCollapsible>
</Trace>`,
      }),
    },
  ];

  const propsList: PropDefinition[] = [
    {
      name: "status",
      type: '"default" | "running" | "success" | "error"',
      default: '"default"',
      description: "Execution status determining icon and tint.",
    },
    {
      name: "variant",
      type: '"default" | "card"',
      default: '"default"',
      description: "Visual container style.",
    },
    {
      name: "defaultOpen",
      type: "boolean",
      default: "false",
      description: "Whether collapsible trace is expanded by default.",
    },
  ];

  const cssClasses: CssClassDefinition[] = [
    { name: ".dl-trace", description: "Root container for step execution." },
    { name: ".dl-trace-line", description: "Individual step row." },
    { name: ".dl-trace-icon", description: "Left status icon indicator." },
    {
      name: ".dl-shimmer",
      description: "Animated light sweep utility for streaming states.",
    },
  ];

  return (
    <ComponentView
      title="Trace"
      description="Vertical step execution line primitive with status icons, animated running states, and collapsible step groups. Powers Chain of Thought and Tool Call visualizers."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
