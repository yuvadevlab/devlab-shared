"use client";

import React from "react";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarShortcut,
} from "@yuva-devlab/ui";
import { ComponentView, ComponentVariant } from "@/components/component-view";

/**
 * Documentation page for Menubar component showcasing desktop-style horizontal menus.
 */
export default function MenubarDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "desktop",
      title: "Application Menubar",
      description:
        "Desktop-style horizontal menu bar with nested items and keyboard accelerators.",
      preview: (
        <div className="flex items-center justify-center p-2">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  New Window <MenubarShortcut>⌘N</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Share Workspace</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  Print... <MenubarShortcut>⌘P</MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>Edit</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  Cut <MenubarShortcut>⌘X</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  Copy <MenubarShortcut>⌘C</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  Paste <MenubarShortcut>⌘V</MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>View</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  Reload Agent <MenubarShortcut>⌘R</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>Toggle Fullscreen</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Hide Sidebar</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      ),
      codeSnippet: `<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        New Tab <MenubarShortcut>⌘T</MenubarShortcut>
      </MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Share Workspace</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger>Edit</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>Undo <MenubarShortcut>⌘Z</MenubarShortcut></MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`,
    },
    {
      id: "tools",
      title: "Compact Tools Menubar",
      description:
        "Simplified top-level bar tailored for specialized IDE panels or prompt testing consoles.",
      preview: (
        <div className="flex items-center justify-center p-2">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>Model</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Gemini 1.5 Pro</MenubarItem>
                <MenubarItem>Gemini 1.5 Flash</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Custom Endpoint...</MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>Tools</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Run Benchmark</MenubarItem>
                <MenubarItem>Vector Search Debugger</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Flush Cache</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      ),
      codeSnippet: `<Menubar>
  <MenubarMenu>
    <MenubarTrigger>Model</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>Gemini 1.5 Pro</MenubarItem>
      <MenubarItem>Gemini 1.5 Flash</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger>Tools</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>Run Benchmark</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`,
    },
  ];

  const propsList = [
    {
      name: "Menubar",
      type: "React.Component",
      default: "—",
      description: "Root horizontal container managing active submenus.",
    },
    {
      name: "MenubarTrigger",
      type: "React.Component",
      default: "—",
      description: "Click/hover target that expands a top-level category.",
    },
    {
      name: "MenubarContent",
      type: "React.Component",
      default: "—",
      description: "Dropdown panel listing category items and shortcuts.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-menubar",
      description: "Horizontal container bar holding menu triggers.",
    },
    {
      name: ".dl-menubar-content",
      description: "Floating popup containing menu items.",
    },
  ];

  return (
    <ComponentView
      title="Menubar"
      description="A visually persistent horizontal menu bar commonly used in desktop applications, inspired by macOS and Windows menu bars."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
