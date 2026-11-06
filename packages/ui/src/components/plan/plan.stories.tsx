import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Plan, PlanTask } from "./plan";

const meta: Meta<typeof Plan> = {
  title: "AI Elements/Plan",
  component: Plan,
};

export default meta;
type Story = StoryObj<typeof Plan>;

export const Default: Story = {
  render: () => (
    <div className="dl-story-w-lg">
      <Plan
        title="Migration to Turborepo 2.4"
        status="in-progress"
        currentStep={2}
        totalSteps={4}
      >
        <PlanTask
          title="Audit existing workspaces and package.json scripts"
          status="completed"
          description="Found 2 apps and 4 packages with mismatched typescript versions."
        />
        <PlanTask
          title="Harmonize ESLint flat configs and dependencies"
          status="completed"
          description="Updated ESLint to v9 with typescript-eslint modern config."
        />
        <PlanTask
          title="Run pipeline tests and verify zero build cache misses"
          status="running"
          description="Executing 'turbo run build --cache-dir=.turbo' across workspaces."
          defaultExpanded
        >
          <div className="space-y-1 text-xs text-muted-foreground border-l-2 border-primary/40 pl-2">
            <div>• @yuva-devlab/tokens: SUCCESS (cached)</div>
            <div>• @yuva-devlab/ui: IN_PROGRESS...</div>
          </div>
        </PlanTask>
        <PlanTask
          title="Deploy preview build to Vercel"
          status="pending"
          description="Will trigger automatically once all builds succeed."
        />
      </Plan>
    </div>
  ),
};

export const CompletedPlan: Story = {
  render: () => (
    <div className="dl-story-w-lg">
      <Plan
        title="Database Index Optimization"
        status="completed"
        currentStep={3}
        totalSteps={3}
      >
        <PlanTask
          title="Analyze slow queries in audit_logs"
          status="completed"
        />
        <PlanTask
          title="Create compound index on (workspace_id, created_at DESC)"
          status="completed"
        />
        <PlanTask
          title="Verify query plan using EXPLAIN ANALYZE"
          status="completed"
        />
      </Plan>
    </div>
  ),
};
