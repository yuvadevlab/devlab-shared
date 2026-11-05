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
import { createExampleSource } from "@/lib/create-example-source";

const mockQueryResult = JSON.stringify(
  [
    { id: "usr_1", name: "Alice", email: "alice@devlab.io", role: "admin" },
    { id: "usr_2", name: "Bob", email: "bob@devlab.io", role: "developer" },
  ],
  null,
  2,
);

export default function ToolCallDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "basic",
      title: "Completed Tool Execution",
      description:
        "Visual card showing tool name, arguments, and return payload.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md">
          <ToolCall
            name="query_database"
            status="success"
            defaultOpen
            icon={<Database className="size-4" />}
            args={{ table: "users", limit: 2 }}
            result={mockQueryResult}
          />
        </div>
      ),
      codeSnippet: createExampleSource({
        externalImports: ['import { Database } from "lucide-react";'],
        imports: ["ToolCall"],
        setup: `const result = JSON.stringify(
  [
    { id: "usr_1", name: "Alice", role: "admin" },
    { id: "usr_2", name: "Bob", role: "developer" },
  ],
  null,
  2,
);`,
        body: `<ToolCall
  name="query_database"
  status="success"
  defaultOpen
  icon={<Database className="size-4" />}
  args={{ table: "users", limit: 2 }}
  result={result}
/>`,
      }),
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
            icon={<Terminal className="size-4" />}
            args={{ suite: "auth-guard.spec.ts", watch: false }}
          />
        </div>
      ),
      codeSnippet: createExampleSource({
        externalImports: ['import { Terminal } from "lucide-react";'],
        imports: ["ToolCall"],
        body: `<ToolCall
  name="run_tests"
  status="running"
  defaultOpen
  icon={<Terminal className="size-4" />}
  args={{ suite: "auth.spec.ts", watch: false }}
/>`,
      }),
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
      name: "args",
      type: "Record<string, unknown> | string",
      default: "—",
      description: "Input parameter values displayed as pills.",
    },
    {
      name: "result",
      type: "string",
      default: "—",
      description: "Output string rendered inside embedded CodeBlock.",
    },
  ];

  const cssClasses: CssClassDefinition[] = [
    { name: ".dl-tool-call", description: "Container card for tool call." },
    {
      name: ".dl-tool-call__header",
      description: "Top bar with tool name and status pill.",
    },
    {
      name: ".dl-tool-call__arg-pill",
      description: "Parameter key/value badge.",
    },
  ];

  return (
    <ComponentView
      title="Tool Call"
      description="Visualizer card for agent tool executions, displaying tool name, parameter pills, live execution status badge, and expandable return payloads."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
