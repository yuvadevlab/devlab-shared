"use client";

import React, { useState } from "react";
import { SearchableSelect, Stack } from "@yuva-devlab/ui";
import { ComponentView, ComponentVariant } from "@/components/component-view";

const mockModels = [
  {
    label: "Claude 3.5 Sonnet",
    value: "claude-3-5-sonnet",
    group: "Anthropic",
  },
  { label: "Claude 3.5 Haiku", value: "claude-3-5-haiku", group: "Anthropic" },
  { label: "GPT-4o", value: "gpt-4o", group: "OpenAI" },
  { label: "GPT-4o Mini", value: "gpt-4o-mini", group: "OpenAI" },
  { label: "Gemini 1.5 Pro", value: "gemini-1-5-pro", group: "Google" },
  { label: "Gemini 1.5 Flash", value: "gemini-1-5-flash", group: "Google" },
];

const mockEnvironments = [
  { label: "Production (us-east)", value: "prod-us-east" },
  { label: "Staging (eu-central)", value: "staging-eu-central" },
  { label: "Development Local", value: "dev-local" },
];

/**
 * Documentation page for SearchableSelect component showcasing fuzzy filtering and grouping.
 */
export default function SearchableSelectDocPage() {
  const [model, setModel] = useState("claude-3-5-sonnet");
  const [env, setEnv] = useState("prod-us-east");

  const variants: ComponentVariant[] = [
    {
      id: "grouped",
      title: "Grouped Options with Search",
      description:
        "Fuzzy search with categorized option groups, similar to Ant Design's Select with showSearch and optgroup.",
      preview: (
        <Stack
          align="center"
          gap={4}
          className="dl-demo-frame dl-demo-frame--xs"
        >
          <SearchableSelect
            options={mockModels}
            value={model}
            onChange={setModel}
            placeholder="Choose Model..."
            searchPlaceholder="Type to filter..."
          />
          <div className="dl-demo-code">
            Selected: <strong>{model}</strong>
          </div>
        </Stack>
      ),
      codeSnippet: `const models = [
  { label: "Claude 3.5 Sonnet", value: "claude-3-5-sonnet", group: "Anthropic" },
  { label: "GPT-4o", value: "gpt-4o", group: "OpenAI" },
  { label: "Gemini 1.5 Pro", value: "gemini-1-5-pro", group: "Google" },
];

<SearchableSelect
  options={models}
  value={model}
  onChange={setModel}
  placeholder="Select model..."
/>`,
    },
    {
      id: "flat",
      title: "Flat Environment Selector",
      description:
        "Clean single-level searchable select for configuration targets.",
      preview: (
        <Stack
          align="center"
          gap={4}
          className="dl-demo-frame dl-demo-frame--xs"
        >
          <SearchableSelect
            options={mockEnvironments}
            value={env}
            onChange={setEnv}
            placeholder="Choose Deployment..."
          />
          <div className="dl-demo-code">
            Target: <strong>{env}</strong>
          </div>
        </Stack>
      ),
      codeSnippet: `<SearchableSelect
  options={[
    { label: "Production", value: "prod" },
    { label: "Staging", value: "staging" },
  ]}
  value={env}
  onChange={setEnv}
/>`,
    },
  ];

  const propsList = [
    {
      name: "options",
      type: "Array<{ label: string; value: string; group?: string }>",
      default: "[]",
      description: "Array of selectable option objects.",
    },
    {
      name: "value",
      type: "string",
      default: "undefined",
      description: "Currently selected option value.",
    },
    {
      name: "onChange",
      type: "(value: string) => void",
      default: "undefined",
      description: "Handler fired when a new option is chosen.",
    },
    {
      name: "searchPlaceholder",
      type: "string",
      default: '"Search options..."',
      description: "Placeholder text rendered in the search filter input.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-searchable-select",
      description: "Root popover container for searchable dropdown.",
    },
  ];

  return (
    <ComponentView
      title="Searchable Select"
      description="Select dropdown augmented with an instant search filter input and option grouping, inspired by Ant Design's Select (showSearch)."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
