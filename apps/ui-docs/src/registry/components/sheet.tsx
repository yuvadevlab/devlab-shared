"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  Button,
  Stack,
  Box,
} from "@yuva-devlab/ui";
import { Sliders, Menu, PanelBottom } from "lucide-react";
import {
  ComponentView,
  type ComponentVariant,
} from "@/components/component-view";

export default function SheetDocPage() {
  const [rightOpen, setRightOpen] = useState(false);
  const [leftOpen, setLeftOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const variants: ComponentVariant[] = [
    {
      id: "right",
      title: "Right Slide-over Sheet",
      description:
        "AntD-inspired drawer emerging smoothly from the right edge for secondary forms and detail panels.",
      preview: (
        <div>
          <Sheet open={rightOpen} onOpenChange={setRightOpen}>
            <SheetTrigger asChild>
              <Button variant="outline">
                <Sliders className="dl-demo-icon" />
                <span>Open Right Sheet</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Telemetry Configuration</SheetTitle>
                <SheetDescription>
                  Live slide-over inspection panel for worker health.
                </SheetDescription>
              </SheetHeader>
              <Stack gap={3} className="dl-demo-frame dl-demo-desc">
                <p>Configure log sinks, trace rates, and alert thresholds.</p>
                <Box className="dl-demo-box dl-demo-box--sm">
                  <span className="dl-demo-heading">Sinks:</span> OTLP / gRPC
                </Box>
              </Stack>
            </SheetContent>
          </Sheet>
        </div>
      ),
      codeSnippet: `<Sheet>
  <SheetTrigger asChild><Button>Open Right Sheet</Button></SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Settings</SheetTitle>
      <SheetDescription>Inspect details.</SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>`,
    },
    {
      id: "left",
      title: "Left Placement Navigation Sheet",
      description:
        "Slide-over menu emerging from the left boundary, ideal for mobile side navigation drawers.",
      preview: (
        <div>
          <Sheet open={leftOpen} onOpenChange={setLeftOpen}>
            <SheetTrigger asChild>
              <Button variant="secondary">
                <Menu className="dl-demo-icon" />
                <span>Open Left Navigation Sheet</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Navigation Drawer</SheetTitle>
                <SheetDescription>
                  Workspace directories and repositories.
                </SheetDescription>
              </SheetHeader>
              <Stack gap={2} className="dl-demo-frame dl-demo-desc">
                <Box className="dl-demo-box dl-demo-box--sm dl-demo-heading">
                  Agents Registry
                </Box>
                <Box className="dl-demo-box dl-demo-box--sm">
                  Data Pipelines
                </Box>
                <Box className="dl-demo-box dl-demo-box--sm">
                  Security Policies
                </Box>
              </Stack>
            </SheetContent>
          </Sheet>
        </div>
      ),
      codeSnippet: `<Sheet>
  <SheetTrigger asChild><Button>Open Left Sheet</Button></SheetTrigger>
  <SheetContent side="left">
    <SheetHeader>
      <SheetTitle>Navigation</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>`,
    },
    {
      id: "drawer",
      title: "Bottom Draggable Drawer (Mobile)",
      description:
        "Bottom sheet with draggable touch handle built on Vaul for smooth gesture dismissal.",
      preview: (
        <div>
          <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
            <DrawerTrigger asChild>
              <Button variant="outline">
                <PanelBottom className="dl-demo-icon" />
                <span>Open Bottom Drawer</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Action Menu</DrawerTitle>
                <DrawerDescription>
                  Drag down handle or tap cancel to dismiss.
                </DrawerDescription>
              </DrawerHeader>
              <Box className="dl-demo-box dl-demo-box--sm dl-demo-desc dl-demo-text-center">
                <p>Mobile-optimized gesture sheet powered by Vaul.</p>
              </Box>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Close Drawer</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      ),
      codeSnippet: `import { Drawer, DrawerTrigger, DrawerContent } from "@yuva-devlab/ui";

<Drawer>
  <DrawerTrigger asChild><Button>Open Drawer</Button></DrawerTrigger>
  <DrawerContent>
    <DrawerHeader><DrawerTitle>Actions</DrawerTitle></DrawerHeader>
    <DrawerFooter><DrawerClose asChild><Button>Close</Button></DrawerClose></DrawerFooter>
  </DrawerContent>
</Drawer>`,
    },
  ];

  const propsList = [
    {
      name: "side",
      type: '"top" | "bottom" | "left" | "right"',
      default: '"right"',
      description: "Screen boundary from which the sheet slides out.",
    },
    {
      name: "SheetTrigger",
      type: "React.Component",
      default: "—",
      description: "Trigger element opening the slide-over.",
    },
    {
      name: "SheetContent",
      type: "React.Component",
      default: "—",
      description: "Full-height off-canvas panel container.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-sheet-content",
      description: "Sliding container fixed to screen edge.",
    },
    {
      name: ".dl-sheet-content--right",
      description: "Slides in smoothly from the right viewport boundary.",
    },
    {
      name: ".dl-sheet-content--left",
      description: "Slides in smoothly from the left viewport boundary.",
    },
  ];

  return (
    <ComponentView
      title="Sheet & Drawer"
      description="Off-canvas sliding panels emerging from screen boundaries for forms, filters, and detailed inspect panes. Showcasing right sheets, left navigation drawers, and bottom draggable sheets (Drawer)."
      category="Feedback"
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
