"use client";

import React from "react";
import { MultiSelect, Stack } from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
  type PropDefinition,
  type CssClassDefinition,
} from "@/components/component-view";

const sampleTeams = [
  { label: "Engineering", value: "eng" },
  { label: "Product Management", value: "pm" },
  { label: "UX / UI Design", value: "design" },
  { label: "Quality Assurance", value: "qa" },
  { label: "DevOps & Cloud", value: "devops" },
  { label: "Security & IAM", value: "security" },
];

export default function MultiSelectDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "basic",
      title: "Basic Multi-Select",
      description:
        "Select control supporting multi-choice tagging, live search filtering, and one-click item removal.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--sm">
          <MultiSelect
            options={sampleTeams}
            placeholder="Select team members..."
          />
        </div>
      ),
      codeSnippet: `<MultiSelect
  options={[
    { label: "Engineering", value: "eng" },
    { label: "Product Management", value: "pm" },
    { label: "UX / UI Design", value: "design" },
  ]}
  placeholder="Select team members..."
/>`,
    },
    {
      id: "preselected",
      title: "Preset Selections & Chip Truncation",
      description:
        "Pre-populates values and truncates chips exceeding maxCount into a concise +N more badge.",
      preview: (
        <Stack gap={3} className="dl-demo-frame dl-demo-frame--sm">
          <MultiSelect
            options={sampleTeams}
            defaultValue={["eng", "design"]}
            placeholder="Select teams..."
          />
          <MultiSelect
            options={sampleTeams}
            defaultValue={["eng", "pm", "design", "security"]}
            maxCount={2}
            placeholder="Compact chips (+N more)"
          />
        </Stack>
      ),
      codeSnippet: `<MultiSelect
  options={options}
  defaultValue={["eng", "pm", "design", "security"]}
  maxCount={2}
/>`,
    },
    {
      id: "disabled",
      title: "Disabled State",
      description:
        "Locks the multi-select input and prevents dropdown interaction.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--sm">
          <MultiSelect
            disabled
            options={sampleTeams}
            defaultValue={["eng"]}
            placeholder="Disabled multi-select"
          />
        </div>
      ),
      codeSnippet: `<MultiSelect disabled options={options} defaultValue={["eng"]} />`,
    },
  ];

  const propsList: PropDefinition[] = [
    {
      name: "options",
      type: "MultiSelectOption[]",
      default: "[]",
      description: "Array of selectable option items with label and value.",
    },
    {
      name: "value",
      type: "string[]",
      default: "—",
      description: "Controlled array of selected values.",
    },
    {
      name: "defaultValue",
      type: "string[]",
      default: "[]",
      description: "Initial selected array of values in uncontrolled mode.",
    },
    {
      name: "onChange",
      type: "(values: string[]) => void",
      default: "—",
      description: "Callback invoked when selection changes.",
    },
    {
      name: "placeholder",
      type: "string",
      default: '"Select options..."',
      description: "Trigger placeholder text when nothing is selected.",
    },
    {
      name: "maxCount",
      type: "number",
      default: "3",
      description: "Maximum tag chips displayed before collapsing to +N more.",
    },
    {
      name: "showActions",
      type: "boolean",
      default: "true",
      description: "Whether to render Select All and Clear action buttons.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Whether the component is non-interactive.",
    },
  ];

  const cssClasses: CssClassDefinition[] = [
    {
      name: ".dl-multi-select-trigger",
      description: "Trigger box showing tags and open chevron.",
    },
    {
      name: ".dl-multi-select-chip",
      description: "Selected tag chip badge with remove button.",
    },
    {
      name: ".dl-multi-select-item",
      description: "Selectable item in dropdown list with check indicator.",
    },
  ];

  return (
    <ComponentView
      title="Multi Select"
      description="Select component supporting multi-option selection, chip badges with dismissal, live text search, and Select All convenience actions."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
