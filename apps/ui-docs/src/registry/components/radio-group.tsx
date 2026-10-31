"use client";

import React, { useState } from "react";
import {
  RadioGroup,
  RadioGroupItem,
  Label,
  Flex,
  Stack,
} from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
} from "@/components/component-view";

export default function RadioGroupDocPage() {
  const [val1, setVal1] = useState("standard");
  const [val2, setVal2] = useState("gpt4");

  const variants: ComponentVariant[] = [
    {
      id: "cards",
      title: "Card-Style Radio Options",
      description:
        "AntD-inspired rich option cards with primary border highlight on selection.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--sm">
          <RadioGroup value={val1} onValueChange={setVal1}>
            <Stack gap={3}>
              <Flex
                align="center"
                gap={3}
                className="dl-demo-box dl-demo-box--sm"
              >
                <RadioGroupItem value="standard" id="r-standard" />
                <div className="dl-demo-frame">
                  <Label htmlFor="r-standard" className="dl-demo-heading">
                    Standard Compute
                  </Label>
                  <p className="dl-demo-desc">
                    4 vCPUs • 16GB RAM • Burst credits
                  </p>
                </div>
              </Flex>

              <Flex
                align="center"
                gap={3}
                className="dl-demo-box dl-demo-box--sm"
              >
                <RadioGroupItem value="pro" id="r-pro" />
                <div className="dl-demo-frame">
                  <Label htmlFor="r-pro" className="dl-demo-heading">
                    GPU Acceleration
                  </Label>
                  <p className="dl-demo-desc">
                    NVIDIA H100 Tensor Core • 80GB VRAM
                  </p>
                </div>
              </Flex>
            </Stack>
          </RadioGroup>
        </div>
      ),
      codeSnippet: `<RadioGroup value={val} onValueChange={setVal}>
  <Flex align="center" gap="3" className="dl-demo-box dl-demo-box--sm">
    <RadioGroupItem value="standard" id="r1" />
    <Label htmlFor="r1">Standard</Label>
  </Flex>
</RadioGroup>`,
    },
    {
      id: "inline",
      title: "Horizontal Inline Radio Group",
      description: "Compact horizontal layout suitable for form filter bars.",
      preview: (
        <RadioGroup value={val2} onValueChange={setVal2}>
          <Flex align="center" gap={6}>
            <Flex align="center" gap={2}>
              <RadioGroupItem value="gpt4" id="r-gpt4" />
              <Label htmlFor="r-gpt4" className="dl-demo-desc">
                GPT-4o
              </Label>
            </Flex>
            <Flex align="center" gap={2}>
              <RadioGroupItem value="gemini" id="r-gemini" />
              <Label htmlFor="r-gemini" className="dl-demo-desc">
                Gemini 2.5
              </Label>
            </Flex>
            <Flex align="center" gap={2}>
              <RadioGroupItem value="claude" id="r-claude" disabled />
              <Label htmlFor="r-claude" className="dl-demo-desc">
                Claude (Locked)
              </Label>
            </Flex>
          </Flex>
        </RadioGroup>
      ),
      codeSnippet: `<RadioGroup value={val} onValueChange={setVal}>
  <Flex align="center" gap="6">
    <Flex align="center" gap="2">
      <RadioGroupItem value="gpt4" id="r1" />
      <Label htmlFor="r1">GPT-4o</Label>
    </Flex>
  </Flex>
</RadioGroup>`,
    },
  ];

  const propsList = [
    {
      name: "value",
      type: "string",
      default: "undefined",
      description: "Controlled string value of active option.",
    },
    {
      name: "onValueChange",
      type: "(value: string) => void",
      default: "undefined",
      description: "Event handler triggered when selection changes.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Disables interaction across the entire group.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-radio-group",
      description: "Grid or flex layout container managing group spacing.",
    },
    {
      name: ".dl-radio-item",
      description: "Circular check button with border and focus ring.",
    },
    {
      name: ".dl-radio-item__indicator",
      description: "Centered inner dot rendered when radio is checked.",
    },
  ];

  return (
    <ComponentView
      title="Radio Group"
      description="Set of checkable buttons where only one option can be selected at a time, supporting keyboard arrow navigation. Showcasing card-style rich options and horizontal inline radio groups."
      category="Data Entry"
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
