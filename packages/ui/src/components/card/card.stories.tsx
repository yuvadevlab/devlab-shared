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

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card style={{ width: "380px" }}>
      <CardHeader>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <CardTitle>Autonomous Agent Run</CardTitle>
          <Badge variant="success">Completed</Badge>
        </div>
        <CardDescription>Execution ID: #exec-98234-alpha</CardDescription>
      </CardHeader>
      <CardContent>
        <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.5" }}>
          Processed 1,420 tokens across 4 tool steps. All unit tests passed
          without regression.
        </p>
      </CardContent>
      <CardFooter style={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="ghost" size="sm">
          Dismiss
        </Button>
        <Button size="sm" style={{ display: "inline-flex", gap: "6px" }}>
          <span>View Traces</span>
          <ArrowRight style={{ width: "14px", height: "14px" }} />
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const MetricsCard: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <Card style={{ width: "240px" }}>
        <CardHeader style={{ paddingBottom: "8px" }}>
          <CardDescription>Total API Invocations</CardDescription>
          <CardTitle style={{ fontSize: "24px" }}>2.4M</CardTitle>
        </CardHeader>
        <CardContent>
          <span style={{ fontSize: "12px", color: "var(--success)" }}>
            +18.2% from last month
          </span>
        </CardContent>
      </Card>

      <Card style={{ width: "240px" }}>
        <CardHeader style={{ paddingBottom: "8px" }}>
          <CardDescription>P95 Latency</CardDescription>
          <CardTitle style={{ fontSize: "24px" }}>142 ms</CardTitle>
        </CardHeader>
        <CardContent>
          <span style={{ fontSize: "12px", color: "var(--info)" }}>
            -34ms improvement
          </span>
        </CardContent>
      </Card>
    </div>
  ),
};
