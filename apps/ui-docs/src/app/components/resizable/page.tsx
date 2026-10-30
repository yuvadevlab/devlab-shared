"use client";

import React from "react";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@yuva-devlab/ui";
import {
  ComponentView,
  ComponentVariant,
} from "../../../components/component-view";

/**
 * Documentation page for Resizable component showcasing horizontal and vertical split panels.
 */
export default function ResizableDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "horizontal",
      title: "Horizontal Split Panels",
      description:
        "Side-by-side adjustable panels with drag handles for custom sidebar widths.",
      preview: (
        <div className="w-full max-w-sm h-40 border border-border rounded-xl overflow-hidden shadow-xs">
          <ResizablePanelGroup orientation="horizontal">
            <ResizablePanel defaultSize={35} minSize={20}>
              <div className="flex h-full items-center justify-center p-3 bg-muted/20">
                <span className="text-xs font-semibold text-muted-foreground">
                  Sidebar (35%)
                </span>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={65}>
              <div className="flex h-full items-center justify-center p-3 bg-background">
                <span className="text-xs font-semibold text-foreground">
                  Content (65%)
                </span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      ),
      codeSnippet: `<ResizablePanelGroup orientation="horizontal">
  <ResizablePanel defaultSize={35} minSize={20}>
    <div>Sidebar</div>
  </ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={65}>
    <div>Content</div>
  </ResizablePanel>
</ResizablePanelGroup>`,
    },
    {
      id: "vertical",
      title: "Vertical Split Panels",
      description:
        "Stacked panels allowing users to adjust output terminal or log console heights.",
      preview: (
        <div className="w-full max-w-sm h-48 border border-border rounded-xl overflow-hidden shadow-xs">
          <ResizablePanelGroup orientation="vertical">
            <ResizablePanel defaultSize={60} minSize={30}>
              <div className="flex h-full items-center justify-center p-3 bg-background">
                <span className="text-xs font-semibold text-foreground">
                  Code Editor (60%)
                </span>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={40}>
              <div className="flex h-full items-center justify-center p-3 bg-muted/30">
                <span className="text-xs font-semibold text-muted-foreground">
                  Terminal Logs (40%)
                </span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      ),
      codeSnippet: `<ResizablePanelGroup orientation="vertical">
  <ResizablePanel defaultSize={60} minSize={30}>
    <div>Editor</div>
  </ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={40}>
    <div>Terminal</div>
  </ResizablePanel>
</ResizablePanelGroup>`,
    },
  ];

  const propsList = [
    {
      name: "orientation",
      type: '"horizontal" | "vertical"',
      default: '"horizontal"',
      description: "Direction axis along which child panels resize.",
    },
    {
      name: "defaultSize",
      type: "number",
      default: "undefined",
      description:
        "Initial proportional size of the panel as a percentage (0-100).",
    },
    {
      name: "withHandle",
      type: "boolean",
      default: "false",
      description: "Renders a visual gripper dots handle on the separator bar.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-resizable-handle",
      description: "Draggable divider line between resizable panels.",
    },
  ];

  return (
    <ComponentView
      title="Resizable"
      description="Accessible resizable panel groups and layout splitters, inspired by Ant Design's Splitter."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
