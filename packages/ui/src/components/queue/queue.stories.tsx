import type { Meta, StoryObj } from "@storybook/react";
import { Queue } from "./queue";
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/trace";
import {
  Circle,
  CircleCheck,
  CircleDot,
  ListChecks,
  ListTodo,
} from "lucide-react";

const meta: Meta<typeof Queue> = {
  title: "AI Elements/Queue",
  component: Queue,
};

export default meta;
type Story = StoryObj<typeof Queue>;

export const Default: Story = {
  render: () => {
    return (
      <div className="dl-story-w-lg">
        <Queue aria-label="Theme update tasks">
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
    );
  },
};
