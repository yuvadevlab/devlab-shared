import type { Meta, StoryObj } from "@storybook/react";
import { AlertCircle, Info, RefreshCw } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "./alert";
import { Button } from "@/components/button";
import { Flex } from "@/components/layout/flex";
import { Stack } from "@/components/layout/stack";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive"],
      description: "Visual style variant of the alert",
    },
  },
  args: {
    variant: "default",
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  render: () => (
    <div className="dl-story-w-md">
      <Alert variant="default">
        <Info size={16} />
        <AlertTitle>System Scheduled Maintenance</AlertTitle>
        <AlertDescription>
          Cluster maintenance is scheduled tonight between 02:00 and 03:00 UTC.
          No downtime expected.
        </AlertDescription>
      </Alert>
    </div>
  ),
};

export const Destructive: Story = {
  render: () => (
    <div className="dl-story-w-md">
      <Alert variant="destructive">
        <AlertCircle size={16} />
        <AlertTitle>Agent Execution Failed</AlertTitle>
        <AlertDescription>
          Process terminated abruptly: Execution timeout exceeded (30,000ms
          limit).
        </AlertDescription>
      </Alert>
    </div>
  ),
};

export const WithAction: Story = {
  render: () => (
    <div className="dl-story-w-md">
      <Alert variant="default">
        <Flex align="center" justify="between" className="w-full">
          <Stack gap={1}>
            <Flex align="center" gap={2}>
              <Info className="size-4 shrink-0" />
              <AlertTitle>Configuration is out of date</AlertTitle>
            </Flex>
            <AlertDescription>
              A newer configuration is available for this workspace.
            </AlertDescription>
          </Stack>
          <Button size="sm" variant="outline">
            <RefreshCw className="size-4 shrink-0" />
            <span>Sync</span>
          </Button>
        </Flex>
      </Alert>
    </div>
  ),
};
