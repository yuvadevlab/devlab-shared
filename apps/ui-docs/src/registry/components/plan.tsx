"use client";

import React from "react";
import { Plan, PlanTask, SourceKind, type SourceItem } from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
  type PropDefinition,
  type CssClassDefinition,
} from "@/components/component-view";

const planSources: SourceItem[] = [
  {
    id: "ps-1",
    index: 1,
    title: "PostgreSQL audit_logs Schema",
    url: "/schema/audit_logs",
    kind: SourceKind.DATABASE,
  },
  {
    id: "ps-2",
    index: 2,
    title: "Concurrent Index Reference",
    url: "https://www.postgresql.org/docs/current/sql-createindex.html",
    kind: SourceKind.WEB,
  },
];

const IN_PROGRESS_CODE = `import { Plan, PlanTask, SourceKind, type SourceItem } from "@yuva-devlab/ui";

const PLAN_SOURCES: SourceItem[] = [
  {
    id: "ps-1",
    index: 1,
    title: "PostgreSQL audit_logs Schema",
    url: "/schema/audit_logs",
    kind: SourceKind.DATABASE,
  },
  {
    id: "ps-2",
    index: 2,
    title: "Concurrent Index Reference",
    url: "https://www.postgresql.org/docs/current/sql-createindex.html",
    kind: SourceKind.WEB,
  },
];

export function ExecutionPlanDemo() {
  return (
    <Plan
      title="Database Migration & Optimization"
      description="Transparent execution plan with step details and consulted sources."
      status="in-progress"
      currentStep={2}
      totalSteps={4}
      sources={PLAN_SOURCES}
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
        sources={[PLAN_SOURCES[0]]}
      >
        <div>Progress: 74% scanned (1.2M rows)</div>
      </PlanTask>
      <PlanTask
        title="Verify query execution plan with EXPLAIN ANALYZE"
        status="pending"
      />
    </Plan>
  );
}`;

const COMPLETED_CODE = `import { Plan, PlanTask } from "@yuva-devlab/ui";

export function CompletedPlanDemo() {
  return (
    <Plan
      title="Package Publish Pipeline"
      status="completed"
      currentStep={3}
      totalSteps={3}
    >
      <PlanTask title="Build ESM/CJS bundles via tsup" status="completed" />
      <PlanTask title="Verify TypeScript declarations" status="completed" />
      <PlanTask title="Publish release tags to GitHub" status="completed" />
    </Plan>
  );
}`;

export default function PlanDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "in-progress",
      title: "Execution Plan with Sources",
      description:
        "Transparent task checklist showing completed and active steps alongside consulted sources.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--lg">
          <Plan
            title="Database Migration & Optimization"
            description="Transparent execution plan with step details and consulted sources."
            status="in-progress"
            currentStep={2}
            totalSteps={4}
            sources={planSources}
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
              sources={[planSources[0]]}
            >
              <div>Progress: 74% scanned (1.2M rows)</div>
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
      ),
      codeSnippet: IN_PROGRESS_CODE,
    },
    {
      id: "completed",
      title: "Completed Workflow",
      description: "Plan container showing all finished steps cleanly.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--lg">
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
      ),
      codeSnippet: COMPLETED_CODE,
    },
  ];

  const propsList: PropDefinition[] = [
    {
      name: "title",
      type: "string",
      default: '"Execution Plan"',
      description: "Header title for the execution plan.",
    },
    {
      name: "description",
      type: "string",
      default: "—",
      description: "Subtitle summarizing the overall plan objective.",
    },
    {
      name: "status",
      type: '"pending" | "in-progress" | "completed" | "failed"',
      default: '"in-progress"',
      description: "Overall execution status badge.",
    },
    {
      name: "sources",
      type: "SourceItem[]",
      default: "—",
      description: "Transparent source references consulted during planning.",
    },
  ];

  const cssClasses: CssClassDefinition[] = [
    {
      name: ".dl-plan",
      description: "Outer container card for execution plan.",
    },
    {
      name: ".dl-plan__header",
      description:
        "Header with title shimmer, progress count, and status chip.",
    },
    {
      name: ".dl-plan__sources",
      description: "Consulted source pill footer and per-step citations.",
    },
  ];

  return (
    <ComponentView
      title="Plan"
      description="Agent task execution plan checklist displaying progress counts, expandable task details, and transparent source attribution."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
