"use client";

import React from "react";
import { Subagent } from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
  type PropDefinition,
  type CssClassDefinition,
} from "@/components/component-view";

export default function SubagentDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "default",
      title: "Active Subagent Delegation",
      description:
        "Subagent activity card showing name, role, model, conversation ID, and live task output.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md">
          <div
            style={{
              width: "100%",
              maxWidth: "36rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            <Subagent
              name="Security Auditor"
              role="Vulnerability & Dependency Scanner"
              status="running"
              model="flash"
              conversationId="c4918e9"
              defaultOpen
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.25rem",
                  fontSize: "0.75rem",
                  color: "var(--muted-foreground)",
                }}
              >
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
      codeSnippet: `<Subagent
  name="Security Auditor"
  role="Vulnerability Scanner"
  status="running"
  model="flash"
  conversationId="c4918e9"
  defaultOpen
>
  <div>• Scanned 120 production dependencies</div>
</Subagent>`,
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
