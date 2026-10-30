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
} from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
} from "../../../components/component-view";

export default function TabsDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "segmented",
      title: "Segmented Full-Width Tabs",
      description:
        "AntD-inspired segmented tab bar expanding across the full container width.",
      preview: (
        <div className="w-full max-w-md">
          <Tabs defaultValue="overview">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="deployments">Deployments</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Agent Overview</CardTitle>
                  <CardDescription className="text-xs">
                    Real-time active clusters and execution metrics.
                  </CardDescription>
                </CardHeader>
              </Card>
            </TabsContent>
            <TabsContent value="deployments">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Recent Deployments</CardTitle>
                  <CardDescription className="text-xs">
                    3 releases successfully committed to staging.
                  </CardDescription>
                </CardHeader>
              </Card>
            </TabsContent>
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Security Policy</CardTitle>
                  <CardDescription className="text-xs">
                    Authentication keys and policy permissions.
                  </CardDescription>
                </CardHeader>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      ),
      codeSnippet: `<Tabs defaultValue="overview">
  <TabsList className="grid grid-cols-3 w-full">
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
        <div className="w-full max-w-md">
          <Tabs defaultValue="inbox">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="inbox" className="gap-2">
                <span>Inbox</span>
                <Badge variant="secondary" className="px-1.5 py-0 text-[10px]">
                  12
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="alerts" className="gap-2">
                <span>Alerts</span>
                <Badge
                  variant="destructive"
                  className="px-1.5 py-0 text-[10px]"
                >
                  3
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="archive">Archive</TabsTrigger>
            </TabsList>
            <TabsContent value="inbox">
              <div className="p-4 bg-muted/30 border border-border rounded-lg text-xs text-muted-foreground text-center">
                12 active task messages pending review.
              </div>
            </TabsContent>
            <TabsContent value="alerts">
              <div className="p-4 bg-muted/30 border border-border rounded-lg text-xs text-muted-foreground text-center">
                3 critical latency alerts triggered.
              </div>
            </TabsContent>
          </Tabs>
        </div>
      ),
      codeSnippet: `<Tabs defaultValue="inbox">
  <TabsList>
    <TabsTrigger value="inbox" className="gap-2">
      <span>Inbox</span>
      <Badge variant="secondary">12</Badge>
    </TabsTrigger>
    <TabsTrigger value="alerts" className="gap-2">
      <span>Alerts</span>
      <Badge variant="destructive">3</Badge>
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
