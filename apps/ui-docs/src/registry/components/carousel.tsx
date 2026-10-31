"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@yuva-devlab/ui";
import { ComponentView, ComponentVariant } from "@/components/component-view";

const slides = [
  {
    title: "OrchestrAI",
    className: "dl-demo-slide--orchestrai",
    subtitle: "Multi-Agent Coordination",
  },
  {
    title: "FinAI",
    className: "dl-demo-slide--finai",
    subtitle: "Quantitative Trading & Risk",
  },
  {
    title: "VitalAI",
    className: "dl-demo-slide--vitalai",
    subtitle: "Diagnostic Pipelines",
  },
];

/**
 * Documentation page for Carousel component showcasing fluid slide navigation.
 */
export default function CarouselDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "featured",
      title: "Featured Workspace Slides",
      description:
        "Horizontal touch and keyboard navigated carousel with previous/next action buttons.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--carousel">
          <Carousel className="dl-demo-frame">
            <CarouselContent>
              {slides.map((s, index) => (
                <CarouselItem key={index}>
                  <div className={`dl-demo-slide ${s.className}`}>
                    <span className="dl-demo-title">{s.title}</span>
                    <span className="dl-demo-desc">{s.subtitle}</span>
                    <span className="dl-demo-code">
                      Slide {index + 1} of {slides.length}
                    </span>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      ),
      codeSnippet: `<Carousel className="dl-demo-frame dl-demo-frame--xs">
  <CarouselContent>
    <CarouselItem>
      <div className="dl-demo-slide">Slide 1</div>
    </CarouselItem>
    <CarouselItem>
      <div className="dl-demo-slide">Slide 2</div>
    </CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
    },
    {
      id: "compact",
      title: "Compact Thumbnail Slider",
      description:
        "Low-profile carousel suitable for compact widget panels or mobile headers.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--carousel-sm">
          <Carousel className="dl-demo-frame">
            <CarouselContent>
              <CarouselItem>
                <div className="dl-demo-slide--compact">
                  Cluster US-East-1 (Healthy)
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="dl-demo-slide--compact">
                  Cluster EU-Central-1 (Healthy)
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      ),
      codeSnippet: `<Carousel>
  <CarouselContent>
    <CarouselItem>Cluster US-East</CarouselItem>
    <CarouselItem>Cluster EU-Central</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
    },
  ];

  const propsList = [
    {
      name: "orientation",
      type: '"horizontal" | "vertical"',
      default: '"horizontal"',
      description: "Scroll axis direction for the carousel slide track.",
    },
    {
      name: "opts",
      type: "EmblaOptionsType",
      default: "undefined",
      description: "Underlying Embla Carousel physics and looping options.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-carousel",
      description: "Relative wrapper positioning the carousel track.",
    },
    {
      name: ".dl-carousel-item",
      description: "Individual slide element inside the flex track.",
    },
  ];

  return (
    <ComponentView
      title="Carousel"
      description="A motion and gesture-driven carousel with support for arrow controls, loops, and responsive breakpoints, inspired by Ant Design's Carousel."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
