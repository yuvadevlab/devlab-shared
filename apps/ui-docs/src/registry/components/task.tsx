"use client";

import { Task } from "@yuva-devlab/ui";
import { ComponentView } from "@/components/component-view";
import { createExampleSource } from "@/lib/create-example-source";

/**
 * Interactive documentation for Task.
 */
export default function TaskDoc() {
  return (
    <ComponentView
      title="Task"
      category="AI Elements"
      description="Task status row for pending, running, completed, or failed work."
      preview={
        <Task
          title="Run unit tests"
          description="Checking packages/ui"
          status="running"
        />
      }
      codeSnippet={createExampleSource({
        imports: ["Task"],
        body: `<div className="flex flex-col gap-2">
  <Task
    title="Run unit tests"
    description="Checking packages/ui"
    status="running"
  />
  <Task
    title="Build production bundles"
    description="ESM and CJS output generated"
    status="completed"
  />
</div>`,
      })}
      propsList={[
        {
          name: "title",
          type: "string",
          default: "—",
          description: "Short task title.",
        },
        {
          name: "description",
          type: "string",
          default: "—",
          description: "Optional supporting text.",
        },
        {
          name: "status",
          type: '"pending" | "running" | "completed" | "failed"',
          default: '"pending"',
          description: "Current execution status.",
        },
      ]}
    />
  );
}
