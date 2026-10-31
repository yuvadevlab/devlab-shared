"use client";

import React, { useState } from "react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  Button,
  Stack,
  Flex,
  cn,
} from "@yuva-devlab/ui";
import { ChevronsUpDown, ChevronDown } from "lucide-react";
import { ComponentView, ComponentVariant } from "@/components/component-view";

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
        <Stack gap={2} className="dl-demo-frame dl-demo-frame--sm dl-demo-box">
          <Flex align="center" justify="between">
            <h4 className="dl-demo-heading">Autonomous Session Memory</h4>
            <Collapsible open={isOpen1} onOpenChange={setIsOpen1}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="icon">
                  <ChevronsUpDown className="dl-demo-icon dl-demo-icon--sm" />
                </Button>
              </CollapsibleTrigger>
            </Collapsible>
          </Flex>
          <div className="dl-demo-box--code">
            session_id: &ldquo;dl_sess_89f02a&rdquo;
          </div>
          <Collapsible open={isOpen1} onOpenChange={setIsOpen1}>
            <CollapsibleContent>
              <Stack gap={2} className="dl-demo-box--collapsible-header">
                <div className="dl-demo-box--code">
                  embedding_model: &ldquo;text-embedding-3-large&rdquo;
                </div>
                <div className="dl-demo-box--code">cache_hit_rate: 98.4%</div>
              </Stack>
            </CollapsibleContent>
          </Collapsible>
        </Stack>
      ),
      codeSnippet: `<Collapsible open={open} onOpenChange={setOpen}>
  <Flex align="center" justify="between">
    <h4>Autonomous Session Memory</h4>
    <CollapsibleTrigger asChild>
      <Button variant="ghost" size="icon"><ChevronsUpDown /></Button>
    </CollapsibleTrigger>
  </Flex>
  <CollapsibleContent>
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
        <div className="dl-demo-frame dl-demo-frame--sm dl-demo-box">
          <Collapsible open={isOpen2} onOpenChange={setIsOpen2}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="dl-demo-frame">
                <Flex
                  align="center"
                  justify="between"
                  className="dl-demo-frame"
                >
                  <span>Advanced Query Parameters</span>
                  <ChevronDown
                    className={cn(
                      "dl-demo-icon dl-demo-icon--sm dl-demo-icon--transition",
                      isOpen2 && "dl-demo-icon--rotated",
                    )}
                  />
                </Flex>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Stack
                gap={1}
                className="dl-demo-desc dl-demo-box--collapsible-header"
              >
                <p>• Max generation tokens: 2048</p>
                <p>• Top-P nucleus sampling: 0.95</p>
                <p>• Frequency penalty: 0.2</p>
              </Stack>
            </CollapsibleContent>
          </Collapsible>
        </div>
      ),
      codeSnippet: `<Collapsible open={open} onOpenChange={setOpen}>
  <CollapsibleTrigger asChild>
    <Button variant="outline">
      <Flex align="center" justify="between">
        <span>Advanced Query Parameters</span>
        <ChevronDown />
      </Flex>
    </Button>
  </CollapsibleTrigger>
  <CollapsibleContent>
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
