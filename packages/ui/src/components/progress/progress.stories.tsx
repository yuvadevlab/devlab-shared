import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "./progress";
import { Flex } from "@/components/layout/flex";

const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  component: Progress,
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Progress value percentage (0 to 100)",
    },
  },
  args: {
    value: 68,
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  render: (args) => (
    <div className="dl-story-col dl-story-w-sm">
      <Flex justify="between" align="center">
        <span>Agent Synthesis Pipeline</span>
        <span>{args.value}%</span>
      </Flex>
      <Progress {...args} />
    </div>
  ),
};
