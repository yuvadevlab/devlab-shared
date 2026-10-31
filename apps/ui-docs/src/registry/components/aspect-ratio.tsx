"use client";

import React from "react";
import { AspectRatio, Flex, Stack } from "@yuva-devlab/ui";
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
        <div className="dl-demo-frame dl-demo-frame--sm dl-demo-box">
          <AspectRatio ratio={16 / 9}>
            <Flex
              align="center"
              justify="center"
              className="dl-demo-slide dl-demo-slide--orchestrai"
            >
              <Stack align="center" gap={1}>
                <p className="dl-demo-heading">16 : 9 Widescreen Container</p>
                <p className="dl-demo-code">ratio=&#123;16 / 9&#125;</p>
              </Stack>
            </Flex>
          </AspectRatio>
        </div>
      ),
      codeSnippet: `<AspectRatio ratio={16 / 9}>
  <div className="dl-demo-slide">
    <p>16 : 9 Widescreen Container</p>
  </div>
</AspectRatio>`,
    },
    {
      id: "square",
      title: "1:1 Square Ratio",
      description:
        "Balanced square framing ideal for user avatars, QR codes, and product grid thumbnails.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--xs dl-demo-box">
          <AspectRatio ratio={1 / 1}>
            <Flex
              align="center"
              justify="center"
              className="dl-demo-slide dl-demo-slide--finai"
            >
              <span className="dl-demo-code">1 : 1 Square</span>
            </Flex>
          </AspectRatio>
        </div>
      ),
      codeSnippet: `<AspectRatio ratio={1 / 1}>
  <div className="dl-demo-slide">
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
        <div className="dl-demo-frame dl-demo-frame--xs dl-demo-box">
          <AspectRatio ratio={4 / 3}>
            <Flex
              align="center"
              justify="center"
              className="dl-demo-slide dl-demo-slide--vitalai"
            >
              <Stack align="center" gap={1}>
                <p className="dl-demo-heading">4 : 3 Slide View</p>
                <p className="dl-demo-code">ratio=&#123;4 / 3&#125;</p>
              </Stack>
            </Flex>
          </AspectRatio>
        </div>
      ),
      codeSnippet: `<AspectRatio ratio={4 / 3}>
  <div className="dl-demo-slide">
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
