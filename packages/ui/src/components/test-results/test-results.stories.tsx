import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TestResults, TestCaseItem } from "./test-results";

const meta: Meta<typeof TestResults> = {
  title: "AI Elements/TestResults",
  component: TestResults,
};

export default meta;
type Story = StoryObj<typeof TestResults>;

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

export const Default: Story = {
  render: () => (
    <div className="dl-story-w-lg">
      <TestResults
        title="AI Elements Vitest Suite"
        duration="182ms"
        tests={suiteTests}
      />
    </div>
  ),
};
