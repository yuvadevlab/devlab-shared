"use client";

import React, { useState } from "react";
import { Slider, Stack, Flex } from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
} from "@/components/component-view";

export default function SliderDocPage() {
  const [val1, setVal1] = useState([70]);
  const [val2, setVal2] = useState([50]);

  const variants: ComponentVariant[] = [
    {
      id: "continuous",
      title: "Continuous Range Slider",
      description:
        "AntD-inspired smooth continuous draggable slider with live numeric readout.",
      preview: (
        <Stack gap={4} className="dl-demo-frame dl-demo-frame--sm">
          <Flex justify="between" className="dl-demo-desc dl-demo-code">
            <span>Model Temperature:</span>
            <span className="dl-demo-heading">
              {(val1[0] / 100).toFixed(2)}
            </span>
          </Flex>
          <Slider
            value={val1}
            onValueChange={setVal1}
            min={0}
            max={100}
            step={1}
          />
          <Flex justify="between" className="dl-demo-slider-labels">
            <span>0.00 (Strict)</span>
            <span>1.00 (Creative)</span>
          </Flex>
        </Stack>
      ),
      codeSnippet: `<Slider value={val} onValueChange={setVal} min={0} max={100} step={1} />`,
    },
    {
      id: "stepped",
      title: "Discrete Stepped Slider",
      description:
        "Slider configured with step ticks (step=25) for discrete parameter selection.",
      preview: (
        <Stack gap={4} className="dl-demo-frame dl-demo-frame--sm">
          <Flex justify="between" className="dl-demo-desc dl-demo-code">
            <span>Concurrency Quota:</span>
            <span className="dl-demo-heading">{val2[0]} Workers</span>
          </Flex>
          <Slider
            value={val2}
            onValueChange={setVal2}
            min={0}
            max={100}
            step={25}
          />
          <Flex justify="between" className="dl-demo-slider-labels">
            <span>0</span>
            <span>25</span>
            <span>50</span>
            <span>75</span>
            <span>100</span>
          </Flex>
        </Stack>
      ),
      codeSnippet: `<Slider value={val} onValueChange={setVal} min={0} max={100} step={25} />`,
    },
    {
      id: "disabled",
      title: "Disabled Slider",
      description:
        "Non-interactive slider track preventing mouse dragging and keyboard controls.",
      preview: (
        <Stack gap={4} className="dl-demo-frame dl-demo-frame--sm">
          <Flex justify="between" className="dl-demo-desc dl-demo-code">
            <span>Locked Setting:</span>
            <span>40%</span>
          </Flex>
          <Slider disabled defaultValue={[40]} />
        </Stack>
      ),
      codeSnippet: `<Slider disabled defaultValue={[40]} />`,
    },
  ];

  const propsList = [
    {
      name: "value",
      type: "number[]",
      default: "undefined",
      description: "Controlled array of numbers representing thumbs on track.",
    },
    {
      name: "onValueChange",
      type: "(value: number[]) => void",
      default: "undefined",
      description: "Callback fired continuously as the thumb is dragged.",
    },
    {
      name: "step",
      type: "number",
      default: "1",
      description: "Stepping granularity when sliding.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Disables interaction.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-slider",
      description: "Horizontal track container establishing touch boundaries.",
    },
    {
      name: ".dl-slider__track",
      description: "Background bar styled with muted surface tokens.",
    },
    {
      name: ".dl-slider__range",
      description: "Filled active span utilizing primary token color.",
    },
    {
      name: ".dl-slider__thumb",
      description: "Circular draggable button with focus outline.",
    },
  ];

  return (
    <ComponentView
      title="Slider"
      description="Draggable range control for choosing numeric values or intervals with keyboard accessibility and touch support. Showcasing continuous sliders, discrete stepped intervals, and disabled states."
      category="Data Entry"
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
