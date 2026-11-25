"use client";

import React from "react";
import { Shimmer, ShimmerElement, ShimmerSpeed, Stack } from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
  type PropDefinition,
  type CssClassDefinition,
} from "@/components/component-view";

const NARRATION_CODE = `import { Shimmer, ShimmerElement, ShimmerSpeed, Stack } from "@yuva-devlab/ui";

export function LiveNarrationShimmerDemo() {
  return (
    <Stack gap={3}>
      <Shimmer>Scanning 28 transactions from May 2026…</Shimmer>
      <Shimmer speed={ShimmerSpeed.FAST}>
        Comparing Dining Out against ₹10,000 budget…
      </Shimmer>
      <Shimmer as={ShimmerElement.PARAGRAPH} active={false}>
        Completed analysis in 1.8s
      </Shimmer>
    </Stack>
  );
}`;

export default function ShimmerDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "narration",
      title: "Live Process Narration",
      description:
        "Animated gradient text sweep used to show real-time agent activity instead of static spinners.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md">
          <Stack gap={3}>
            <Shimmer>Scanning 28 transactions from May 2026…</Shimmer>
            <Shimmer speed={ShimmerSpeed.FAST}>
              Comparing Dining Out against ₹10,000 budget…
            </Shimmer>
            <Shimmer as={ShimmerElement.PARAGRAPH} active={false}>
              Completed analysis in 1.8s
            </Shimmer>
          </Stack>
        </div>
      ),
      codeSnippet: NARRATION_CODE,
    },
  ];

  const propsList: PropDefinition[] = [
    {
      name: "as",
      type: '"span" | "p" | "div"',
      default: '"span"',
      description: "Semantic HTML wrapper tag.",
    },
    {
      name: "speed",
      type: '"fast" | "normal" | "slow"',
      default: '"normal"',
      description: "Sweep animation speed preset.",
    },
    {
      name: "active",
      type: "boolean",
      default: "true",
      description: "Toggles shimmer animation on or off.",
    },
  ];

  const cssClasses: CssClassDefinition[] = [
    { name: ".dl-shimmer-text", description: "Base shimmer text style." },
    {
      name: ".dl-shimmer-text--active",
      description: "Applies gradient mask sweep animation.",
    },
  ];

  return (
    <ComponentView
      title="Shimmer"
      description="Animated text highlight primitive for live AI status narration, reasoning headers, and streaming indicators."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
