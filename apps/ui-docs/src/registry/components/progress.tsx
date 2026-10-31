"use client";

import React, { useState } from "react";
import { Progress, Skeleton, LoadingState, Button } from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
} from "@/components/component-view";

export default function ProgressDocPage() {
  const [val, setVal] = useState(68);

  const variants: ComponentVariant[] = [
    {
      id: "bar",
      title: "Determinate Progress Bar",
      description:
        "AntD-inspired progress track with smooth width transition and percentage labels.",
      preview: (
        <div className="w-full max-w-sm space-y-4">
          <div className="flex items-center justify-between text-xs bg-muted/40 p-2.5 rounded-lg border border-border">
            <span className="text-muted-foreground">Adjust Progress:</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-6 text-xs px-2"
                onClick={() => setVal((v) => Math.max(0, v - 20))}
              >
                -20%
              </Button>
              <code className="text-primary font-mono font-semibold px-1">
                {val}%
              </code>
              <Button
                variant="outline"
                size="sm"
                className="h-6 text-xs px-2"
                onClick={() => setVal((v) => Math.min(100, v + 20))}
              >
                +20%
              </Button>
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Agent Fine-tuning Run</span>
              <span className="font-mono">{val}%</span>
            </div>
            <Progress value={val} />
          </div>
        </div>
      ),
      codeSnippet: `<Progress value={${val}} />`,
    },
    {
      id: "skeleton",
      title: "Content Skeleton Shimmer",
      description:
        "Animated placeholder wireframe displaying during asynchronous card loading.",
      preview: (
        <div className="w-full max-w-sm p-4 bg-muted/20 border border-border rounded-xl space-y-3">
          <div className="flex items-center gap-3">
            <Skeleton className="size-10 rounded-full" />
            <div className="space-y-1.5 flex-1">
              <Skeleton className="h-3 w-3/4 rounded" />
              <Skeleton className="h-2.5 w-1/2 rounded" />
            </div>
          </div>
          <Skeleton className="h-16 w-full rounded-lg" />
        </div>
      ),
      codeSnippet: `import { Skeleton } from "@yuva-devlab/ui";

<div className="flex items-center gap-3">
  <Skeleton className="size-10 rounded-full" />
  <div className="space-y-1.5 flex-1">
    <Skeleton className="h-3 w-3/4" />
    <Skeleton className="h-2.5 w-1/2" />
  </div>
</div>`,
    },
    {
      id: "loading-state",
      title: "Loading State with Action",
      description:
        "AntD-inspired empty / loading state card with spinner and optional retry button.",
      preview: (
        <div className="w-full max-w-sm">
          <LoadingState message="Indexing Vector Store: processing chunks from pipeline..." />
        </div>
      ),
      codeSnippet: `import { LoadingState } from "@yuva-devlab/ui";

<LoadingState message="Indexing Vector Store: processing chunks..." />`,
    },
  ];

  const propsList = [
    {
      name: "value",
      type: "number",
      default: "0",
      description: "Current completion percentage between 0 and 100.",
    },
    {
      name: "max",
      type: "number",
      default: "100",
      description: "Maximum progress value.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-progress",
      description:
        "Track container with rounded pill border and overflow clipping.",
    },
    {
      name: ".dl-progress__indicator",
      description:
        "Moving indicator bar transitioning smoothly across the track.",
    },
    {
      name: ".dl-skeleton",
      description: "Pulsing animated placeholder surface for loading content.",
    },
  ];

  return (
    <ComponentView
      title="Progress & Loading"
      description="Visual progress indicator and loading feedback components. Showcasing determinate progress bars, skeleton shimmer wireframes (Skeleton), and async loading state cards (LoadingState)."
      category="Feedback"
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
