"use client";

import React from "react";
import { Panel, Badge, Button } from "@yuva-devlab/ui";
import { ComponentView, ComponentVariant } from "@/components/component-view";

/**
 * Documentation page for Panel component showcasing bordered cards with headers, badges, and action bars.
 */
export default function PanelDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "badge",
      title: "Panel with Header Badge & Actions",
      description:
        "Structured container featuring top-level titles, active status badges, and action buttons.",
      preview: (
        <div className="w-full max-w-sm">
          <Panel
            title="Agent Execution Pool"
            meta={<Badge variant="default">Active • 12 Nodes</Badge>}
          >
            <div className="space-y-3 p-4 text-xs text-muted-foreground">
              <p>
                Autonomous workers are actively scheduling tasks across isolated
                sandboxes.
              </p>
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline">
                  Inspect Pool
                </Button>
                <Button size="sm" variant="secondary">
                  Scale Workers
                </Button>
              </div>
            </div>
          </Panel>
        </div>
      ),
      codeSnippet: `<Panel
  title="Agent Execution Pool"
  meta={<Badge variant="default">Active • 12 Nodes</Badge>}
>
  <div className="p-4 text-xs space-y-3">
    <p>Autonomous workers actively scheduling tasks.</p>
    <div className="flex gap-2">
      <Button size="sm" variant="outline">Inspect Pool</Button>
      <Button size="sm" variant="secondary">Scale Workers</Button>
    </div>
  </div>
</Panel>`,
    },
    {
      id: "minimal",
      title: "Minimalist Bordered Panel",
      description:
        "Clean bordered panel without metadata tags for clean grouped forms or metrics.",
      preview: (
        <div className="w-full max-w-sm">
          <Panel title="Database Credentials">
            <div className="p-4 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-border">
                <span className="text-muted-foreground">Host:</span>
                <span className="font-mono text-foreground">
                  db.cluster.internal
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">Port:</span>
                <span className="font-mono text-foreground">5432</span>
              </div>
            </div>
          </Panel>
        </div>
      ),
      codeSnippet: `<Panel title="Database Credentials">
  <div className="p-4 space-y-2 text-xs">
    <div className="flex justify-between">
      <span>Host:</span>
      <span>db.cluster.internal</span>
    </div>
  </div>
</Panel>`,
    },
  ];

  const propsList = [
    {
      name: "title",
      type: "string",
      default: "undefined",
      description: "Header title string displayed at the top of the panel.",
    },
    {
      name: "meta",
      type: "React.ReactNode",
      default: "undefined",
      description: "Right-aligned header slot for badges, tags, or switches.",
    },
    {
      name: "children",
      type: "React.ReactNode",
      default: "undefined",
      description: "Body contents rendered inside the panel surface.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-panel",
      description: "Bordered container card with subtle background shading.",
    },
    {
      name: ".dl-panel-header",
      description:
        "Header ribbon containing title and right-aligned meta elements.",
    },
  ];

  return (
    <ComponentView
      title="Panel"
      description="A structured container component with a styled header bar, body canvas, and metadata slot, inspired by Ant Design's Card."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
