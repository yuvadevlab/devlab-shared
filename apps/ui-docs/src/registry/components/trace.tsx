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
  Stack,
  Text,
} from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
  type PropDefinition,
  type CssClassDefinition,
} from "@/components/component-view";

const BASIC_TRACE_CODE = `import {
  Trace,
  TraceLine,
  TraceIcon,
  TraceTitle,
} from "@yuva-devlab/ui";

export function TraceSequenceDemo() {
  return (
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
  );
}`;

const COLLAPSIBLE_TRACE_CODE = `import {
  Trace,
  TraceLine,
  TraceIcon,
  TraceTitle,
  TraceContent,
  TraceCollapsible,
  TraceCollapsibleTrigger,
  TraceCollapsibleContent,
  Stack,
  Text,
} from "@yuva-devlab/ui";

export function CollapsibleTraceDemo() {
  return (
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
            <Stack gap={1}>
              <Text variant="caption">1. Queried database schema</Text>
              <Text variant="caption">2. Checked OAuth token scopes</Text>
              <Text variant="caption">3. Formatted response payload</Text>
            </Stack>
          </TraceContent>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    </Trace>
  );
}`;

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
      codeSnippet: BASIC_TRACE_CODE,
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
                  <Stack gap={1}>
                    <Text variant="caption">1. Queried database schema</Text>
                    <Text variant="caption">
                      2. Checked authentication token scopes
                    </Text>
                    <Text variant="caption">3. Formatted JSON payload</Text>
                  </Stack>
                </TraceContent>
              </TraceCollapsibleContent>
            </TraceCollapsible>
          </Trace>
        </div>
      ),
      codeSnippet: COLLAPSIBLE_TRACE_CODE,
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
    { name: ".dl-trace", description: "Vertical trace timeline container." },
    { name: ".dl-trace-line", description: "Single trace milestone row." },
  ];

  return (
    <ComponentView
      title="Trace"
      description="Hierarchical step execution spine with crisp status icons and collapsible agent research branches."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
