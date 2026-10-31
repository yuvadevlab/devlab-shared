"use client";

import React from "react";
import { StatusChip, Flex, Stack } from "@yuva-devlab/ui";
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
        <Flex wrap="wrap" align="center" justify="center" gap={2}>
          <StatusChip status="running" />
          <StatusChip status="ok" />
          <StatusChip status="processing" />
          <StatusChip status="waiting" />
          <StatusChip status="degraded" />
          <StatusChip status="error" />
          <StatusChip status="completed" />
        </Flex>
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
        <Stack gap={2} className="dl-demo-frame dl-demo-frame--sm dl-demo-box">
          <Flex
            align="center"
            justify="between"
            className="dl-demo-row dl-demo-desc"
          >
            <span className="dl-demo-code">01. Query Parser</span>
            <StatusChip status="completed" />
          </Flex>
          <Flex
            align="center"
            justify="between"
            className="dl-demo-row dl-demo-desc"
          >
            <span className="dl-demo-code">02. Vector Search</span>
            <StatusChip status="running" />
          </Flex>
          <Flex
            align="center"
            justify="between"
            className="dl-demo-row dl-demo-desc"
          >
            <span className="dl-demo-code">03. LLM Synthesis</span>
            <StatusChip status="waiting" />
          </Flex>
        </Stack>
      ),
      codeSnippet: `<Stack gap={2}>
  <Flex justify="between">
    <span>01. Query Parser</span>
    <StatusChip status="completed" />
  </Flex>
  <Flex justify="between">
    <span>02. Vector Search</span>
    <StatusChip status="running" />
  </Flex>
</Stack>`,
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
