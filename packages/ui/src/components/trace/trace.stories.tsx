import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Trace,
  TraceLine,
  TraceIcon,
  TraceTitle,
  TraceContent,
  TraceCollapsible,
  TraceCollapsibleTrigger,
  TraceCollapsibleContent,
} from "./trace";

const meta: Meta<typeof Trace> = {
  title: "Components/Trace",
  component: Trace,
};

export default meta;
type Story = StoryObj<typeof Trace>;

export const Default: Story = {
  render: () => (
    <div className="dl-story-w-md">
      <Trace>
        <TraceLine status="success">
          <TraceIcon status="success" />
          <TraceTitle>Read package.json workspace dependencies</TraceTitle>
        </TraceLine>
        <TraceLine status="success">
          <TraceIcon status="success" />
          <TraceTitle>Ran git diff --stat</TraceTitle>
        </TraceLine>
        <TraceLine status="running">
          <TraceIcon status="running" />
          <TraceTitle className="dl-shimmer">
            Executing test suite in background...
          </TraceTitle>
        </TraceLine>
      </Trace>
    </div>
  ),
};

export const CollapsibleTrace: Story = {
  render: () => (
    <div className="dl-story-w-md">
      <Trace variant="card">
        <TraceCollapsible defaultOpen>
          <TraceCollapsibleTrigger>
            <TraceLine status="success">
              <TraceIcon status="success" />
              <TraceTitle>Researched in 3 steps</TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent>
            <TraceContent>
              <div className="flex flex-col gap-2 pl-4 border-l border-border mt-2">
                <div className="text-xs text-muted-foreground">
                  1. Queried database schema for users table
                </div>
                <div className="text-xs text-muted-foreground">
                  2. Verified JWT revocation list
                </div>
                <div className="text-xs text-muted-foreground">
                  3. Generated migration script
                </div>
              </div>
            </TraceContent>
          </TraceCollapsibleContent>
        </TraceCollapsible>
      </Trace>
    </div>
  ),
};
