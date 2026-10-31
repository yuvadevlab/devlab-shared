"use client";

import React, { useState } from "react";
import { Toggle, ToggleGroup, ToggleGroupItem, Flex } from "@yuva-devlab/ui";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";
import {
  ComponentView,
  type ComponentVariant,
} from "@/components/component-view";

export default function ToggleDocPage() {
  const [singlePressed, setSinglePressed] = useState(true);
  const [align, setAlign] = useState("center");
  const [formats, setFormats] = useState<string[]>(["bold"]);

  const variants: ComponentVariant[] = [
    {
      id: "single",
      title: "Single Toggle Button",
      description:
        "Two-state button that can be clicked to switch between active on and off states.",
      preview: (
        <Flex align="center" gap={3}>
          <Toggle
            pressed={singlePressed}
            onPressedChange={setSinglePressed}
            variant="outline"
          >
            <Bold className="dl-demo-icon" />
            <span>Bold Formatting</span>
          </Toggle>
        </Flex>
      ),
      codeSnippet: `<Toggle pressed={pressed} onPressedChange={setPressed} variant="outline">
  <Bold className="dl-demo-icon" />
  <span>Bold</span>
</Toggle>`,
    },
    {
      id: "group-single",
      title: "Toggle Group (Single Selection)",
      description:
        "AntD-inspired segmented group where only one option can be active at a time.",
      preview: (
        <ToggleGroup
          type="single"
          value={align}
          onValueChange={(val) => val && setAlign(val)}
          variant="outline"
        >
          <ToggleGroupItem value="left" aria-label="Align left">
            <AlignLeft className="dl-demo-icon" />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center">
            <AlignCenter className="dl-demo-icon" />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right">
            <AlignRight className="dl-demo-icon" />
          </ToggleGroupItem>
        </ToggleGroup>
      ),
      codeSnippet: `import { ToggleGroup, ToggleGroupItem } from "@yuva-devlab/ui";

<ToggleGroup type="single" value={align} onValueChange={setAlign} variant="outline">
  <ToggleGroupItem value="left"><AlignLeft className="dl-demo-icon" /></ToggleGroupItem>
  <ToggleGroupItem value="center"><AlignCenter className="dl-demo-icon" /></ToggleGroupItem>
  <ToggleGroupItem value="right"><AlignRight className="dl-demo-icon" /></ToggleGroupItem>
</ToggleGroup>`,
    },
    {
      id: "group-multiple",
      title: "Toggle Group (Multiple Selection)",
      description:
        "Toolbar group where multiple formatting items can be active concurrently.",
      preview: (
        <ToggleGroup
          type="multiple"
          value={formats}
          onValueChange={setFormats}
          variant="outline"
        >
          <ToggleGroupItem value="bold" aria-label="Toggle bold">
            <Bold className="dl-demo-icon" />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic">
            <Italic className="dl-demo-icon" />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Toggle underline">
            <Underline className="dl-demo-icon" />
          </ToggleGroupItem>
        </ToggleGroup>
      ),
      codeSnippet: `<ToggleGroup type="multiple" value={formats} onValueChange={setFormats} variant="outline">
  <ToggleGroupItem value="bold"><Bold className="dl-demo-icon" /></ToggleGroupItem>
  <ToggleGroupItem value="italic"><Italic className="dl-demo-icon" /></ToggleGroupItem>
  <ToggleGroupItem value="underline"><Underline className="dl-demo-icon" /></ToggleGroupItem>
</ToggleGroup>`,
    },
  ];

  const propsList = [
    {
      name: "pressed",
      type: "boolean",
      default: "false",
      description: "Controlled pressed state of the single toggle.",
    },
    {
      name: "onPressedChange",
      type: "(pressed: boolean) => void",
      default: "undefined",
      description: "Callback fired when the pressed state changes.",
    },
    {
      name: "ToggleGroup",
      type: "React.Component",
      default: "—",
      description: "Group container managing single or multiple toggle items.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-toggle",
      description: "Base toggle button with inline flex layout.",
    },
    {
      name: '.dl-toggle[data-state="on"]',
      description: "Active pressed state utilizing accent surface colors.",
    },
    {
      name: ".dl-toggle-group",
      description: "Container grouping multiple toggle items.",
    },
  ];

  return (
    <ComponentView
      title="Toggle & Toggle Group"
      description="Two-state interactive button that can be either on or off, typically used in toolbars. Showcasing single toggles, exclusive single-choice groups, and multiple-selection formatting groups."
      category="Data Entry"
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
