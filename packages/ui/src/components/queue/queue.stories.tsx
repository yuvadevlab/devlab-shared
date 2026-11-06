import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Queue, QueueTask } from "./queue";

const meta: Meta<typeof Queue> = {
  title: "AI Elements/Queue",
  component: Queue,
};

export default meta;
type Story = StoryObj<typeof Queue>;

const initialTasks: QueueTask[] = [
  {
    id: "q-1",
    title: "Parse workspace dependency graph",
    priority: "high",
    status: "active",
    estimatedDuration: "1.2s",
  },
  {
    id: "q-2",
    title: "Synthesize API endpoints in apps/api",
    priority: "normal",
    status: "waiting",
    estimatedDuration: "4.5s",
  },
  {
    id: "q-3",
    title: "Run integration tests across packages",
    priority: "low",
    status: "waiting",
    estimatedDuration: "12s",
  },
];

export const Default: Story = {
  render: () => {
    const [tasks, setTasks] = useState(initialTasks);
    return (
      <div className="dl-story-w-lg">
        <Queue
          tasks={tasks}
          onRemoveTask={(id) =>
            setTasks((prev) => prev.filter((t) => t.id !== id))
          }
        />
      </div>
    );
  },
};
