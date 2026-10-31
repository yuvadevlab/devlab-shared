"use client";

import React from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  Badge,
  Flex,
  Box,
} from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
} from "@/components/component-view";

export default function TabsDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "segmented",
      title: "Segmented Full-Width Tabs",
      description:
        "AntD-inspired segmented tab bar expanding across the full container width.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md">
          <Tabs defaultValue="overview">
            <TabsList className="dl-demo-tabs-grid">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="deployments">Deployments</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle className="dl-demo-title">
                    Agent Overview
                  </CardTitle>
                  <CardDescription className="dl-demo-desc">
                    Real-time active clusters and execution metrics.
                  </CardDescription>
                </CardHeader>
              </Card>
            </TabsContent>
            <TabsContent value="deployments">
              <Card>
                <CardHeader>
                  <CardTitle className="dl-demo-title">
                    Recent Deployments
                  </CardTitle>
                  <CardDescription className="dl-demo-desc">
                    3 releases successfully committed to staging.
                  </CardDescription>
                </CardHeader>
              </Card>
            </TabsContent>
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle className="dl-demo-title">
                    Security Policy
                  </CardTitle>
                  <CardDescription className="dl-demo-desc">
                    Authentication keys and policy permissions.
                  </CardDescription>
                </CardHeader>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      ),
      codeSnippet: `<Tabs defaultValue="overview">
  <TabsList className="dl-demo-tabs-grid">
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="deployments">Deployments</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Content...</TabsContent>
</Tabs>`,
    },
    {
      id: "badges",
      title: "Tabs with Notification Badges",
      description:
        "Tabs enriched with count pills to highlight active unread items or pending approvals.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md">
          <Tabs defaultValue="inbox">
            <TabsList className="dl-demo-tabs-grid">
              <TabsTrigger value="inbox">
                <Flex align="center" gap={2}>
                  <span>Inbox</span>
                  <Badge variant="secondary">12</Badge>
                </Flex>
              </TabsTrigger>
              <TabsTrigger value="alerts">
                <Flex align="center" gap={2}>
                  <span>Alerts</span>
                  <Badge variant="destructive">3</Badge>
                </Flex>
              </TabsTrigger>
              <TabsTrigger value="archive">Archive</TabsTrigger>
            </TabsList>
            <TabsContent value="inbox">
              <Box className="dl-demo-box dl-demo-box--muted dl-demo-desc dl-demo-text-center">
                12 active task messages pending review.
              </Box>
            </TabsContent>
            <TabsContent value="alerts">
              <Box className="dl-demo-box dl-demo-box--muted dl-demo-desc dl-demo-text-center">
                3 critical latency alerts triggered.
              </Box>
            </TabsContent>
          </Tabs>
        </div>
      ),
      codeSnippet: `<Tabs defaultValue="inbox">
  <TabsList className="dl-demo-tabs-grid">
    <TabsTrigger value="inbox">
      <Flex align="center" gap={2}>
        <span>Inbox</span>
        <Badge variant="secondary">12</Badge>
      </Flex>
    </TabsTrigger>
    <TabsTrigger value="alerts">
      <Flex align="center" gap={2}>
        <span>Alerts</span>
        <Badge variant="destructive">3</Badge>
      </Flex>
    </TabsTrigger>
  </TabsList>
</Tabs>`,
    },
  ];

  const propsList = [
    {
      name: "defaultValue",
      type: "string",
      default: "undefined",
      description: "Default active tab value when uncontrolled.",
    },
    {
      name: "value",
      type: "string",
      default: "undefined",
      description: "Controlled active tab value.",
    },
    {
      name: "onValueChange",
      type: "(value: string) => void",
      default: "undefined",
      description: "Callback fired when active tab changes.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-tabs-list",
      description: "Segmented container with background pill and border.",
    },
    {
      name: ".dl-tabs-trigger",
      description: "Tab button with active shadow, elevation, and transition.",
    },
    {
      name: ".dl-tabs-content",
      description: "Content panel rendered when active tab is selected.",
    },
  ];

  return (
    <ComponentView
      title="Tabs"
      description="Segmented view controller organizing related sections into alternate tabbed views. Showcasing full-width segmented tabs and tabs with notification badges."
      category="Navigation"
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
