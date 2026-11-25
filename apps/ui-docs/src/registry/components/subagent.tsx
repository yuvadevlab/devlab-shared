"use client";

import React from "react";
import { Subagent, Stack } from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
  type PropDefinition,
  type CssClassDefinition,
} from "@/components/component-view";

const SUBAGENT_CODE = `import { Subagent, Stack } from "@yuva-devlab/ui";

export function SubagentDelegationDemo() {
  return (
    <Stack gap={3}>
      <Subagent
        name="Security Auditor"
        role="Vulnerability & Dependency Scanner"
        status="running"
        model="flash"
        conversationId="c4918e9"
        defaultOpen
      >
        <div>• Scanned 120 production dependencies in pnpm-lock.yaml</div>
        <div>• Auditing OAuth2 token refresh flow in auth.service.ts...</div>
      </Subagent>

      <Subagent
        name="Database Debugger"
        role="PostgreSQL Query Optimizer"
        status="completed"
        model="pro"
        durationMs={1420}
        conversationId="a82190f"
      />
    </Stack>
  );
}`;

export default function SubagentDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "default",
      title: "Active Subagent Delegation",
      description:
        "Subagent activity card showing role, model, latency chip, conversation ID, and task output.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--lg">
          <Stack gap={3}>
            <Subagent
              name="Security Auditor"
              role="Vulnerability & Dependency Scanner"
              status="running"
              model="flash"
              conversationId="c4918e9"
              defaultOpen
            >
              <div>• Scanned 120 production dependencies in pnpm-lock.yaml</div>
              <div>
                • Auditing OAuth2 token refresh flow in auth.service.ts...
              </div>
            </Subagent>

            <Subagent
              name="Database Debugger"
              role="PostgreSQL Query Optimizer"
              status="completed"
              model="pro"
              durationMs={1420}
              conversationId="a82190f"
            />
          </Stack>
        </div>
      ),
      codeSnippet: SUBAGENT_CODE,
    },
  ];

  const propsList: PropDefinition[] = [
    {
      name: "name",
      type: "string",
      default: "—",
      description: "Display name of the delegated subagent.",
    },
    {
      name: "role",
      type: "string",
      default: "—",
      description: "Job title or summary description.",
    },
    {
      name: "status",
      type: '"idle" | "running" | "completed" | "failed"',
      default: '"idle"',
      description: "Lifecycle status pill indicator.",
    },
    {
      name: "durationMs",
      type: "number",
      default: "—",
      description: "Optional execution latency rendered in header.",
    },
  ];

  const cssClasses: CssClassDefinition[] = [
    { name: ".dl-subagent", description: "Card container for subagent task." },
    {
      name: ".dl-subagent__header",
      description:
        "Responsive header bar with avatar, title, and status pills.",
    },
    {
      name: ".dl-subagent__content",
      description: "Expandable region showing delegated worker logs.",
    },
  ];

  return (
    <ComponentView
      title="Subagent"
      description="Subagent lifecycle card showing role, model, execution latency, and expandable worker output."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
