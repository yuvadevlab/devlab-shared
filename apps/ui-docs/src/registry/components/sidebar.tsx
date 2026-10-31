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
        <div className="w-full max-w-md h-72 border border-border rounded-xl overflow-hidden bg-card shadow-xs flex">
          <div className="w-48 border-r border-border bg-muted/20 flex flex-col p-2 space-y-4">
            <div className="flex items-center gap-2 px-2 py-1 font-bold text-xs">
              <Cpu className="size-4 text-primary" />
              <span>DevLab Studio</span>
            </div>

            <div className="space-y-1">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-2">
                Navigation
              </div>
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`flex items-center gap-2 w-full px-2 py-1.5 rounded-md text-xs font-medium transition ${
                  activeTab === "dashboard"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Home className="size-3.5" />
                <span>Dashboard</span>
              </button>
              <button
                onClick={() => setActiveTab("deployments")}
                className={`flex items-center gap-2 w-full px-2 py-1.5 rounded-md text-xs font-medium transition ${
                  activeTab === "deployments"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Layers className="size-3.5" />
                <span>Deployments</span>
              </button>
              <button
                onClick={() => setActiveTab("resilience")}
                className={`flex items-center gap-2 w-full px-2 py-1.5 rounded-md text-xs font-medium transition ${
                  activeTab === "resilience"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <ShieldAlert className="size-3.5" />
                <span>Resilience</span>
              </button>
            </div>
          </div>

          <div className="flex-1 p-4 flex flex-col items-center justify-center text-center text-xs text-muted-foreground">
            <p className="font-medium text-foreground capitalize">
              Active: {activeTab}
            </p>
            <p className="text-[11px] mt-1">
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
        <div className="w-full max-w-md h-64 border border-border rounded-xl overflow-hidden bg-card shadow-xs flex">
          <div className="w-14 border-r border-border bg-muted/20 flex flex-col items-center py-3 gap-3">
            <Cpu className="size-5 text-primary mb-2" />
            <button className="p-2 rounded-lg bg-primary text-primary-foreground">
              <Home className="size-4" />
            </button>
            <button className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground">
              <Database className="size-4" />
            </button>
            <button className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground">
              <BarChart className="size-4" />
            </button>
            <button className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground mt-auto">
              <Settings className="size-4" />
            </button>
          </div>
          <div className="flex-1 p-4 flex items-center justify-center text-xs text-muted-foreground">
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
