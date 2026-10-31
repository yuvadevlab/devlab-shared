import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/card/card";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="overview" style={{ width: "420px" }}>
      <TabsList
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          width: "100%",
        }}
      >
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <Card>
          <CardHeader>
            <CardTitle>Agent Fleet Overview</CardTitle>
            <CardDescription>
              Real-time orchestrator cluster metrics.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p style={{ margin: 0, fontSize: "13px" }}>
              12 agents currently active across 3 clusters.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="analytics">
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Latency and throughput analytics.</CardDescription>
          </CardHeader>
          <CardContent>
            <p style={{ margin: 0, fontSize: "13px" }}>
              Average run duration: 1,840ms.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="settings">
        <Card>
          <CardHeader>
            <CardTitle>Cluster Configuration</CardTitle>
            <CardDescription>
              Manage security credentials and tokens.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p style={{ margin: 0, fontSize: "13px" }}>
              Autonomous policy: Strict SAIF compliance.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};
