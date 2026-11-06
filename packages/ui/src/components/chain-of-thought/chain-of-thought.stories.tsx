import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  ChainOfThought,
  ChainOfThoughtHeader,
  ChainOfThoughtContent,
  ChainOfThoughtStep,
} from "./chain-of-thought";

const meta: Meta<typeof ChainOfThought> = {
  title: "AI Elements/ChainOfThought",
  component: ChainOfThought,
};

export default meta;
type Story = StoryObj<typeof ChainOfThought>;

export const Default: Story = {
  render: () => (
    <div className="dl-story-w-md">
      <ChainOfThought durationSeconds={4.2} defaultOpen>
        <ChainOfThoughtHeader />
        <ChainOfThoughtContent>
          <ChainOfThoughtStep status="success">
            Parsed database entities from prisma schema
          </ChainOfThoughtStep>
          <ChainOfThoughtStep status="success">
            Identified missing foreign key index on tenant_id
          </ChainOfThoughtStep>
          <ChainOfThoughtStep status="success">
            Generated SQL migration with CREATE INDEX CONCURRENTLY
          </ChainOfThoughtStep>
        </ChainOfThoughtContent>
      </ChainOfThought>
    </div>
  ),
};

export const CurrentlyThinking: Story = {
  render: () => (
    <div className="dl-story-w-md">
      <ChainOfThought isThinking durationSeconds={1.6} defaultOpen>
        <ChainOfThoughtHeader />
        <ChainOfThoughtContent>
          <ChainOfThoughtStep status="success">
            Fetched active incidents from telemetry pipeline
          </ChainOfThoughtStep>
          <ChainOfThoughtStep status="running">
            Analyzing anomaly correlation across microservices...
          </ChainOfThoughtStep>
        </ChainOfThoughtContent>
      </ChainOfThought>
    </div>
  ),
};
