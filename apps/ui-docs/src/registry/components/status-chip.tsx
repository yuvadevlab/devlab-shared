"use client";

import React from "react";
import { StatusChip } from "@yuva-devlab/ui";
import { ComponentView, ComponentVariant } from "@/components/component-view";

/**
 * Documentation page for StatusChip component showcasing operational system states.
 */
export default function StatusChipDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "all",
      title: "Operational Status States",
      description:
        "Standardized chip tags for telemetry, task execution queues, and health diagnostics.",
      preview: (
        <div className="flex flex-wrap items-center justify-center gap-2 p-3">
          <StatusChip status="running" />
          <StatusChip status="ok" />
          <StatusChip status="processing" />
          <StatusChip status="waiting" />
          <StatusChip status="degraded" />
          <StatusChip status="error" />
          <StatusChip status="completed" />
        </div>
      ),
      codeSnippet: `<StatusChip status="running" />
<StatusChip status="ok" />
<StatusChip status="processing" />
<StatusChip status="waiting" />
<StatusChip status="degraded" />
<StatusChip status="error" />
<StatusChip status="completed" />`,
    },
    {
      id: "pipeline",
      title: "Pipeline Task Flow",
      description:
        "Status chips integrated sequentially into an agent pipeline workflow.",
      preview: (
        <div className="w-full max-w-sm space-y-2 p-3 border border-border rounded-xl bg-card">
          <div className="flex items-center justify-between text-xs py-1 border-b border-border/50">
            <span className="font-mono text-muted-foreground">
              01. Query Parser
            </span>
            <StatusChip status="completed" />
          </div>
          <div className="flex items-center justify-between text-xs py-1 border-b border-border/50">
            <span className="font-mono text-muted-foreground">
              02. Vector Search
            </span>
            <StatusChip status="running" />
          </div>
          <div className="flex items-center justify-between text-xs py-1">
            <span className="font-mono text-muted-foreground">
              03. LLM Synthesis
            </span>
            <StatusChip status="waiting" />
          </div>
        </div>
      ),
      codeSnippet: `<div className="flex justify-between">
  <span>01. Query Parser</span>
  <StatusChip status="completed" />
</div>
<div className="flex justify-between">
  <span>02. Vector Search</span>
  <StatusChip status="running" />
</div>`,
    },
  ];

  const propsList = [
    {
      name: "status",
      type: "string",
      default: "undefined",
      description:
        "The status key ('running', 'ok', 'processing', 'waiting', 'degraded', 'error', 'completed').",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-status-chip",
      description: "Inline flex chip pill with border and background.",
    },
    {
      name: ".dl-status-chip__dot",
      description: "Indicator dot styled according to semantic state tone.",
    },
  ];

  return (
    <ComponentView
      title="Status Chip"
      description="Telemetry and operational state indicator chip with scoped color tones, inspired by Ant Design's Tag and Badge components."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
