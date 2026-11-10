"use client";

import React from "react";
import { Plan, PlanTask } from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
  type PropDefinition,
  type CssClassDefinition,
} from "@/components/component-view";

export default function PlanDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "in-progress",
      title: "In-Progress Execution Plan",
      description:
        "Structured task checklist showing completed, running, and queued steps with subtask details.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md">
          <div className="w-full max-w-xl">
            <Plan
              title="Database Migration & Optimization"
              status="in-progress"
              currentStep={2}
              totalSteps={4}
            >
              <PlanTask
                title="Audit audit_logs table schema and indexes"
                status="completed"
                description="Verified 14 indexes across 12 partitions."
              />
              <PlanTask
                title="Create compound index on (workspace_id, created_at DESC)"
                status="running"
                description="Executing concurrent index creation on replica..."
                defaultExpanded
              >
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--muted-foreground)",
                    borderLeft:
                      "2px solid color-mix(in oklch, var(--primary) 40%, transparent)",
                    paddingLeft: "0.5rem",
                  }}
                >
                  Progress: 74% scanned (1.2M rows)
                </div>
              </PlanTask>
              <PlanTask
                title="Verify query execution plan with EXPLAIN ANALYZE"
                status="pending"
              />
              <PlanTask
                title="Update application query hooks in packages/ui"
                status="pending"
              />
            </Plan>
          </div>
        </div>
      ),
      codeSnippet: `<Plan
  title="Database Migration"
  status="in-progress"
  currentStep={2}
  totalSteps={4}
>
  <PlanTask title="Audit schema" status="completed" />
  <PlanTask title="Create index" status="running" defaultExpanded />
  <PlanTask title="Verify plan" status="pending" />
</Plan>`,
    },
    {
      id: "completed",
      title: "Completed Workflow",
      description:
        "Plan container showing all successfully finished operations.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md">
          <div className="w-full max-w-xl">
            <Plan
              title="Package Publish Pipeline"
              status="completed"
              currentStep={3}
              totalSteps={3}
            >
              <PlanTask
                title="Build ESM/CJS bundles via tsup"
                status="completed"
              />
              <PlanTask
                title="Verify TypeScript declarations (d.ts)"
                status="completed"
              />
              <PlanTask
                title="Publish release tags to GitHub"
                status="completed"
              />
            </Plan>
          </div>
        </div>
      ),
      codeSnippet: `<Plan
  title="Package Publish Pipeline"
  status="completed"
  currentStep={3}
  totalSteps={3}
>
  <PlanTask title="Build bundles" status="completed" />
  <PlanTask title="Publish release" status="completed" />
</Plan>`,
    },
  ];

  const propsList: PropDefinition[] = [
    {
      name: "title",
      type: "string",
      default: '"Execution Plan"',
      description: "Header title for the plan.",
    },
    {
      name: "status",
      type: '"pending" | "in-progress" | "completed" | "failed"',
      default: '"in-progress"',
      description: "Overall execution status badge.",
    },
    {
      name: "currentStep",
      type: "number",
      default: "—",
      description: "Current step index for progress computation.",
    },
    {
      name: "totalSteps",
      type: "number",
      default: "—",
      description: "Total number of steps in the plan.",
    },
  ];

  const cssClasses: CssClassDefinition[] = [
    {
      name: ".dl-plan",
      description: "Outer card container for the execution plan.",
    },
    {
      name: ".dl-plan__header",
      description: "Top bar showing plan title, progress, and status badge.",
    },
    {
      name: ".dl-plan__task",
      description:
        "Individual task row with status icon and expandable details.",
    },
    {
      name: ".dl-plan__task-title",
      description: "Primary task summary title.",
    },
  ];

  return (
    <ComponentView
      title="Plan"
      description="Hierarchical execution plan and task checklist component for displaying multi-step AI agent workflows, background tasks, and deployment stages."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
