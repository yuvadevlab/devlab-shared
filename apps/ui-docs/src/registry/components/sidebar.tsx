"use client";

import React, { useState } from "react";
import {
  Home,
  Layers,
  Settings,
  ShieldAlert,
  Cpu,
  Database,
  BarChart,
} from "lucide-react";
import { Flex, Stack, cn } from "@yuva-devlab/ui";
import { ComponentView, ComponentVariant } from "@/components/component-view";

/**
 * Documentation page for Sidebar component showcasing expanded and compact navigation layouts.
 */
export default function SidebarDocPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const variants: ComponentVariant[] = [
    {
      id: "full",
      title: "Dashboard Navigation Sidebar",
      description:
        "Full-featured app sidebar with brand branding, categorized links, and active state highlights.",
      preview: (
        <div className="dl-demo-sidebar-shell">
          <div className="dl-demo-sidebar-panel">
            <Flex align="center" gap={2}>
              <Cpu className="dl-demo-icon dl-demo-icon--sm" />
              <span className="dl-demo-heading">DevLab Studio</span>
            </Flex>

            <Stack gap={1}>
              <span className="dl-demo-label">Navigation</span>
              <button
                type="button"
                onClick={() => setActiveTab("dashboard")}
                className={cn(
                  "dl-demo-sidebar-btn",
                  activeTab === "dashboard" && "dl-demo-sidebar-btn--active",
                )}
              >
                <Home className="dl-demo-icon dl-demo-icon--xs" />
                <span>Dashboard</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("deployments")}
                className={cn(
                  "dl-demo-sidebar-btn",
                  activeTab === "deployments" && "dl-demo-sidebar-btn--active",
                )}
              >
                <Layers className="dl-demo-icon dl-demo-icon--xs" />
                <span>Deployments</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("resilience")}
                className={cn(
                  "dl-demo-sidebar-btn",
                  activeTab === "resilience" && "dl-demo-sidebar-btn--active",
                )}
              >
                <ShieldAlert className="dl-demo-icon dl-demo-icon--xs" />
                <span>Resilience</span>
              </button>
            </Stack>
          </div>

          <div className="dl-demo-sidebar-content">
            <p className="dl-demo-heading">Active: {activeTab}</p>
            <p className="dl-demo-caption">
              Main content rendered inside SidebarInset.
            </p>
          </div>
        </div>
      ),
      codeSnippet: `<SidebarProvider>
  <Sidebar>
    <SidebarHeader>DevLab Studio</SidebarHeader>
    <SidebarContent>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton isActive>Dashboard</SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>Deployments</SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarContent>
  </Sidebar>
  <SidebarInset>Main content</SidebarInset>
</SidebarProvider>`,
    },
    {
      id: "compact",
      title: "Compact Icon Rail",
      description:
        "Space-saving icon sidebar navigation ideal for dense developer interfaces.",
      preview: (
        <div className="dl-demo-sidebar-shell dl-demo-sidebar-shell--compact">
          <div className="dl-demo-sidebar-rail">
            <Cpu className="dl-demo-icon dl-demo-icon--md" />
            <button
              type="button"
              className="dl-demo-sidebar-btn--icon dl-demo-sidebar-btn--icon-active"
            >
              <Home className="dl-demo-icon dl-demo-icon--sm" />
            </button>
            <button type="button" className="dl-demo-sidebar-btn--icon">
              <Database className="dl-demo-icon dl-demo-icon--sm" />
            </button>
            <button type="button" className="dl-demo-sidebar-btn--icon">
              <BarChart className="dl-demo-icon dl-demo-icon--sm" />
            </button>
            <button type="button" className="dl-demo-sidebar-btn--icon">
              <Settings className="dl-demo-icon dl-demo-icon--sm" />
            </button>
          </div>
          <div className="dl-demo-sidebar-content">
            Compact icon rail layout
          </div>
        </div>
      ),
      codeSnippet: `<Sidebar collapsible="icon">
  <SidebarContent>
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton tooltip="Home"><Home /></SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton tooltip="Database"><Database /></SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarContent>
</Sidebar>`,
    },
  ];

  const propsList = [
    {
      name: "SidebarProvider",
      type: "React.Component",
      default: "—",
      description: "Context provider maintaining open/collapsed rail state.",
    },
    {
      name: "Sidebar",
      type: "React.Component",
      default: "—",
      description: "Collapsible vertical sidebar drawer container.",
    },
    {
      name: "SidebarInset",
      type: "React.Component",
      default: "—",
      description:
        "Main viewport sibling adapting to sidebar expansions and collapses.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-sidebar",
      description: "Vertical navigation bar wrapper.",
    },
    {
      name: ".dl-sidebar-content",
      description: "Scrollable internal menu listing container.",
    },
  ];

  return (
    <ComponentView
      title="Sidebar"
      description="A composable, collapsible navigation sidebar component designed for complex web applications, inspired by Ant Design's Layout.Sider."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
