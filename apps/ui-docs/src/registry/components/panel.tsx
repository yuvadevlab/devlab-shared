"use client";

import React from "react";
import { Panel, Badge, Button, Flex, Stack } from "@yuva-devlab/ui";
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
        <div className="dl-demo-frame dl-demo-frame--sm">
          <Panel
            title="Agent Execution Pool"
            meta={<Badge variant="default">Active • 12 Nodes</Badge>}
          >
            <Stack gap={3} className="dl-demo-desc">
              <p>
                Autonomous workers are actively scheduling tasks across isolated
                sandboxes.
              </p>
              <Flex gap={2}>
                <Button size="sm" variant="outline">
                  Inspect Pool
                </Button>
                <Button size="sm" variant="secondary">
                  Scale Workers
                </Button>
              </Flex>
            </Stack>
          </Panel>
        </div>
      ),
      codeSnippet: `<Panel
  title="Agent Execution Pool"
  meta={<Badge variant="default">Active • 12 Nodes</Badge>}
>
  <Stack gap="3" className="dl-demo-desc">
    <p>Autonomous workers actively scheduling tasks.</p>
    <Flex gap="2">
      <Button size="sm" variant="outline">Inspect Pool</Button>
      <Button size="sm" variant="secondary">Scale Workers</Button>
    </Flex>
  </Stack>
</Panel>`,
    },
    {
      id: "minimal",
      title: "Minimalist Bordered Panel",
      description:
        "Clean bordered panel without metadata tags for clean grouped forms or metrics.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--sm">
          <Panel title="Database Credentials">
            <Stack gap={2} className="dl-demo-desc">
              <Flex
                justify="between"
                className="dl-demo-box--collapsible-header"
              >
                <span>Host:</span>
                <span className="dl-demo-code">db.cluster.internal</span>
              </Flex>
              <Flex justify="between">
                <span>Port:</span>
                <span className="dl-demo-code">5432</span>
              </Flex>
            </Stack>
          </Panel>
        </div>
      ),
      codeSnippet: `<Panel title="Database Credentials">
  <Stack gap="2" className="dl-demo-desc">
    <Flex justify="between">
      <span>Host:</span>
      <span>db.cluster.internal</span>
    </Flex>
  </Stack>
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
