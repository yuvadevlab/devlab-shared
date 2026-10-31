"use client";

import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Input,
  Label,
  Flex,
  Stack,
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
        <Flex align="center" justify="center">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <SlidersHorizontal className="dl-demo-icon dl-demo-icon--sm" />
                <span>Telemetry Filters</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="center">
              <Stack gap={4}>
                <Stack gap={1}>
                  <h4 className="dl-demo-heading">Sampling Rates</h4>
                  <p className="dl-demo-desc">
                    Configure sampling rates for live trace exports.
                  </p>
                </Stack>

                <Stack gap={3} className="dl-demo-desc">
                  <Stack gap={1}>
                    <Label htmlFor="sample-rate">Sample Frequency (ms)</Label>
                    <Input id="sample-rate" defaultValue="250" />
                  </Stack>
                  <Stack gap={1}>
                    <Label htmlFor="max-traces">Max In-Memory Traces</Label>
                    <Input id="max-traces" defaultValue="10000" />
                  </Stack>
                </Stack>
              </Stack>
            </PopoverContent>
          </Popover>
        </Flex>
      ),
      codeSnippet: `<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline"><SlidersHorizontal />Filters</Button>
  </PopoverTrigger>
  <PopoverContent>
    <Stack gap="4">
      <h4>Sampling Rates</h4>
      <Stack gap="1">
        <Label htmlFor="freq">Frequency</Label>
        <Input id="freq" defaultValue="250" />
      </Stack>
    </Stack>
  </PopoverContent>
</Popover>`,
    },
    {
      id: "info",
      title: "Contextual Guidance Popover",
      description:
        "Lightweight informational flyout explaining complex system configurations.",
      preview: (
        <Flex align="center" justify="center">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <Info className="dl-demo-icon dl-demo-icon--sm" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="center">
              <Stack gap={1} className="dl-demo-desc">
                <p className="dl-demo-heading">Circuit Breaker Threshold</p>
                <p>
                  When 50% of requests fail within a 10s window, the breaker
                  trips to OPEN state automatically.
                </p>
              </Stack>
            </PopoverContent>
          </Popover>
        </Flex>
      ),
      codeSnippet: `<Popover>
  <PopoverTrigger asChild>
    <Button variant="ghost" size="icon"><Info /></Button>
  </PopoverTrigger>
  <PopoverContent>
    <Stack gap="1">
      <p>Circuit Breaker Threshold</p>
      <p>When 50% of requests fail, breaker trips to OPEN.</p>
    </Stack>
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
