"use client";

import React, { useState } from "react";
import {
  StatusBadge,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Flex,
  Stack,
  Box,
} from "@yuva-devlab/ui";
import { ComponentView, ComponentVariant } from "@/components/component-view";

/**
 * Documentation page for StatusBadge component showcasing semantic presets and interactive testing.
 */
export default function StatusBadgeDocPage() {
  const [selectedStatus, setSelectedStatus] = useState("Active");

  const variants: ComponentVariant[] = [
    {
      id: "presets",
      title: "Semantic Status Presets",
      description:
        "Displays color-coded presence and workflow states with an animated status indicator dot.",
      preview: (
        <Flex wrap="wrap" align="center" justify="center" gap={3}>
          <StatusBadge status="Active" />
          <StatusBadge status="In Progress" />
          <StatusBadge status="Completed" />
          <StatusBadge status="Needs Approval" />
          <StatusBadge status="Failed" />
          <StatusBadge status="Offline" />
        </Flex>
      ),
      codeSnippet: `<StatusBadge status="Active" />
<StatusBadge status="In Progress" />
<StatusBadge status="Completed" />
<StatusBadge status="Needs Approval" />
<StatusBadge status="Failed" />
<StatusBadge status="Offline" />`,
    },
    {
      id: "interactive",
      title: "Interactive Status Selector",
      description:
        "Live test how the badge automatically adjusts badge border, background, and indicator colors.",
      preview: (
        <Stack align="center" gap={4}>
          <Flex
            align="center"
            gap={2}
            className="dl-demo-box dl-demo-box--sm dl-demo-desc"
          >
            <span className="dl-demo-heading">Choose State:</span>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="dl-demo-frame--xs dl-demo-desc">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Needs Approval">Needs Approval</SelectItem>
                <SelectItem value="Failed">Failed</SelectItem>
                <SelectItem value="Offline">Offline</SelectItem>
              </SelectContent>
            </Select>
          </Flex>
          <Box className="dl-demo-frame dl-demo-frame--xs">
            <StatusBadge status={selectedStatus} />
          </Box>
        </Stack>
      ),
      codeSnippet: `<StatusBadge status="${selectedStatus}" />`,
    },
  ];

  const propsList = [
    {
      name: "status",
      type: "string",
      default: "—",
      description:
        "Status name string (maps colors for Active, Completed, In Progress, Failed, Offline).",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-status-badge",
      description: "Pill badge wrapping indicator dot and status label text.",
    },
    {
      name: ".dl-status-badge__dot",
      description: "Small circle indicator dot with status color styling.",
    },
  ];

  return (
    <ComponentView
      title="Status Badge"
      description="Visual status pill with semantic color styling and indicator dots, inspired by Ant Design's Badge / Tag status presets."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
