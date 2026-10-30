"use client";

import React, { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
  SearchableSelect,
  type SearchableSelectOption,
} from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
} from "../../../components/component-view";

const AI_OPTIONS: SearchableSelectOption[] = [
  { label: "Gemini 2.5 Pro", value: "gemini-2.5-pro", group: "Google" },
  { label: "Gemini 2.5 Flash", value: "gemini-2.5-flash", group: "Google" },
  {
    label: "Claude 3.7 Sonnet",
    value: "claude-3-7-sonnet",
    group: "Anthropic",
  },
  { label: "Claude 3.5 Haiku", value: "claude-3-5-haiku", group: "Anthropic" },
  { label: "GPT-4o", value: "gpt-4o", group: "OpenAI" },
  { label: "DeepSeek R1", value: "deepseek-r1", group: "DeepSeek" },
];

export default function SelectDocPage() {
  const [basicVal, setBasicVal] = useState("gemini-pro");
  const [searchVal, setSearchVal] = useState("claude-3-7-sonnet");
  const [groupVal, setGroupVal] = useState("prod");

  const variants: ComponentVariant[] = [
    {
      id: "basic",
      title: "Basic Select",
      description:
        "Standard single-choice dropdown selection with clear placeholder and focus states.",
      preview: (
        <div className="w-full max-w-xs">
          <Select value={basicVal} onValueChange={setBasicVal}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select model..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gemini-pro">Gemini 2.5 Pro</SelectItem>
              <SelectItem value="gemini-flash">Gemini 2.5 Flash</SelectItem>
              <SelectItem value="claude-sonnet">Claude 3.7 Sonnet</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ),
      codeSnippet: `<Select value={value} onValueChange={setValue}>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Select model..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="gemini-pro">Gemini 2.5 Pro</SelectItem>
    <SelectItem value="gemini-flash">Gemini 2.5 Flash</SelectItem>
    <SelectItem value="claude-sonnet">Claude 3.7 Sonnet</SelectItem>
  </SelectContent>
</Select>`,
    },
    {
      id: "searchable",
      title: "Searchable Select (Fuzzy Filter)",
      description:
        "AntD-inspired select variant featuring a search filter input, real-time matching, and empty state.",
      preview: (
        <div className="w-full max-w-xs">
          <SearchableSelect
            options={AI_OPTIONS}
            value={searchVal}
            onChange={setSearchVal}
            placeholder="Search AI model..."
            searchPlaceholder="Type to filter..."
          />
        </div>
      ),
      codeSnippet: `import { SearchableSelect } from "@yuva-devlab/ui";

<SearchableSelect
  options={[
    { label: "Gemini 2.5 Pro", value: "gemini-2.5-pro", group: "Google" },
    { label: "Claude 3.7 Sonnet", value: "claude-3-7-sonnet", group: "Anthropic" },
    { label: "GPT-4o", value: "gpt-4o", group: "OpenAI" },
  ]}
  value={selectedModel}
  onChange={setSelectedModel}
  placeholder="Search AI model..."
  searchPlaceholder="Type to filter..."
/>`,
    },
    {
      id: "grouped",
      title: "Grouped Options with Separators",
      description:
        "Organize long option lists into distinct logical categories using SelectGroup and SelectLabel.",
      preview: (
        <div className="w-full max-w-xs">
          <Select value={groupVal} onValueChange={setGroupVal}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose environment..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Production Environments</SelectLabel>
                <SelectItem value="prod">Production US-East</SelectItem>
                <SelectItem value="prod-eu">Production EU-Central</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Pre-Production</SelectLabel>
                <SelectItem value="staging">Staging QA</SelectItem>
                <SelectItem value="dev">Development Sandbox</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      ),
      codeSnippet: `<Select defaultValue="prod">
  <SelectTrigger>
    <SelectValue placeholder="Environment..." />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Production</SelectLabel>
      <SelectItem value="prod">Production US-East</SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectGroup>
      <SelectLabel>Pre-Production</SelectLabel>
      <SelectItem value="dev">Development Sandbox</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`,
    },
    {
      id: "disabled",
      title: "Disabled State",
      description:
        "Disabled trigger button prevents flyout interaction and shows muted styling.",
      preview: (
        <div className="w-full max-w-xs">
          <Select disabled defaultValue="locked">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Unavailable" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="locked">Production Locked</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ),
      codeSnippet: `<Select disabled defaultValue="locked">
  <SelectTrigger>
    <SelectValue placeholder="Unavailable" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="locked">Production Locked</SelectItem>
  </SelectContent>
</Select>`,
    },
  ];

  const propsList = [
    {
      name: "value",
      type: "string",
      default: "undefined",
      description: "Controlled value of the selected item.",
    },
    {
      name: "onValueChange",
      type: "(value: string) => void",
      default: "undefined",
      description: "Callback fired when the selection changes.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Disables opening the select dropdown.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-select-trigger",
      description: "Trigger button with right chevron and focus ring styling.",
    },
    {
      name: ".dl-select-content",
      description:
        "Floating popover card with animations and shadow elevation.",
    },
    {
      name: ".dl-select-item",
      description:
        "Selectable option row with active check indicator and hover highlight.",
    },
    {
      name: ".dl-searchable-select-trigger",
      description: "Searchable select trigger button with placeholder styling.",
    },
  ];

  return (
    <ComponentView
      title="Select"
      description="Accessible custom dropdown selection menu supporting basic, searchable, grouped, and disabled variants."
      category="Data Entry"
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
