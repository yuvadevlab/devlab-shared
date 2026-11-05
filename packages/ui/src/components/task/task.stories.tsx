import type { Meta, StoryObj } from "@storybook/react";
import { Task } from "./task";

const meta: Meta<typeof Task> = {
  title: "AI Elements/Task",
  component: Task,
};

export default meta;
type Story = StoryObj<typeof Task>;

/** Task currently running. */
export const Running: Story = {
  args: {
    title: "Run unit tests",
    description: "Checking packages/ui",
    status: "running",
  },
};

/** Completed task. */
export const Completed: Story = {
  args: { title: "Build package", status: "completed" },
};
