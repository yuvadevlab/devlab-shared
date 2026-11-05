"use client";

import React from "react";
import { TestResults, type TestCaseItem } from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
  type PropDefinition,
  type CssClassDefinition,
} from "@/components/component-view";
import { createExampleSource } from "@/lib/create-example-source";

const suiteTests: TestCaseItem[] = [
  {
    id: "t-1",
    name: "ModelSelector triggers outside click handler",
    status: "passed",
    durationMs: 14,
  },
  {
    id: "t-2",
    name: "PlanTask toggles subtask details on click",
    status: "passed",
    durationMs: 8,
  },
  {
    id: "t-3",
    name: "StackTrace copies full stack to clipboard",
    status: "passed",
    durationMs: 22,
  },
  {
    id: "t-4",
    name: "ContextUsage warns when usage exceeds 75%",
    status: "failed",
    durationMs: 45,
    errorMessage: `AssertionError: expected 'dl-context-usage__bar-fill--warning' to be present
  at packages/ui/test/context.test.ts:32:15`,
  },
  {
    id: "t-5",
    name: "Subagent renders conversation ID pill",
    status: "skipped",
  },
];

export default function TestResultsDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "default",
      title: "Suite Execution Summary",
      description:
        "Execution dashboard showing pass/fail counts, total duration, and expandable failure logs.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md">
          <div className="w-full max-w-lg">
            <TestResults
              title="AI Elements Vitest Suite"
              duration="182ms"
              tests={suiteTests}
            />
          </div>
        </div>
      ),
      codeSnippet: createExampleSource({
        imports: ["TestResults", "type TestCaseItem"],
        setup: `const tests: TestCaseItem[] = [
  {
    id: "test-1",
    name: "renders a completed task",
    status: "passed",
    durationMs: 14,
  },
  {
    id: "test-2",
    name: "shows a useful error when loading fails",
    status: "failed",
    durationMs: 45,
    errorMessage: "Expected the request to succeed, but it returned 500.",
  },
  {
    id: "test-3",
    name: "skips browser-only checks in Node",
    status: "skipped",
  },
];`,
        body: `<TestResults
  title="AI Elements test suite"
  duration="182ms"
  tests={tests}
/>`,
      }),
    },
  ];

  const propsList: PropDefinition[] = [
    {
      name: "tests",
      type: "TestCaseItem[]",
      default: "[]",
      description:
        "Array of test cases with name, status, durationMs, and errorMessage.",
    },
    {
      name: "title",
      type: "string",
      default: '"Test Results"',
      description: "Title of the test suite.",
    },
    {
      name: "duration",
      type: "string",
      default: "—",
      description: "Total elapsed time string.",
    },
  ];

  const cssClasses: CssClassDefinition[] = [
    {
      name: ".dl-test-results",
      description: "Outer card container for test results.",
    },
    {
      name: ".dl-test-results__header",
      description: "Top bar showing title and pass/fail summary counters.",
    },
    {
      name: ".dl-test-case",
      description:
        "Test row with status icon, duration, and expandable assertion error.",
    },
  ];

  return (
    <ComponentView
      title="Test Results"
      description="Test execution results dashboard displaying passed, failed, and skipped test outcomes, duration timings, and assertion failure logs."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
