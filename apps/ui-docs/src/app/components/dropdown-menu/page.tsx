"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuCheckboxItem,
  Button,
} from "@yuva-devlab/ui";
import {
  ComponentView,
  ComponentVariant,
} from "../../../components/component-view";

/**
 * Documentation page for DropdownMenu component showcasing basic, checkable, and action variants.
 */
export default function DropdownMenuDocPage() {
  const [showStatus, setShowStatus] = useState(true);
  const [showActivity, setShowActivity] = useState(false);

  const variants: ComponentVariant[] = [
    {
      id: "basic",
      title: "Basic Menu with Shortcuts",
      description:
        "Standard dropdown menu with grouped options and keyboard accelerator hints.",
      preview: (
        <div className="flex items-center justify-center p-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Options Menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Workspace Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>New Agent Process</span>
                <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Run Pipeline</span>
                <DropdownMenuShortcut>⌘R</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>Settings</span>
                <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
      codeSnippet: `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Options Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuLabel>Workspace Actions</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <span>New Agent Process</span>
      <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem>
      <span>Run Pipeline</span>
      <DropdownMenuShortcut>⌘R</DropdownMenuShortcut>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
    },
    {
      id: "checkbox",
      title: "Checkbox & Toggle Items",
      description:
        "Supports persistent state checkboxes for controlling view modes or filter toggles.",
      preview: (
        <div className="flex items-center justify-center p-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">View Settings</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Display Layers</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={showStatus}
                onCheckedChange={setShowStatus}
              >
                Show Status Bar
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showActivity}
                onCheckedChange={setShowActivity}
              >
                Stream Activity Logs
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
      codeSnippet: `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">View Settings</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuCheckboxItem
      checked={showStatus}
      onCheckedChange={setShowStatus}
    >
      Show Status Bar
    </DropdownMenuCheckboxItem>
  </DropdownMenuContent>
</DropdownMenu>`,
    },
    {
      id: "danger",
      title: "Action & Danger Items",
      description:
        "Contextual operations highlighting critical destructive actions in warning color.",
      preview: (
        <div className="flex items-center justify-center p-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">Manage Cluster ▾</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem>Restart Nodes</DropdownMenuItem>
              <DropdownMenuItem>Export Metrics</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <span>Terminate Cluster</span>
                <DropdownMenuShortcut>⇧⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
      codeSnippet: `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost">Manage Cluster ▾</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuItem>Restart Nodes</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="text-destructive">
      Terminate Cluster
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
    },
  ];

  const propsList = [
    {
      name: "DropdownMenuTrigger",
      type: "React.Component",
      default: "—",
      description: "Element that toggles the dropdown popover when clicked.",
    },
    {
      name: "DropdownMenuContent",
      type: "React.Component",
      default: "—",
      description:
        "Floating container card containing menu items and separators.",
    },
    {
      name: "DropdownMenuCheckboxItem",
      type: "React.Component",
      default: "—",
      description:
        "An item with a checkmark indicating active or inactive state.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-dropdown-content",
      description: "Floating popover surface styling for the dropdown menu.",
    },
    {
      name: ".dl-dropdown-item",
      description: "Selectable row item with hover and focus highlights.",
    },
  ];

  return (
    <ComponentView
      title="Dropdown Menu"
      description="Displays a menu of actions or options triggered by a button click, inspired by Ant Design's Dropdown."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
