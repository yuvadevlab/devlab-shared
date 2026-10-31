"use client";

import React from "react";
import { Flex, Button, Badge } from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
} from "@/components/component-view";

export default function FlexDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "between",
      title: "Space Between Alignment",
      description:
        "Flex container distributing items with space-between justification.",
      preview: (
        <Flex
          justify="between"
          align="center"
          className="dl-demo-frame dl-demo-frame--md dl-demo-box"
        >
          <div>
            <h4 className="dl-demo-heading">Cluster Status</h4>
            <span className="dl-demo-desc">us-east4</span>
          </div>
          <Badge variant="success">Online</Badge>
        </Flex>
      ),
      codeSnippet: `<Flex justify="between" align="center" className="dl-demo-frame dl-demo-frame--md dl-demo-box">
  <div>
    <h4>Cluster Status</h4>
    <span>us-east4</span>
  </div>
  <Badge variant="success">Online</Badge>
</Flex>`,
    },
    {
      id: "gap",
      title: "Flex with Token Gap",
      description: "Horizontal item row spaced cleanly via token-derived gap.",
      preview: (
        <Flex gap="3" align="center" wrap>
          <Button size="sm" variant="default">
            Primary
          </Button>
          <Button size="sm" variant="secondary">
            Secondary
          </Button>
          <Button size="sm" variant="outline">
            Outline
          </Button>
        </Flex>
      ),
      codeSnippet: `<Flex gap="3" align="center" wrap>
  <Button size="sm">Primary</Button>
  <Button size="sm" variant="secondary">Secondary</Button>
  <Button size="sm" variant="outline">Outline</Button>
</Flex>`,
    },
  ];

  const propsList = [
    {
      name: "direction",
      type: '"row" | "row-reverse" | "col" | "col-reverse"',
      default: '"row"',
      description: "Flex direction orientation.",
    },
    {
      name: "justify",
      type: '"start" | "center" | "end" | "between" | "around" | "evenly"',
      description: "Main axis justification alignment.",
    },
    {
      name: "align",
      type: '"start" | "center" | "end" | "stretch" | "baseline"',
      description: "Cross axis alignment.",
    },
    {
      name: "gap",
      type: '"0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "10"',
      description: "Spacing gap token mapped to --space-* variables.",
    },
    {
      name: "wrap",
      type: 'boolean | "reverse"',
      default: "false",
      description: "Flex wrapping behavior.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-flex",
      description: "Base flexbox container in @layer dl-layout.",
    },
    {
      name: ".dl-gap-*",
      description: "Token-derived gap utilities from --space-*.",
    },
  ];

  return (
    <ComponentView
      title="Flex"
      description="Polymorphic 1D flex container with alignment, direction, wrapping, and token gaps in @layer dl-layout."
      category="Layout"
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
