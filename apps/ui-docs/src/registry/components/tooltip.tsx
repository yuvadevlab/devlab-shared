"use client";

import React from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Stack,
} from "@yuva-devlab/ui";
import { Sparkles, Info, MessageSquare } from "lucide-react";
import {
  ComponentView,
  type ComponentVariant,
} from "@/components/component-view";

export default function TooltipDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "tooltip",
      title: "Basic Hover Tooltip",
      description:
        "Fast contextual assistive text displayed when hovering or focusing an interactive button.",
      preview: (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">
                <Sparkles className="dl-demo-icon" />
                <span>Hover for Insights</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p className="dl-demo-desc">
                Autonomous self-healing enabled on this node cluster.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
      codeSnippet: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild><Button>Hover me</Button></TooltipTrigger>
    <TooltipContent side="top"><p>Contextual hint text.</p></TooltipContent>
  </Tooltip>
</TooltipProvider>`,
    },
    {
      id: "hover-card",
      title: "Rich Hover Card Preview",
      description:
        "AntD-inspired rich hover preview card for inspecting user profiles or metadata.",
      preview: (
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="ghost">
              <Info className="dl-demo-icon" />
              <span>@orchestrai-agent</span>
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="dl-demo-frame--sm">
            <Stack gap={2}>
              <h4 className="dl-demo-heading">OrchestrAI Core Worker</h4>
              <p className="dl-demo-desc">
                Multi-agent coordinator managing distributed task delegation.
              </p>
              <div className="dl-demo-code dl-demo-caption">
                Cluster: us-east4 | Health: 100%
              </div>
            </Stack>
          </HoverCardContent>
        </HoverCard>
      ),
      codeSnippet: `import { HoverCard, HoverCardTrigger, HoverCardContent } from "@yuva-devlab/ui";

<HoverCard>
  <HoverCardTrigger asChild>
    <Button variant="ghost">@orchestrai-agent</Button>
  </HoverCardTrigger>
  <HoverCardContent>
    <h4>OrchestrAI Core Worker</h4>
    <p>Multi-agent coordinator.</p>
  </HoverCardContent>
</HoverCard>`,
    },
    {
      id: "popover",
      title: "Clickable Popover Flyout",
      description:
        "Click-triggered floating panel for filter adjustments, details, and interactive inputs.",
      preview: (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="secondary">
              <MessageSquare className="dl-demo-icon" />
              <span>Open Popover</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="dl-demo-frame--xs">
            <Stack gap={2}>
              <div className="dl-demo-heading">Quick Annotations</div>
              <p className="dl-demo-desc">
                Add runtime comments to this trace execution span.
              </p>
            </Stack>
          </PopoverContent>
        </Popover>
      ),
      codeSnippet: `import { Popover, PopoverTrigger, PopoverContent } from "@yuva-devlab/ui";

<Popover>
  <PopoverTrigger asChild><Button>Open</Button></PopoverTrigger>
  <PopoverContent>
    <h4>Quick Annotations</h4>
  </PopoverContent>
</Popover>`,
    },
  ];

  const propsList = [
    {
      name: "TooltipProvider",
      type: "React.Component",
      default: "—",
      description: "Context provider managing global hover delay timers.",
    },
    {
      name: "side",
      type: '"top" | "right" | "bottom" | "left"',
      default: '"top"',
      description: "Placement side for the floating tooltip bubble.",
    },
    {
      name: "sideOffset",
      type: "number",
      default: "4",
      description: "Pixel distance separating trigger element and tooltip.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-tooltip",
      description: "Floating hint bubble with popover background.",
    },
    {
      name: ".dl-hover-card",
      description: "Rich content surface appearing on cursor hover.",
    },
    {
      name: ".dl-popover",
      description: "Floating panel content triggered on click.",
    },
  ];

  return (
    <ComponentView
      title="Tooltip & Popovers"
      description="Contextual floating indicators supporting basic hover tooltips, rich hover cards (HoverCard), and clickable flyout popovers (Popover)."
      category="Data Display"
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
