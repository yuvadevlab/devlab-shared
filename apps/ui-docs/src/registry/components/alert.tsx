"use client";

import React from "react";
import { Info, AlertCircle, RefreshCw } from "lucide-react";
import {
  Alert,
  AlertTitle,
  AlertDescription,
  Button,
  Flex,
  Stack,
} from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
} from "@/components/component-view";

export default function AlertDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "info",
      title: "Informational Alert",
      description:
        "Standard system status notification with leading icon, bold title, and description.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md">
          <Alert variant="default">
            <Info className="size-4" />
            <AlertTitle>Cluster Synchronization Scheduled</AlertTitle>
            <AlertDescription>
              OrchestrAI model checkpoints will be committed automatically at
              00:00 UTC.
            </AlertDescription>
          </Alert>
        </div>
      ),
      codeSnippet: `<Alert variant="default">
  <Info />
  <AlertTitle>Cluster Synchronization Scheduled</AlertTitle>
  <AlertDescription>Checkpoints committed at 00:00 UTC.</AlertDescription>
</Alert>`,
    },
    {
      id: "destructive",
      title: "Destructive / Error Alert",
      description:
        "High-priority warning banner styled with destructive error tokens.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md">
          <Alert variant="destructive">
            <AlertCircle />
            <AlertTitle>Critical Tool Step Failure</AlertTitle>
            <AlertDescription>
              Cluster agent execution terminated due to budget limit exhaustion.
            </AlertDescription>
          </Alert>
        </div>
      ),
      codeSnippet: `<Alert variant="destructive">
  <AlertCircle />
  <AlertTitle>Critical Tool Step Failure</AlertTitle>
  <AlertDescription>Execution budget limit exhausted.</AlertDescription>
</Alert>`,
    },
    {
      id: "with-action",
      title: "Alert with Action Button",
      description:
        "Actionable alert with an icon, status message, and recovery control.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md">
          <Alert variant="default">
            <Flex align="center" justify="between" className="dl-demo-frame">
              <Stack gap={1}>
                <Flex align="center" gap={2}>
                  <Info className="size-4 shrink-0" />
                  <AlertTitle>Configuration Stale</AlertTitle>
                </Flex>
                <AlertDescription>
                  A new schema revision is available for your database.
                </AlertDescription>
              </Stack>
              <Button size="sm" variant="outline">
                <RefreshCw className="size-4 shrink-0" />
                <span>Sync</span>
              </Button>
            </Flex>
          </Alert>
        </div>
      ),
      codeSnippet: `<Alert variant="default">
  <Flex align="center" justify="between">
    <Stack gap={1}>
      <Flex align="center" gap={2}>
        <Info className="size-4" />
      <AlertTitle>Configuration Stale</AlertTitle>
      </Flex>
      <AlertDescription>New schema revision available.</AlertDescription>
    </Stack>
    <Button size="sm" variant="outline">
      <RefreshCw className="size-4" />
      Sync
    </Button>
  </Flex>
</Alert>`,
    },
  ];

  const propsList = [
    {
      name: "variant",
      type: '"default" | "destructive"',
      default: '"default"',
      description:
        "Semantic visual presentation variant mapped to .dl-alert--* styles.",
    },
    {
      name: "AlertTitle",
      type: "React.Component",
      default: "—",
      description: "Bold title heading element inside the alert container.",
    },
    {
      name: "AlertDescription",
      type: "React.Component",
      default: "—",
      description:
        "Explanatory description text styled with subdued foreground color.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-alert",
      description:
        "Grid layout container with border, background, and icon slotting.",
    },
    {
      name: ".dl-alert--default",
      description: "Standard surface background and border.",
    },
    {
      name: ".dl-alert--destructive",
      description: "Destructive error styling using var(--destructive).",
    },
  ];

  return (
    <ComponentView
      title="Alert"
      description="Prominent callout banner for system notifications, operational warnings, and error messages. Showcasing informational, destructive, and actionable variants."
      category="Feedback"
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
