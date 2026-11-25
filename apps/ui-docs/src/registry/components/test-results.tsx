"use client";

import React from "react";
import { TestResults, type TestCaseItem } from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
  type PropDefinition,
  type CssClassDefinition,
} from "@/components/component-view";

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
    errorMessage: `AssertionError: expected warning status to be present
  at packages/ui/test/context.test.ts:32:15`,
  },
  {
    id: "t-5",
    name: "Subagent renders conversation ID pill",
    status: "skipped",
  },
];

const TEST_RESULTS_CODE = `import { TestResults, type TestCaseItem } from "@yuva-devlab/ui";

const SUITE_TESTS: TestCaseItem[] = [
  {
    id: "t-1",
    name: "ModelSelector triggers outside click handler",
    status: "passed",
    durationMs: 14,
  },
  {
    id: "t-2",
    name: "ContextUsage warns when usage exceeds 75%",
    status: "failed",
    durationMs: 45,
    errorMessage: "AssertionError: expected warning status to be present",
  },
  {
    id: "t-3",
    name: "Subagent renders conversation ID pill",
    status: "skipped",
  },
];

export function TestResultsDemo() {
  return (
    <TestResults
      title="AI Elements Vitest Suite"
      duration="182ms"
      tests={SUITE_TESTS}
    />
  );
}`;

export default function TestResultsDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "default",
      title: "Suite Execution Summary",
      description:
        "Pass/fail progress bar, status pills, timings, and expandable failure diagnostics.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--lg">
          <TestResults
            title="AI Elements Vitest Suite"
            duration="182ms"
            tests={suiteTests}
          />
        </div>
      ),
      codeSnippet: TEST_RESULTS_CODE,
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
      description: "Total elapsed run duration label.",
    },
  ];

  const cssClasses: CssClassDefinition[] = [
    {
      name: ".dl-test-results",
      description: "Outer card container with header and pass/fail strip.",
    },
    {
      name: ".dl-test-case",
      description:
        "Test assertion row with status icon, duration, and error box.",
    },
  ];

  return (
    <ComponentView
      title="Test Results"
      description="Test execution dashboard displaying pass/fail/skipped counts, summary bar, timings, and expandable failure diagnostics."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
