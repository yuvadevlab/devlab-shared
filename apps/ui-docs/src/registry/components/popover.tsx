"use client";

import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Input,
  Label,
} from "@yuva-devlab/ui";
import { SlidersHorizontal, Info } from "lucide-react";
import { ComponentView, ComponentVariant } from "@/components/component-view";

/**
 * Documentation page for Popover component showcasing interactive forms and informational flyouts.
 */
export default function PopoverDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "form",
      title: "Settings Form Popover",
      description:
        "Floating panel containing input controls for in-place property editing.",
      preview: (
        <div className="flex items-center justify-center p-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <SlidersHorizontal className="size-4" />
                <span>Telemetry Filters</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="center" className="w-80 p-4 space-y-4">
              <div className="space-y-1">
                <h4 className="font-semibold text-foreground text-sm">
                  Sampling Rates
                </h4>
                <p className="text-xs text-muted-foreground">
                  Configure sampling rates for live trace exports.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="space-y-1">
                  <Label htmlFor="sample-rate">Sample Frequency (ms)</Label>
                  <Input id="sample-rate" defaultValue="250" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="max-traces">Max In-Memory Traces</Label>
                  <Input id="max-traces" defaultValue="10000" />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      ),
      codeSnippet: `<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline"><SlidersHorizontal className="size-4 mr-2" />Filters</Button>
  </PopoverTrigger>
  <PopoverContent className="w-80 p-4 space-y-4">
    <h4>Sampling Rates</h4>
    <div className="space-y-1">
      <Label htmlFor="freq">Frequency</Label>
      <Input id="freq" defaultValue="250" />
    </div>
  </PopoverContent>
</Popover>`,
    },
    {
      id: "info",
      title: "Contextual Guidance Popover",
      description:
        "Lightweight informational flyout explaining complex system configurations.",
      preview: (
        <div className="flex items-center justify-center p-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <Info className="size-4 text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="center" className="w-64 p-3 text-xs">
              <p className="font-semibold text-foreground mb-1">
                Circuit Breaker Threshold
              </p>
              <p className="text-muted-foreground leading-relaxed">
                When 50% of requests fail within a 10s window, the breaker trips
                to OPEN state automatically.
              </p>
            </PopoverContent>
          </Popover>
        </div>
      ),
      codeSnippet: `<Popover>
  <PopoverTrigger asChild>
    <Button variant="ghost" size="icon"><Info className="size-4" /></Button>
  </PopoverTrigger>
  <PopoverContent className="w-64 p-3 text-xs">
    <p className="font-semibold">Circuit Breaker Threshold</p>
    <p>When 50% of requests fail, breaker trips to OPEN.</p>
  </PopoverContent>
</Popover>`,
    },
  ];

  const propsList = [
    {
      name: "PopoverTrigger",
      type: "React.Component",
      default: "—",
      description: "Interactive button triggering the popover card on click.",
    },
    {
      name: "PopoverContent",
      type: "React.Component",
      default: "—",
      description: "Floating positioned card for custom interactive content.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-popover",
      description: "Base floating popover container card.",
    },
  ];

  return (
    <ComponentView
      title="Popover"
      description="Displays rich content in a portal, triggered by a button click, inspired by Ant Design's Popover."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
