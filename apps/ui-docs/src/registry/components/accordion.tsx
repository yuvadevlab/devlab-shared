"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  Button,
} from "@yuva-devlab/ui";
import { ChevronDown } from "lucide-react";
import {
  ComponentView,
  type ComponentVariant,
} from "@/components/component-view";

export default function AccordionDocPage() {
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);

  const variants: ComponentVariant[] = [
    {
      id: "single",
      title: "Single Mode (Accordion)",
      description:
        "AntD-inspired accordion where expanding one panel automatically collapses the others.",
      preview: (
        <div className="w-full max-w-md">
          <Accordion type="single" collapsible defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is DevLab Shared?</AccordionTrigger>
              <AccordionContent>
                DevLab Shared is an enterprise monorepo providing foundational
                UI primitives, multi-brand design tokens, resilience pipelines,
                and authentication SDKs.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How does CSS scoping work?</AccordionTrigger>
              <AccordionContent>
                All components use scoped .dl-* class names packaged within
                @layer dl-components, guaranteeing zero Tailwind style
                collisions.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ),
      codeSnippet: `<Accordion type="single" collapsible defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>What is DevLab?</AccordionTrigger>
    <AccordionContent>Core foundation primitives.</AccordionContent>
  </AccordionItem>
</Accordion>`,
    },
    {
      id: "multiple",
      title: "Multiple Mode (Concurrent Panels)",
      description:
        "Allows multiple accordion sections to remain expanded at the same time.",
      preview: (
        <div className="w-full max-w-md">
          <Accordion type="multiple" defaultValue={["item-1", "item-2"]}>
            <AccordionItem value="item-1">
              <AccordionTrigger>Cluster Health Diagnostics</AccordionTrigger>
              <AccordionContent>
                Primary nodes operating at 99.98% reliability. No failovers
                detected.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Memory & Cache Utilization</AccordionTrigger>
              <AccordionContent>
                Redis semantic cache hitting 84.2% hit rate with 42ms p99
                latency.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ),
      codeSnippet: `<Accordion type="multiple" defaultValue={["item-1", "item-2"]}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Diagnostics</AccordionTrigger>
    <AccordionContent>Operating normally.</AccordionContent>
  </AccordionItem>
</Accordion>`,
    },
    {
      id: "collapsible",
      title: "Single Disclosure Panel (Collapsible)",
      description:
        "Minimal single-item disclosure component for toggling supplementary content.",
      preview: (
        <div className="w-full max-w-md p-3 border border-border rounded-xl bg-card">
          <Collapsible open={collapsibleOpen} onOpenChange={setCollapsibleOpen}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-foreground">
                Advanced Network Proxy Settings
              </span>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                  <ChevronDown
                    className={`size-4 transition-transform duration-200 ${
                      collapsibleOpen ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="pt-3 text-xs text-muted-foreground border-t border-border mt-3">
              Configure HTTP/2 tunneling, gRPC keep-alives, and mutual TLS
              certs.
            </CollapsibleContent>
          </Collapsible>
        </div>
      ),
      codeSnippet: `import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@yuva-devlab/ui";

<Collapsible open={isOpen} onOpenChange={setIsOpen}>
  <CollapsibleTrigger asChild><Button>Toggle</Button></CollapsibleTrigger>
  <CollapsibleContent>Secret configurations.</CollapsibleContent>
</Collapsible>`,
    },
  ];

  const propsList = [
    {
      name: "type",
      type: '"single" | "multiple"',
      default: '"single"',
      description:
        "Whether one or multiple panels can be opened at the same time.",
    },
    {
      name: "collapsible",
      type: "boolean",
      default: "false",
      description:
        "When type is 'single', allows toggling off the active item.",
    },
    {
      name: "defaultValue",
      type: "string | string[]",
      default: "undefined",
      description: "Value of item(s) to expand on initial render.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-accordion-item",
      description: "Item container element with bottom border.",
    },
    {
      name: ".dl-accordion-trigger",
      description: "Interactive heading button rotating chevron on expansion.",
    },
    {
      name: ".dl-accordion-content",
      description: "Animated accordion content panel.",
    },
  ];

  return (
    <ComponentView
      title="Accordion & Collapsible"
      description="Vertically stacked disclosure sections allowing users to toggle the visibility of content panels. Showcasing single accordion, multiple concurrent panels, and standalone collapsible disclosures."
      category="Data Display"
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
