import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ArrowRight } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./card";
import { Button } from "@/components/button/button";
import { Badge } from "@/components/badge/badge";
import { Flex } from "@/components/layout/flex";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <div className="dl-story-w-md">
      <Card>
        <CardHeader>
          <Flex justify="between" align="center">
            <CardTitle>Autonomous Agent Run</CardTitle>
            <Badge variant="success">Completed</Badge>
          </Flex>
          <CardDescription>Execution ID: #exec-98234-alpha</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Processed 1,420 tokens across 4 tool steps. All unit tests passed
            without regression.
          </p>
        </CardContent>
        <CardFooter className="dl-flex--between">
          <Button variant="ghost" size="sm">
            Dismiss
          </Button>
          <Button size="sm">
            <span>View Traces</span>
            <ArrowRight size={14} />
          </Button>
        </CardFooter>
      </Card>
    </div>
  ),
};

export const MetricsCard: Story = {
  render: () => (
    <div className="dl-story-row">
      <div className="dl-story-w-xs">
        <Card>
          <CardHeader>
            <CardDescription>Total API Invocations</CardDescription>
            <CardTitle>2.4M</CardTitle>
          </CardHeader>
          <CardContent>
            <span>+18.2% from last month</span>
          </CardContent>
        </Card>
      </div>

      <div className="dl-story-w-xs">
        <Card>
          <CardHeader>
            <CardDescription>P95 Latency</CardDescription>
            <CardTitle>142 ms</CardTitle>
          </CardHeader>
          <CardContent>
            <span>-34ms improvement</span>
          </CardContent>
        </Card>
      </div>
    </div>
  ),
};
