"use client";

import React from "react";
import { Info, AlertCircle, RefreshCw } from "lucide-react";
import { Alert, AlertTitle, AlertDescription, Button } from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
} from "../../../components/component-view";

export default function AlertDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "info",
      title: "Informational Alert",
      description:
        "Standard system status notification with leading icon, bold title, and description.",
      preview: (
        <div className="w-full max-w-md">
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
  <Info className="size-4" />
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
        <div className="w-full max-w-md">
          <Alert variant="destructive">
            <AlertCircle className="size-4" />
            <AlertTitle>Critical Tool Step Failure</AlertTitle>
            <AlertDescription>
              Cluster agent execution terminated due to budget limit exhaustion.
            </AlertDescription>
          </Alert>
        </div>
      ),
      codeSnippet: `<Alert variant="destructive">
  <AlertCircle className="size-4" />
  <AlertTitle>Critical Tool Step Failure</AlertTitle>
  <AlertDescription>Execution budget limit exhausted.</AlertDescription>
</Alert>`,
    },
    {
      id: "with-action",
      title: "Alert with Action Button",
      description:
        "AntD-inspired actionable banner allowing users to immediately trigger recovery.",
      preview: (
        <div className="w-full max-w-md">
          <Alert
            variant="default"
            className="flex items-center justify-between"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Info className="size-4" />
                <AlertTitle>Configuration Stale</AlertTitle>
              </div>
              <AlertDescription>
                A new schema revision is available for your database.
              </AlertDescription>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="h-7 text-xs gap-1.5 shrink-0 ml-4"
            >
              <RefreshCw className="size-3" />
              <span>Sync</span>
            </Button>
          </Alert>
        </div>
      ),
      codeSnippet: `<Alert className="flex items-center justify-between">
  <div>
    <AlertTitle>Configuration Stale</AlertTitle>
    <AlertDescription>New schema revision available.</AlertDescription>
  </div>
  <Button size="sm" variant="outline">Sync</Button>
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
