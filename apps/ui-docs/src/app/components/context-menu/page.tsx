"use client";

import React, { useState } from "react";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuCheckboxItem,
} from "@yuva-devlab/ui";
import {
  ComponentView,
  ComponentVariant,
} from "../../../components/component-view";

/**
 * Documentation page for ContextMenu component showcasing right-click triggers.
 */
export default function ContextMenuDocPage() {
  const [showTokens, setShowTokens] = useState(true);
  const [wrapLines, setWrapLines] = useState(false);

  const variants: ComponentVariant[] = [
    {
      id: "canvas",
      title: "Workspace Canvas Actions",
      description:
        "Standard contextual menu triggered by right-clicking on a canvas or drawing region.",
      preview: (
        <div className="flex items-center justify-center p-4">
          <ContextMenu>
            <ContextMenuTrigger className="flex h-32 w-72 items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 text-xs text-muted-foreground select-none hover:border-primary/50 transition">
              Right-click inside this workspace
            </ContextMenuTrigger>
            <ContextMenuContent className="w-56">
              <ContextMenuItem>
                <span>Back</span>
                <ContextMenuShortcut>⌘[</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem disabled>
                <span>Forward</span>
                <ContextMenuShortcut>⌘]</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>
                <span>Reload Pipeline</span>
                <ContextMenuShortcut>⌘R</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>
                <span>Inspect Agent State</span>
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </div>
      ),
      codeSnippet: `<ContextMenu>
  <ContextMenuTrigger className="h-32 w-72 border border-dashed rounded-xl flex items-center justify-center">
    Right-click inside this workspace
  </ContextMenuTrigger>
  <ContextMenuContent className="w-56">
    <ContextMenuItem>
      <span>Back</span>
      <ContextMenuShortcut>⌘[</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuItem disabled>
      <span>Forward</span>
      <ContextMenuShortcut>⌘]</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuItem>
      <span>Reload Pipeline</span>
      <ContextMenuShortcut>⌘R</ContextMenuShortcut>
    </ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
    },
    {
      id: "editor",
      title: "Editor Context with Toggles",
      description:
        "Code and document contextual menu featuring shortcuts and persistent toggles.",
      preview: (
        <div className="flex items-center justify-center p-4">
          <ContextMenu>
            <ContextMenuTrigger className="flex h-32 w-72 items-center justify-center rounded-xl border border-border bg-card p-4 text-xs font-mono text-muted-foreground select-none shadow-sm hover:border-primary/50 transition">
              Right-click code snippet area
            </ContextMenuTrigger>
            <ContextMenuContent className="w-56">
              <ContextMenuItem>
                <span>Format Document</span>
                <ContextMenuShortcut>⇧⌥F</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>
                <span>Copy Path</span>
                <ContextMenuShortcut>⌥⌘C</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuCheckboxItem
                checked={showTokens}
                onCheckedChange={setShowTokens}
              >
                Show Token Counters
              </ContextMenuCheckboxItem>
              <ContextMenuCheckboxItem
                checked={wrapLines}
                onCheckedChange={setWrapLines}
              >
                Soft Wrap Lines
              </ContextMenuCheckboxItem>
            </ContextMenuContent>
          </ContextMenu>
        </div>
      ),
      codeSnippet: `<ContextMenu>
  <ContextMenuTrigger className="h-32 w-72 border rounded-xl flex items-center justify-center">
    Right-click code snippet area
  </ContextMenuTrigger>
  <ContextMenuContent className="w-56">
    <ContextMenuItem>
      Format Document <ContextMenuShortcut>⇧⌥F</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuCheckboxItem checked={showTokens} onCheckedChange={setShowTokens}>
      Show Token Counters
    </ContextMenuCheckboxItem>
  </ContextMenuContent>
</ContextMenu>`,
    },
  ];

  const propsList = [
    {
      name: "ContextMenuTrigger",
      type: "React.Component",
      default: "—",
      description:
        "Wraps the target zone that captures pointer secondary click (contextmenu) events.",
    },
    {
      name: "ContextMenuContent",
      type: "React.Component",
      default: "—",
      description:
        "Portal-rendered menu popup positioned at cursor coordinates.",
    },
    {
      name: "ContextMenuShortcut",
      type: "React.Component",
      default: "—",
      description: "Right-aligned visual accelerator key combination tag.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-context-content",
      description: "Floating context menu surface.",
    },
    {
      name: ".dl-context-item",
      description: "Action row inside the context menu.",
    },
  ];

  return (
    <ComponentView
      title="Context Menu"
      description="Displays a menu located at the pointer coordinates upon a right-click or long-press."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
