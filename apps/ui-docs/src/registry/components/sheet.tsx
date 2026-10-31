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
              <Button variant="outline" className="gap-2">
                <Sliders className="size-4" />
                <span>Open Right Sheet</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle>Telemetry Configuration</SheetTitle>
                <SheetDescription>
                  Live slide-over inspection panel for worker health.
                </SheetDescription>
              </SheetHeader>
              <div className="py-6 space-y-3 text-xs text-muted-foreground">
                <p>Configure log sinks, trace rates, and alert thresholds.</p>
                <div className="p-3 bg-muted/40 rounded-lg border border-border">
                  <span className="font-semibold text-foreground">Sinks:</span>{" "}
                  OTLP / gRPC
                </div>
              </div>
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
              <Button variant="secondary" className="gap-2">
                <Menu className="size-4" />
                <span>Open Left Navigation Sheet</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <SheetHeader>
                <SheetTitle>Navigation Drawer</SheetTitle>
                <SheetDescription>
                  Workspace directories and repositories.
                </SheetDescription>
              </SheetHeader>
              <div className="py-4 space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-muted/50 font-medium">
                  Agents Registry
                </div>
                <div className="p-2.5 rounded-lg hover:bg-muted/30 cursor-pointer">
                  Data Pipelines
                </div>
                <div className="p-2.5 rounded-lg hover:bg-muted/30 cursor-pointer">
                  Security Policies
                </div>
              </div>
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
              <Button variant="outline" className="gap-2">
                <PanelBottom className="size-4" />
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
              <div className="p-4 space-y-2 text-xs text-muted-foreground text-center">
                <p>Mobile-optimized gesture sheet powered by Vaul.</p>
              </div>
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
