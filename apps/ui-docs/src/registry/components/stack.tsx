"use client";

import React from "react";
import { Stack, Button, Input } from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
} from "@/components/component-view";

export default function StackDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "form-flow",
      title: "Vertical Form Stack",
      description:
        "Consistent vertical flow with token spacing between form elements.",
      preview: (
        <Stack gap="3" className="w-full max-w-sm">
          <Input placeholder="Enter username..." />
          <Input placeholder="Enter password..." type="password" />
          <Button variant="default">Sign In</Button>
        </Stack>
      ),
      codeSnippet: `<Stack gap="3">
  <Input placeholder="Enter username..." />
  <Input placeholder="Enter password..." type="password" />
  <Button>Sign In</Button>
</Stack>`,
    },
    {
      id: "horizontal-stack",
      title: "Horizontal Row Stack",
      description: "Horizontal item arrangement with uniform spacing.",
      preview: (
        <Stack direction="row" gap="2" align="center">
          <Button size="sm" variant="default">
            Save
          </Button>
          <Button size="sm" variant="ghost">
            Cancel
          </Button>
        </Stack>
      ),
      codeSnippet: `<Stack direction="row" gap="2" align="center">
  <Button size="sm">Save</Button>
  <Button size="sm" variant="ghost">Cancel</Button>
</Stack>`,
    },
  ];

  const propsList = [
    {
      name: "direction",
      type: '"col" | "row"',
      default: '"col"',
      description: "Orientation of items inside the stack.",
    },
    {
      name: "gap",
      type: '"0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "10"',
      default: '"3"',
      description: "Spacing gap token mapped to --space-* variables.",
    },
    {
      name: "align",
      type: '"start" | "center" | "end" | "stretch" | "baseline"',
      default: '"stretch"',
      description: "Cross axis alignment of stack items.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-stack",
      description: "Base stack flow container in @layer dl-layout.",
    },
  ];

  return (
    <ComponentView
      title="Stack"
      description="High-velocity vertical or horizontal content flow with token-governed spacing in @layer dl-layout."
      category="Layout"
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
