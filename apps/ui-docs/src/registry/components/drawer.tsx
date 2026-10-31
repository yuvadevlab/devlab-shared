"use client";

import React, { useState } from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  Button,
  Flex,
  Stack,
} from "@yuva-devlab/ui";
import { ComponentView, ComponentVariant } from "@/components/component-view";

/**
 * Documentation page for Drawer component showcasing bottom sheet overlays.
 */
export default function DrawerDocPage() {
  const [openBottom, setOpenBottom] = useState(false);
  const [openConfig, setOpenConfig] = useState(false);

  const variants: ComponentVariant[] = [
    {
      id: "bottom",
      title: "Mobile Bottom Sheet",
      description:
        "Swipeable bottom panel displaying system metrics or extended mobile details.",
      preview: (
        <Flex align="center" justify="center">
          <Drawer open={openBottom} onOpenChange={setOpenBottom}>
            <DrawerTrigger asChild>
              <Button variant="outline">Open Execution Profile</Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="dl-demo-frame dl-demo-frame--sm">
                <DrawerHeader>
                  <DrawerTitle>Agent Execution Profile</DrawerTitle>
                  <DrawerDescription>
                    Swipe down or tap dismiss to close this bottom sheet.
                  </DrawerDescription>
                </DrawerHeader>
                <Stack
                  gap={2}
                  className="dl-demo-desc dl-demo-box--collapsible-header"
                >
                  <Flex justify="between">
                    <span>Concurrency</span>
                    <span className="dl-demo-code">32 Tasks</span>
                  </Flex>
                  <Flex justify="between">
                    <span>Vector Memory</span>
                    <span className="dl-demo-code">1.2 GB</span>
                  </Flex>
                  <Flex justify="between">
                    <span>Uptime</span>
                    <span className="dl-demo-code">99.98%</span>
                  </Flex>
                </Stack>
                <DrawerFooter>
                  <Button onClick={() => setOpenBottom(false)}>
                    Apply Changes
                  </Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Dismiss</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </Flex>
      ),
      codeSnippet: `<Drawer open={open} onOpenChange={setOpen}>
  <DrawerTrigger asChild>
    <Button variant="outline">Open Profile</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Agent Execution Profile</DrawerTitle>
    </DrawerHeader>
    <DrawerFooter>
      <Button onClick={() => setOpen(false)}>Apply</Button>
      <DrawerClose asChild><Button variant="outline">Dismiss</Button></DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`,
    },
    {
      id: "config",
      title: "Quick Action Drawer",
      description:
        "Action confirmation panel presented from the screen edge on smaller form factors.",
      preview: (
        <Flex align="center" justify="center">
          <Drawer open={openConfig} onOpenChange={setOpenConfig}>
            <DrawerTrigger asChild>
              <Button variant="default">Quick Sandbox Restart</Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="dl-demo-frame dl-demo-frame--sm">
                <DrawerHeader>
                  <DrawerTitle>Restart Agent Worker</DrawerTitle>
                  <DrawerDescription>
                    Confirm restarting the worker runtime environment.
                  </DrawerDescription>
                </DrawerHeader>
                <div className="dl-demo-desc dl-demo-box--collapsible-header">
                  Active in-memory cache will be re-warmed within 450ms.
                </div>
                <DrawerFooter>
                  <Button
                    variant="destructive"
                    onClick={() => setOpenConfig(false)}
                  >
                    Confirm Restart
                  </Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </Flex>
      ),
      codeSnippet: `<Drawer open={open} onOpenChange={setOpen}>
  <DrawerTrigger asChild>
    <Button>Quick Restart</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Restart Agent Worker</DrawerTitle>
    </DrawerHeader>
    <DrawerFooter>
      <Button variant="destructive">Confirm Restart</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`,
    },
  ];

  const propsList = [
    {
      name: "DrawerContent",
      type: "React.Component",
      default: "—",
      description: "Sliding container pinned to viewport edge.",
    },
    {
      name: "DrawerHeader",
      type: "React.Component",
      default: "—",
      description: "Header section with title and description elements.",
    },
    {
      name: "DrawerFooter",
      type: "React.Component",
      default: "—",
      description: "Action buttons section pinned to the bottom of the drawer.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-drawer-content",
      description: "Sheet surface sliding in from bottom viewport edge.",
    },
  ];

  return (
    <ComponentView
      title="Drawer"
      description="A bottom sheet overlay for mobile and desktop screens, inspired by Ant Design's Drawer component."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
