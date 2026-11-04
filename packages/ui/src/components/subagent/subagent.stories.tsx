import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Subagent } from "./subagent";

const meta: Meta<typeof Subagent> = {
  title: "AI Elements/Subagent",
  component: Subagent,
};

export default meta;
type Story = StoryObj<typeof Subagent>;

export const Default: Story = {
  render: () => (
    <div className="dl-story-w-lg space-y-3">
      <Subagent
        name="Security Auditor"
        role="Vulnerability & Dependency Scanner"
        status="running"
        model="flash"
        conversationId="c4918e9"
        defaultOpen
      >
        <div className="space-y-1 text-xs text-muted-foreground">
          <div>• Scanned 120 production dependencies in pnpm-lock.yaml</div>
          <div>• Auditing OAuth2 token refresh flow in auth.service.ts...</div>
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
  ),
};
