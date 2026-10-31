import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MetricCard } from "./metric-card";
import { Activity, Zap } from "lucide-react";
import { Flex } from "@/components/layout/flex";

const meta: Meta<typeof MetricCard> = {
  title: "Components/MetricCard",
  component: MetricCard,
};

export default meta;
type Story = StoryObj<typeof MetricCard>;

export const Default: Story = {
  render: () => (
    <Flex gap={4} className="dl-story-w-lg">
      <div className="dl-flex-1">
        <MetricCard
          label="Active Swarms"
          value="48"
          note="+12.4% vs last week"
          positive={true}
          icon={<Activity size={18} />}
        />
      </div>
      <div className="dl-flex-1">
        <MetricCard
          label="Avg Latency"
          value="18ms"
          note="-4ms vs baseline"
          positive={true}
          icon={<Zap size={18} />}
        />
      </div>
    </Flex>
  ),
};
