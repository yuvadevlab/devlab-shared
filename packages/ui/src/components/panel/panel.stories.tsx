import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Panel } from "./panel";

const meta: Meta<typeof Panel> = {
  title: "Components/Panel",
  component: Panel,
};

export default meta;
type Story = StoryObj<typeof Panel>;

export const Default: Story = {
  render: () => (
    <div className="dl-story-w-md">
      <Panel title="Agent Inspection Telemetry">
        <p className="dl-p-4">
          All threads nominal. Memory utilization: 128MB.
        </p>
      </Panel>
    </div>
  ),
};
