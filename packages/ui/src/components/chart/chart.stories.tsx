import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "./chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", agents: 186, tokens: 80 },
  { month: "Feb", agents: 305, tokens: 200 },
  { month: "Mar", agents: 237, tokens: 120 },
  { month: "Apr", agents: 73, tokens: 190 },
  { month: "May", agents: 209, tokens: 130 },
  { month: "Jun", agents: 214, tokens: 140 },
];

const chartConfig = {
  agents: {
    label: "Active Agents",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

const meta: Meta<typeof ChartContainer> = {
  title: "Components/Chart",
  component: ChartContainer,
};

export default meta;
type Story = StoryObj<typeof ChartContainer>;

export const Default: Story = {
  render: () => (
    <div className="dl-story-w-lg dl-card dl-p-4">
      <ChartContainer config={chartConfig} className="dl-story-w-lg">
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={data}>
            <XAxis dataKey="month" stroke="var(--muted-foreground)" />
            <YAxis stroke="var(--muted-foreground)" />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="agents" fill="var(--primary)" radius={4} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  ),
};
