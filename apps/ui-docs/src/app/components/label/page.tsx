"use client";

import React from "react";
import { Label, Input } from "@yuva-devlab/ui";
import {
  ComponentView,
  ComponentVariant,
} from "../../../components/component-view";

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
        <div className="w-full max-w-sm space-y-1.5 p-2">
          <Label htmlFor="cluster-name" required>
            Cluster Hostname
          </Label>
          <Input id="cluster-name" placeholder="us-east-cluster-01" />
        </div>
      ),
      codeSnippet: `<div className="space-y-1.5">
  <Label htmlFor="cluster-name" required>
    Cluster Hostname
  </Label>
  <Input id="cluster-name" placeholder="us-east-cluster-01" />
</div>`,
    },
    {
      id: "optional",
      title: "Optional & Contextual Labels",
      description:
        "Standard typography label without mandatory marking for elective options.",
      preview: (
        <div className="w-full max-w-sm space-y-1.5 p-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="optional-notes">Deployment Notes</Label>
            <span className="text-[11px] text-muted-foreground font-normal">
              (Optional)
            </span>
          </div>
          <Input
            id="optional-notes"
            placeholder="Changelog description or pull request reference"
          />
        </div>
      ),
      codeSnippet: `<div className="space-y-1.5">
  <div className="flex justify-between">
    <Label htmlFor="notes">Deployment Notes</Label>
    <span className="text-xs text-muted-foreground">(Optional)</span>
  </div>
  <Input id="notes" placeholder="Changelog description" />
</div>`,
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
