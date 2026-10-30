"use client";

import React, { useState } from "react";
import { RadioGroup, RadioGroupItem, Label } from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
} from "../../../components/component-view";

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
        <div className="w-full max-w-sm">
          <RadioGroup
            value={val1}
            onValueChange={setVal1}
            className="space-y-3"
          >
            <div className="flex items-center space-x-3 p-3 rounded-lg border border-border bg-card/60 hover:bg-muted/40 transition cursor-pointer">
              <RadioGroupItem value="standard" id="r-standard" />
              <div className="flex-1">
                <Label
                  htmlFor="r-standard"
                  className="cursor-pointer font-semibold"
                >
                  Standard Compute
                </Label>
                <p className="text-xs text-muted-foreground mt-0.5">
                  4 vCPUs • 16GB RAM • Burst credits
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-lg border border-border bg-card/60 hover:bg-muted/40 transition cursor-pointer">
              <RadioGroupItem value="pro" id="r-pro" />
              <div className="flex-1">
                <Label htmlFor="r-pro" className="cursor-pointer font-semibold">
                  GPU Acceleration
                </Label>
                <p className="text-xs text-muted-foreground mt-0.5">
                  NVIDIA H100 Tensor Core • 80GB VRAM
                </p>
              </div>
            </div>
          </RadioGroup>
        </div>
      ),
      codeSnippet: `<RadioGroup value={val} onValueChange={setVal}>
  <div className="p-3 border rounded-lg">
    <RadioGroupItem value="standard" id="r1" />
    <Label htmlFor="r1">Standard</Label>
  </div>
</RadioGroup>`,
    },
    {
      id: "inline",
      title: "Horizontal Inline Radio Group",
      description: "Compact horizontal layout suitable for form filter bars.",
      preview: (
        <RadioGroup
          value={val2}
          onValueChange={setVal2}
          className="flex items-center gap-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="gpt4" id="r-gpt4" />
            <Label htmlFor="r-gpt4" className="cursor-pointer text-xs">
              GPT-4o
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="gemini" id="r-gemini" />
            <Label htmlFor="r-gemini" className="cursor-pointer text-xs">
              Gemini 2.5
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="claude" id="r-claude" disabled />
            <Label
              htmlFor="r-claude"
              className="cursor-pointer text-xs text-muted-foreground"
            >
              Claude (Locked)
            </Label>
          </div>
        </RadioGroup>
      ),
      codeSnippet: `<RadioGroup value={val} onValueChange={setVal} className="flex gap-6">
  <RadioGroupItem value="gpt4" id="r1" /><Label htmlFor="r1">GPT-4o</Label>
  <RadioGroupItem value="gemini" id="r2" /><Label htmlFor="r2">Gemini</Label>
  <RadioGroupItem value="claude" id="r3" disabled /><Label htmlFor="r3">Claude</Label>
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
