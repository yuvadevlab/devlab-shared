"use client";

import React from "react";
import {
  Queue,
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@yuva-devlab/ui";
import {
  Circle,
  CircleCheck,
  CircleDot,
  ListChecks,
  ListTodo,
} from "lucide-react";
import {
  ComponentView,
  type ComponentVariant,
  type PropDefinition,
  type CssClassDefinition,
} from "@/components/component-view";
import { createExampleSource } from "@/lib/create-example-source";

export default function QueueDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "default",
      title: "Pending and Completed Tasks",
      description:
        "Trace-based queue with collapsible groups for remaining and completed work.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md">
          <Queue aria-label="Theme update tasks" className="w-full max-w-lg">
            <TraceCollapsible defaultOpen>
              <TraceCollapsibleTrigger>
                <TraceLine>
                  <TraceIcon>
                    <ListTodo />
                  </TraceIcon>
                  <TraceTitle>2 to do</TraceTitle>
                </TraceLine>
              </TraceCollapsibleTrigger>
              <TraceCollapsibleContent>
                <Trace>
                  <TraceLine status="running">
                    <TraceIcon>
                      <CircleDot />
                    </TraceIcon>
                    <TraceTitle>Read theme configuration</TraceTitle>
                  </TraceLine>
                  <TraceLine>
                    <TraceIcon>
                      <Circle />
                    </TraceIcon>
                    <TraceTitle>Add appearance preference</TraceTitle>
                  </TraceLine>
                </Trace>
              </TraceCollapsibleContent>
            </TraceCollapsible>
            <TraceCollapsible defaultOpen>
              <TraceCollapsibleTrigger>
                <TraceLine>
                  <TraceIcon>
                    <ListChecks />
                  </TraceIcon>
                  <TraceTitle>1 completed</TraceTitle>
                </TraceLine>
              </TraceCollapsibleTrigger>
              <TraceCollapsibleContent>
                <Trace>
                  <TraceLine>
                    <TraceIcon>
                      <CircleCheck />
                    </TraceIcon>
                    <TraceTitle>Define semantic color tokens</TraceTitle>
                  </TraceLine>
                </Trace>
              </TraceCollapsibleContent>
            </TraceCollapsible>
          </Queue>
        </div>
      ),
      codeSnippet: createExampleSource({
        externalImports: [
          'import { Circle, CircleCheck, CircleDot, ListChecks, ListTodo } from "lucide-react";',
        ],
        imports: [
          "Queue",
          "Trace",
          "TraceCollapsible",
          "TraceCollapsibleContent",
          "TraceCollapsibleTrigger",
          "TraceIcon",
          "TraceLine",
          "TraceTitle",
        ],
        body: `<Queue aria-label="Theme update tasks">
  <TraceCollapsible defaultOpen>
    <TraceCollapsibleTrigger>
      <TraceLine>
        <TraceIcon><ListTodo /></TraceIcon>
        <TraceTitle>2 to do</TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent>
      <Trace>
        <TraceLine status="running">
          <TraceIcon><CircleDot /></TraceIcon>
          <TraceTitle>Read theme configuration</TraceTitle>
        </TraceLine>
        <TraceLine>
          <TraceIcon><Circle /></TraceIcon>
          <TraceTitle>Add appearance preference</TraceTitle>
        </TraceLine>
      </Trace>
    </TraceCollapsibleContent>
  </TraceCollapsible>
  <TraceCollapsible defaultOpen>
    <TraceCollapsibleTrigger>
      <TraceLine>
        <TraceIcon><ListChecks /></TraceIcon>
        <TraceTitle>1 completed</TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent>
      <Trace>
        <TraceLine>
          <TraceIcon><CircleCheck /></TraceIcon>
          <TraceTitle>Define semantic color tokens</TraceTitle>
        </TraceLine>
      </Trace>
    </TraceCollapsibleContent>
  </TraceCollapsible>
</Queue>`,
      }),
    },
  ];

  const propsList: PropDefinition[] = [
    {
      name: "children",
      type: "React.ReactNode",
      default: "—",
      description:
        "Trace lines and collapsible groups composing the agent's queue.",
    },
    {
      name: "tasks",
      type: "QueueTask[]",
      default: "undefined",
      description: "Optional backwards-compatible data-driven task list.",
    },
  ];

  const cssClasses: CssClassDefinition[] = [
    {
      name: ".dl-trace",
      description: "Outer container for grouped queue activity.",
    },
    {
      name: ".dl-trace-line",
      description: "Individual pending or completed task row.",
    },
  ];

  return (
    <ComponentView
      title="Queue"
      description="Trace-based queue pattern for grouped pending and completed agent work."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
