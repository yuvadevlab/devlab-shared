"use client";

import React from "react";
import { InputNumber, Stack } from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
  type PropDefinition,
  type CssClassDefinition,
} from "@/components/component-view";

export default function InputNumberDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "basic",
      title: "Basic Stepper Control",
      description:
        "Input control specialized for numeric values with accessible up/down increment buttons.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--sm">
          <InputNumber defaultValue={10} min={0} max={100} step={1} />
        </div>
      ),
      codeSnippet: `<InputNumber defaultValue={10} min={0} max={100} step={1} />`,
    },
    {
      id: "prefix-suffix",
      title: "Prefix and Suffix Units",
      description:
        "Display currency symbols, measurements, or timing units directly inside the control.",
      preview: (
        <Stack gap={3} className="dl-demo-frame dl-demo-frame--sm">
          <InputNumber prefix="$" defaultValue={99} step={5} />
          <InputNumber suffix="ms" defaultValue={250} step={50} min={0} />
          <InputNumber
            suffix="px"
            defaultValue={16}
            step={4}
            min={0}
            max={128}
          />
        </Stack>
      ),
      codeSnippet: `<InputNumber prefix="$" defaultValue={99} step={5} />
<InputNumber suffix="ms" defaultValue={250} step={50} min={0} />
<InputNumber suffix="px" defaultValue={16} step={4} min={0} max={128} />`,
    },
    {
      id: "precision-disabled",
      title: "Decimal Precision & Disabled",
      description:
        "Enforces floating point decimal precision or locks the component in disabled state.",
      preview: (
        <Stack gap={3} className="dl-demo-frame dl-demo-frame--sm">
          <InputNumber step={0.25} precision={2} defaultValue={3.75} />
          <InputNumber disabled defaultValue={42} suffix="items" />
        </Stack>
      ),
      codeSnippet: `<InputNumber step={0.25} precision={2} defaultValue={3.75} />
<InputNumber disabled defaultValue={42} suffix="items" />`,
    },
  ];

  const propsList: PropDefinition[] = [
    {
      name: "min",
      type: "number",
      default: "—",
      description: "Minimum permitted numeric value.",
    },
    {
      name: "max",
      type: "number",
      default: "—",
      description: "Maximum permitted numeric value.",
    },
    {
      name: "step",
      type: "number",
      default: "1",
      description: "Step increment or decrement size.",
    },
    {
      name: "precision",
      type: "number",
      default: "—",
      description: "Enforces fixed decimal places.",
    },
    {
      name: "prefix",
      type: "ReactNode",
      default: "—",
      description: "Leading decorative unit or symbol.",
    },
    {
      name: "suffix",
      type: "ReactNode",
      default: "—",
      description: "Trailing unit label (e.g., ms, px, %).",
    },
    {
      name: "controls",
      type: "boolean",
      default: "true",
      description: "Whether stepper buttons are rendered.",
    },
  ];

  const cssClasses: CssClassDefinition[] = [
    {
      name: ".dl-input-number",
      description: "Root styling container for numeric input.",
    },
    {
      name: ".dl-input-number__controls",
      description: "Vertical stepper button rail.",
    },
    {
      name: ".dl-input-number__btn",
      description: "Individual up/down step button.",
    },
  ];

  return (
    <ComponentView
      title="Input Number"
      description="Precision numeric stepper control with keyboard arrow navigation, boundary limits, and unit prefixes/suffixes."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
