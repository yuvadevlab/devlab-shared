import type { Meta, StoryObj } from "@storybook/react";
import { AlertCircle, Info } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "./alert";

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
