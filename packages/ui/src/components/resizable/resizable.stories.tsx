import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "./resizable";

const meta: Meta<typeof ResizablePanelGroup> = {
  title: "Components/Resizable",
  component: ResizablePanelGroup,
};

export default meta;
type Story = StoryObj<typeof ResizablePanelGroup>;

export const Default: Story = {
  render: () => (
    <div className="dl-story-w-lg dl-card dl-overflow-hidden dl-h-64">
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel defaultSize={30} className="dl-center dl-p-4">
          Navigation Tree
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={70} className="dl-center dl-p-4">
          Telemetry Dashboard
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};
