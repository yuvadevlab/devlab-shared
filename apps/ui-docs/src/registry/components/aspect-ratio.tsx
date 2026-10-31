"use client";

import React from "react";
import { AspectRatio } from "@yuva-devlab/ui";
import { ComponentView, ComponentVariant } from "@/components/component-view";

/**
 * Documentation page for AspectRatio showcasing 16:9 widescreen, 4:3 standard, and 1:1 square ratios.
 */
export default function AspectRatioDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "widescreen",
      title: "16:9 Widescreen Ratio",
      description:
        "Standard ratio for video streams, rich graphs, and hero dashboard previews.",
      preview: (
        <div className="w-full max-w-sm overflow-hidden rounded-xl border border-border shadow-xs">
          <AspectRatio ratio={16 / 9}>
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 via-muted to-muted/80 p-4 text-center">
              <div>
                <p className="text-xs font-semibold text-foreground">
                  16 : 9 Widescreen Container
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5 font-mono">
                  ratio=&#123;16 / 9&#125;
                </p>
              </div>
            </div>
          </AspectRatio>
        </div>
      ),
      codeSnippet: `<AspectRatio ratio={16 / 9}>
  <img
    src="/hero-banner.png"
    alt="Hero"
    className="h-full w-full object-cover rounded-xl"
  />
</AspectRatio>`,
    },
    {
      id: "square",
      title: "1:1 Square Ratio",
      description:
        "Balanced square framing ideal for user avatars, QR codes, and product grid thumbnails.",
      preview: (
        <div className="w-36 overflow-hidden rounded-xl border border-border shadow-xs">
          <AspectRatio ratio={1 / 1}>
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-500/20 via-muted to-muted/80 p-2 text-center">
              <span className="text-xs font-semibold text-foreground font-mono">
                1 : 1 Square
              </span>
            </div>
          </AspectRatio>
        </div>
      ),
      codeSnippet: `<AspectRatio ratio={1 / 1}>
  <div className="h-full w-full flex items-center justify-center bg-muted">
    <span>1 : 1</span>
  </div>
</AspectRatio>`,
    },
    {
      id: "standard",
      title: "4:3 Standard Ratio",
      description:
        "Classic aspect ratio suitable for presentation slides and embedded camera feeds.",
      preview: (
        <div className="w-full max-w-xs overflow-hidden rounded-xl border border-border shadow-xs">
          <AspectRatio ratio={4 / 3}>
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-emerald-500/20 via-muted to-muted/80 p-4 text-center">
              <div>
                <p className="text-xs font-semibold text-foreground">
                  4 : 3 Slide View
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5 font-mono">
                  ratio=&#123;4 / 3&#125;
                </p>
              </div>
            </div>
          </AspectRatio>
        </div>
      ),
      codeSnippet: `<AspectRatio ratio={4 / 3}>
  <div className="h-full w-full flex items-center justify-center bg-muted">
    <p>4:3 Slide View</p>
  </div>
</AspectRatio>`,
    },
  ];

  const propsList = [
    {
      name: "ratio",
      type: "number",
      default: "1",
      description:
        "The desired aspect ratio expressed as width / height (e.g. 16/9, 4/3, 1).",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-aspect-ratio",
      description:
        "Wrapper maintaining specified proportional width-to-height ratio.",
    },
  ];

  return (
    <ComponentView
      title="Aspect Ratio"
      description="Displays content within a desired aspect ratio across any viewport width."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
