"use client";

import React from "react";
import { Subagent } from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
  type PropDefinition,
  type CssClassDefinition,
} from "@/components/component-view";
import { createExampleSource } from "@/lib/create-example-source";

export default function SubagentDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "default",
      title: "Active Subagent Delegation",
      description:
        "Subagent activity card showing name, role, model, conversation ID, and live task output.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md">
          <div className="w-full max-w-xl space-y-3">
            <Subagent
              name="Security Auditor"
              role="Vulnerability & Dependency Scanner"
              status="running"
              model="flash"
              conversationId="c4918e9"
              defaultOpen
            >
              <div className="space-y-1 text-xs text-muted-foreground">
                <div>
                  • Scanned 120 production dependencies in pnpm-lock.yaml
                </div>
                <div>
                  • Auditing OAuth2 token refresh flow in auth.service.ts...
                </div>
              </div>
            </Subagent>

            <Subagent
              name="Database Debugger"
              role="PostgreSQL Query Optimizer"
              status="completed"
              model="pro"
              conversationId="a82190f"
            />
          </div>
        </div>
      ),
      codeSnippet: createExampleSource({
        imports: ["Subagent"],
        body: `<div className="flex max-w-xl flex-col gap-3">
  <Subagent
  name="Security Auditor"
  role="Vulnerability and dependency scanner"
  status="running"
  model="flash"
  conversationId="c4918e9"
  defaultOpen
>
    <div className="space-y-1 text-xs text-muted-foreground">
      <p>Scanned 120 production dependencies.</p>
      <p>Reviewing the token refresh flow.</p>
    </div>
  </Subagent>
  <Subagent
    name="Database Debugger"
    role="PostgreSQL query optimizer"
    status="completed"
    model="pro"
    conversationId="a82190f"
  />
</div>`,
      }),
    },
  ];

  const propsList: PropDefinition[] = [
    {
      name: "name",
      type: "string",
      default: "—",
      description: "Name of the subagent.",
    },
    {
      name: "role",
      type: "string",
      default: "—",
      description: "Job title or role description of the subagent.",
    },
    {
      name: "status",
      type: '"idle" | "running" | "completed" | "failed"',
      default: '"idle"',
      description: "Lifecycle status of the subagent.",
    },
    {
      name: "model",
      type: "string",
      default: "—",
      description: "LLM model powering the subagent.",
    },
    {
      name: "conversationId",
      type: "string",
      default: "—",
      description: "Unique conversation or task ID for the subagent run.",
    },
  ];

  const cssClasses: CssClassDefinition[] = [
    {
      name: ".dl-subagent",
      description: "Outer card container for delegated subagent task.",
    },
    {
      name: ".dl-subagent__header",
      description: "Header row with avatar, name, badges, and status.",
    },
    {
      name: ".dl-subagent__content",
      description:
        "Expandable content container for subagent outputs and messages.",
    },
  ];

  return (
    <ComponentView
      title="Subagent"
      description="Delegation card for multi-agent workflows, displaying subagent roles, models, conversation IDs, and real-time execution outputs."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
