"use client";

import React, { useState } from "react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  Button,
} from "@yuva-devlab/ui";
import { ChevronsUpDown, ChevronDown } from "lucide-react";
import {
  ComponentView,
  ComponentVariant,
} from "../../../components/component-view";

/**
 * Documentation page for Collapsible component showcasing interactive toggle disclosures.
 */
export default function CollapsibleDocPage() {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const variants: ComponentVariant[] = [
    {
      id: "memory",
      title: "Agent Session Cache",
      description:
        "Expandable disclosure revealing detailed telemetry tags for agent sessions.",
      preview: (
        <div className="w-full max-w-sm space-y-2 border border-border rounded-xl p-4 bg-card shadow-xs">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold text-foreground">
              Autonomous Session Memory
            </h4>
            <Collapsible open={isOpen1} onOpenChange={setIsOpen1}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="size-8 p-0">
                  <ChevronsUpDown className="size-4" />
                </Button>
              </CollapsibleTrigger>
            </Collapsible>
          </div>
          <div className="p-2 rounded-lg border border-border/80 bg-muted/30 font-mono text-xs text-muted-foreground">
            session_id: &ldquo;dl_sess_89f02a&rdquo;
          </div>
          <Collapsible open={isOpen1} onOpenChange={setIsOpen1}>
            <CollapsibleContent className="space-y-2 pt-2 border-t border-border">
              <div className="p-2 rounded-lg border border-border/80 bg-muted/30 font-mono text-xs text-muted-foreground">
                embedding_model: &ldquo;text-embedding-3-large&rdquo;
              </div>
              <div className="p-2 rounded-lg border border-border/80 bg-muted/30 font-mono text-xs text-muted-foreground">
                cache_hit_rate: 98.4%
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      ),
      codeSnippet: `<Collapsible open={open} onOpenChange={setOpen}>
  <div className="flex items-center justify-between">
    <h4>Autonomous Session Memory</h4>
    <CollapsibleTrigger asChild>
      <Button variant="ghost" size="sm"><ChevronsUpDown className="size-4" /></Button>
    </CollapsibleTrigger>
  </div>
  <CollapsibleContent className="space-y-2 pt-2">
    <div>cache_hit_rate: 98.4%</div>
  </CollapsibleContent>
</Collapsible>`,
    },
    {
      id: "details",
      title: "Inline Filter Disclosures",
      description:
        "Horizontal trigger with chevron rotation revealing secondary filter parameters.",
      preview: (
        <div className="w-full max-w-sm border border-border rounded-xl p-4 bg-card shadow-xs">
          <Collapsible open={isOpen2} onOpenChange={setIsOpen2}>
            <CollapsibleTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between text-xs font-medium"
              >
                <span>Advanced Query Parameters</span>
                <ChevronDown
                  className={`size-4 transition-transform duration-200 ${isOpen2 ? "rotate-180" : ""}`}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-3 space-y-2 text-xs text-muted-foreground">
              <p>• Max generation tokens: 2048</p>
              <p>• Top-P nucleus sampling: 0.95</p>
              <p>• Frequency penalty: 0.2</p>
            </CollapsibleContent>
          </Collapsible>
        </div>
      ),
      codeSnippet: `<Collapsible open={open} onOpenChange={setOpen}>
  <CollapsibleTrigger asChild>
    <Button variant="outline" className="w-full justify-between">
      <span>Advanced Query Parameters</span>
      <ChevronDown className={open ? "rotate-180" : ""} />
    </Button>
  </CollapsibleTrigger>
  <CollapsibleContent className="pt-3">
    <p>Top-P sampling: 0.95</p>
  </CollapsibleContent>
</Collapsible>`,
    },
  ];

  const propsList = [
    {
      name: "open",
      type: "boolean",
      default: "false",
      description: "Controls the open/expanded state of the collapsible.",
    },
    {
      name: "onOpenChange",
      type: "(open: boolean) => void",
      default: "undefined",
      description: "Event handler dispatched when open state changes.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-collapsible-content",
      description:
        "Animated content block with height transitioning from 0 to auto.",
    },
  ];

  return (
    <ComponentView
      title="Collapsible"
      description="An interactive disclosure component which expands and collapses content panels, inspired by Ant Design's Collapse."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
