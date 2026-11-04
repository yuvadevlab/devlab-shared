"use client";

import React, { useState } from "react";
import { Queue, type QueueTask } from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
  type PropDefinition,
  type CssClassDefinition,
} from "@/components/component-view";

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

export default function QueueDocPage() {
  const [tasks, setTasks] = useState(initialTasks);

  const variants: ComponentVariant[] = [
    {
      id: "default",
      title: "Interactive Task Queue",
      description:
        "Execution queue displaying running, scheduled, and paused tasks with removal actions.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md">
          <div className="w-full max-w-lg">
            <Queue
              tasks={tasks}
              onRemoveTask={(id) =>
                setTasks((prev) => prev.filter((t) => t.id !== id))
              }
            />
          </div>
        </div>
      ),
      codeSnippet: `<Queue
  tasks={tasks}
  onRemoveTask={(id) => removeTask(id)}
/>`,
    },
  ];

  const propsList: PropDefinition[] = [
    {
      name: "tasks",
      type: "QueueTask[]",
      default: "[]",
      description:
        "Array of queue items with title, priority, status, and duration.",
    },
    {
      name: "title",
      type: "string",
      default: '"Execution Queue"',
      description: "Header title of the queue container.",
    },
    {
      name: "onRemoveTask",
      type: "(taskId: string) => void",
      default: "—",
      description: "Callback fired when clicking the task remove icon.",
    },
  ];

  const cssClasses: CssClassDefinition[] = [
    {
      name: ".dl-queue",
      description: "Outer card container for execution queue.",
    },
    {
      name: ".dl-queue-item",
      description: "Individual task row with index and priority pill.",
    },
  ];

  return (
    <ComponentView
      title="Queue"
      description="Agent task execution queue container tracking scheduled, running, and queued jobs with priority indicators and cancellation actions."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
