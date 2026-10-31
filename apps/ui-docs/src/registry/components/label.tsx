"use client";

import React from "react";
import { Label, Input, Stack, Flex } from "@yuva-devlab/ui";
import { ComponentView, ComponentVariant } from "@/components/component-view";

/**
 * Documentation page for Label component showcasing required indicators and form alignments.
 */
export default function LabelDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "required",
      title: "Required Indicator (*)",
      description:
        "Displays a red asterisk indicator to signal mandatory input fields.",
      preview: (
        <Stack gap={2} className="dl-demo-frame dl-demo-frame--sm">
          <Label htmlFor="cluster-name" required>
            Cluster Hostname
          </Label>
          <Input id="cluster-name" placeholder="us-east-cluster-01" />
        </Stack>
      ),
      codeSnippet: `<Stack gap="2">
  <Label htmlFor="cluster-name" required>
    Cluster Hostname
  </Label>
  <Input id="cluster-name" placeholder="us-east-cluster-01" />
</Stack>`,
    },
    {
      id: "optional",
      title: "Optional & Contextual Labels",
      description:
        "Standard typography label without mandatory marking for elective options.",
      preview: (
        <Stack gap={2} className="dl-demo-frame dl-demo-frame--sm">
          <Flex justify="between" align="center">
            <Label htmlFor="optional-notes">Deployment Notes</Label>
            <span className="dl-demo-caption">(Optional)</span>
          </Flex>
          <Input
            id="optional-notes"
            placeholder="Changelog description or pull request reference"
          />
        </Stack>
      ),
      codeSnippet: `<Stack gap="2">
  <Flex justify="between">
    <Label htmlFor="notes">Deployment Notes</Label>
    <span>(Optional)</span>
  </Flex>
  <Input id="notes" placeholder="Changelog description" />
</Stack>`,
    },
  ];

  const propsList = [
    {
      name: "htmlFor",
      type: "string",
      default: "undefined",
      description:
        "ID of the target input element for accessibility association.",
    },
    {
      name: "required",
      type: "boolean",
      default: "false",
      description: "When true, renders a semantic red asterisk indicator (*).",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-label",
      description:
        "Accessible typography styles, medium weight, and disabled cursor inheritance.",
    },
    {
      name: ".dl-label--required::after",
      description: "Red asterisk pseudo-element.",
    },
  ];

  return (
    <ComponentView
      title="Label"
      description="Renders an accessible label associated with controls, inspired by Ant Design's Form.Item label styling."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
