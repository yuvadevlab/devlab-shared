"use client";

import React from "react";
import { Database, Terminal } from "lucide-react";
import { ToolCall } from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
  type PropDefinition,
  type CssClassDefinition,
} from "@/components/component-view";

const mockQueryResult = JSON.stringify(
  [
    { id: "usr_1", name: "Alice", email: "alice@devlab.io", role: "admin" },
    { id: "usr_2", name: "Bob", email: "bob@devlab.io", role: "developer" },
  ],
  null,
  2,
);

const COMPLETED_CODE = `import { Database } from "lucide-react";
import { ToolCall } from "@yuva-devlab/ui";

const RESULT = JSON.stringify(
  [
    { id: "usr_1", name: "Alice", email: "alice@devlab.io", role: "admin" },
    { id: "usr_2", name: "Bob", email: "bob@devlab.io", role: "developer" },
  ],
  null,
  2,
);

export function ToolCallDemo() {
  return (
    <ToolCall
      name="query_database"
      status="success"
      durationMs={142}
      defaultOpen
      icon={<Database aria-hidden="true" />}
      args={{ table: "users", limit: 2 }}
      result={RESULT}
    />
  );
}`;

const RUNNING_CODE = `import { Terminal } from "lucide-react";
import { ToolCall } from "@yuva-devlab/ui";

export function RunningToolCallDemo() {
  return (
    <ToolCall
      name="npm_run_test"
      status="running"
      defaultOpen
      icon={<Terminal aria-hidden="true" />}
      args={{ suite: "auth-guard.spec.ts", watch: false }}
    />
  );
}`;

export default function ToolCallDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "basic",
      title: "Completed Tool Execution",
      description:
        "Tool call card showing parameter pills, latency badge, and syntax-highlighted JSON output.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md">
          <ToolCall
            name="query_database"
            status="success"
            durationMs={142}
            defaultOpen
            icon={<Database aria-hidden="true" />}
            args={{ table: "users", limit: 2 }}
            result={mockQueryResult}
          />
        </div>
      ),
      codeSnippet: COMPLETED_CODE,
    },
    {
      id: "running",
      title: "Live Running Status",
      description: "Active tool call while awaiting API or script response.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md">
          <ToolCall
            name="npm_run_test"
            status="running"
            defaultOpen
            icon={<Terminal aria-hidden="true" />}
            args={{ suite: "auth-guard.spec.ts", watch: false }}
          />
        </div>
      ),
      codeSnippet: RUNNING_CODE,
    },
  ];

  const propsList: PropDefinition[] = [
    {
      name: "name",
      type: "string",
      default: "—",
      description: "Function identifier or command name.",
    },
    {
      name: "status",
      type: '"running" | "success" | "error"',
      default: '"success"',
      description: "Execution state pill indicator.",
    },
    {
      name: "durationMs",
      type: "number",
      default: "—",
      description: "Elapsed tool duration shown beside status badge.",
    },
    {
      name: "result",
      type: "string",
      default: "—",
      description: "Output string rendered in a syntax-highlighted CodeBlock.",
    },
  ];

  const cssClasses: CssClassDefinition[] = [
    { name: ".dl-tool-call", description: "Container card for tool call." },
    {
      name: ".dl-tool-call__header",
      description: "Top bar with tool name, timing, and status pill.",
    },
    {
      name: ".dl-tool-call__arg-pill",
      description: "Parameter key/value badge.",
    },
  ];

  return (
    <ComponentView
      title="Tool Call"
      description="Visualizer card for agent tool executions, displaying tool name, parameter pills, latency, and syntax-highlighted return payloads."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
