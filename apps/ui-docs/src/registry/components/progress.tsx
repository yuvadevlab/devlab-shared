"use client";

import React, { useState } from "react";
import {
  Progress,
  Skeleton,
  LoadingState,
  Button,
  Stack,
  Flex,
} from "@yuva-devlab/ui";
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
        <Stack gap={4} className="dl-demo-frame dl-demo-frame--sm">
          <Flex align="center" justify="between" className="dl-demo-box--code">
            <span className="dl-demo-caption">Adjust Progress:</span>
            <Flex align="center" gap={2}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setVal((v) => Math.max(0, v - 20))}
              >
                -20%
              </Button>
              <code className="dl-demo-code">{val}%</code>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setVal((v) => Math.min(100, v + 20))}
              >
                +20%
              </Button>
            </Flex>
          </Flex>
          <Stack gap={1}>
            <Flex justify="between" className="dl-demo-desc">
              <span>Agent Fine-tuning Run</span>
              <span className="dl-demo-code">{val}%</span>
            </Flex>
            <Progress value={val} />
          </Stack>
        </Stack>
      ),
      codeSnippet: `<Progress value={${val}} />`,
    },
    {
      id: "skeleton",
      title: "Content Skeleton Shimmer",
      description:
        "Animated placeholder wireframe displaying during asynchronous card loading.",
      preview: (
        <Stack gap={3} className="dl-demo-frame dl-demo-frame--sm dl-demo-box">
          <Flex align="center" gap={3}>
            <Skeleton className="dl-demo-skeleton-avatar" />
            <Stack gap={1} className="dl-demo-frame">
              <Skeleton className="dl-demo-skeleton-line" />
              <Skeleton className="dl-demo-skeleton-line--sm" />
            </Stack>
          </Flex>
          <Skeleton className="dl-demo-skeleton-line" />
        </Stack>
      ),
      codeSnippet: `import { Skeleton, Flex, Stack } from "@yuva-devlab/ui";

<Stack gap="3">
  <Flex align="center" gap="3">
    <Skeleton className="dl-demo-skeleton-avatar" />
    <Stack gap="1">
      <Skeleton className="dl-demo-skeleton-line" />
      <Skeleton className="dl-demo-skeleton-line--sm" />
    </Stack>
  </Flex>
  <Skeleton className="dl-demo-skeleton-line" />
</Stack>`,
    },
    {
      id: "loading-state",
      title: "Loading State with Action",
      description:
        "AntD-inspired empty / loading state card with spinner and optional retry button.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--sm">
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
