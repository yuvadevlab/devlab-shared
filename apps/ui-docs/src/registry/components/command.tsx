"use client";

import React from "react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "@yuva-devlab/ui";
import {
  Calculator,
  Calendar,
  Smile,
  User,
  Settings,
  Terminal,
  Zap,
} from "lucide-react";
import { ComponentView, ComponentVariant } from "@/components/component-view";

/**
 * Documentation page for Command component showcasing searchable action palettes.
 */
export default function CommandDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "palette",
      title: "Interactive Command Palette",
      description:
        "Fast fuzzy-searchable dialog for quick access to actions and resources.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md dl-demo-box">
          <Command>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>
                  <Calendar className="dl-demo-icon dl-demo-icon--sm" />
                  <span>Calendar Event</span>
                </CommandItem>
                <CommandItem>
                  <Smile className="dl-demo-icon dl-demo-icon--sm" />
                  <span>Search Emoji</span>
                </CommandItem>
                <CommandItem>
                  <Calculator className="dl-demo-icon dl-demo-icon--sm" />
                  <span>Calculator</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Settings">
                <CommandItem>
                  <User className="dl-demo-icon dl-demo-icon--sm" />
                  <span>Profile</span>
                  <CommandShortcut>⌘P</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Settings className="dl-demo-icon dl-demo-icon--sm" />
                  <span>Settings</span>
                  <CommandShortcut>⌘S</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      ),
      codeSnippet: `<Command>
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>
        <Calendar />
        <span>Calendar Event</span>
      </CommandItem>
    </CommandGroup>
    <CommandGroup heading="Settings">
      <CommandItem>
        <Settings />
        <span>Settings</span>
        <CommandShortcut>⌘S</CommandShortcut>
      </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`,
    },
    {
      id: "developer",
      title: "Developer Tools Palette",
      description:
        "Specialized developer actions with instant keyboard execution.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md dl-demo-box">
          <Command>
            <CommandInput placeholder="Search developer tools..." />
            <CommandList>
              <CommandEmpty>No matching tool.</CommandEmpty>
              <CommandGroup heading="Agent Tools">
                <CommandItem>
                  <Terminal className="dl-demo-icon dl-demo-icon--sm" />
                  <span>Spawn Subagent Sandbox</span>
                  <CommandShortcut>⌘K</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Zap className="dl-demo-icon dl-demo-icon--sm" />
                  <span>Flush Vector Cache</span>
                  <CommandShortcut>⌘⇧F</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      ),
      codeSnippet: `<Command>
  <CommandInput placeholder="Search developer tools..." />
  <CommandList>
    <CommandGroup heading="Agent Tools">
      <CommandItem>
        <Terminal />
        <span>Spawn Subagent</span>
        <CommandShortcut>⌘K</CommandShortcut>
      </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`,
    },
  ];

  const propsList = [
    {
      name: "CommandInput",
      type: "React.Component",
      default: "—",
      description: "Search input box with icon and live filtering engine.",
    },
    {
      name: "CommandList",
      type: "React.Component",
      default: "—",
      description: "Scrollable viewport rendering filtered option items.",
    },
    {
      name: "CommandItem",
      type: "React.Component",
      default: "—",
      description: "Selectable row with keyboard navigation and click events.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-command",
      description: "Root command palette wrapper.",
    },
    {
      name: ".dl-command-input",
      description: "Search input styled without outer borders.",
    },
  ];

  return (
    <ComponentView
      title="Command"
      description="Fast, composable, unstyled command menu for React, inspired by modern command palettes and Ant Design's AutoComplete / Global Search."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
