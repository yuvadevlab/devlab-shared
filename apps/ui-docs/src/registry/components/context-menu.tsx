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
  Flex,
} from "@yuva-devlab/ui";
import { ComponentView, ComponentVariant } from "@/components/component-view";

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
        <Flex align="center" justify="center">
          <ContextMenu>
            <ContextMenuTrigger className="dl-demo-context-zone">
              Right-click inside this workspace
            </ContextMenuTrigger>
            <ContextMenuContent>
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
        </Flex>
      ),
      codeSnippet: `<ContextMenu>
  <ContextMenuTrigger className="dl-demo-context-zone">
    Right-click inside this workspace
  </ContextMenuTrigger>
  <ContextMenuContent>
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
        <Flex align="center" justify="center">
          <ContextMenu>
            <ContextMenuTrigger className="dl-demo-context-zone dl-demo-context-zone--card">
              Right-click code snippet area
            </ContextMenuTrigger>
            <ContextMenuContent>
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
        </Flex>
      ),
      codeSnippet: `<ContextMenu>
  <ContextMenuTrigger className="dl-demo-context-zone dl-demo-context-zone--card">
    Right-click code snippet area
  </ContextMenuTrigger>
  <ContextMenuContent>
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
