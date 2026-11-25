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
    status: "completed",
    estimatedDuration: "12s",
  },
];

const QUEUE_CODE = `import { useState } from "react";
import { Queue, type QueueTask } from "@yuva-devlab/ui";

const INITIAL_TASKS: QueueTask[] = [
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
    status: "completed",
    estimatedDuration: "12s",
  },
];

export function ExecutionQueueDemo() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  return (
    <Queue
      title="Execution Queue"
      tasks={tasks}
      onRemoveTask={(id) =>
        setTasks((prev) => prev.filter((item) => item.id !== id))
      }
    />
  );
}`;

export default function QueueDocPage() {
  const [tasks, setTasks] = useState(initialTasks);

  const variants: ComponentVariant[] = [
    {
      id: "default",
      title: "Interactive Task Queue",
      description:
        "Execution queue displaying active, waiting, and completed tasks with priority badges and removal triggers.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--lg">
          <Queue
            tasks={tasks}
            onRemoveTask={(id) =>
              setTasks((prev) => prev.filter((t) => t.id !== id))
            }
          />
        </div>
      ),
      codeSnippet: QUEUE_CODE,
    },
  ];

  const propsList: PropDefinition[] = [
    {
      name: "tasks",
      type: "QueueTask[]",
      default: "[]",
      description:
        "Array of queue items with title, priority, status, and estimatedDuration.",
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
      description: "Callback fired when clicking a task remove icon.",
    },
  ];

  const cssClasses: CssClassDefinition[] = [
    {
      name: ".dl-queue",
      description: "Outer card container for execution queue.",
    },
    {
      name: ".dl-queue-item",
      description:
        "Individual task row with index, status icon, and priority pill.",
    },
  ];

  return (
    <ComponentView
      title="Queue"
      description="Agent task execution queue container tracking scheduled, running, completed, and failed jobs."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
