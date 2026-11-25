"use client";

import React, { useState } from "react";
import { ModelSelector, Stack, Text } from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
  type PropDefinition,
  type CssClassDefinition,
} from "@/components/component-view";

const PICKER_CODE = `import { useState } from "react";
import { ModelSelector, Stack, Text } from "@yuva-devlab/ui";

export function ModelSelectorDemo() {
  const [model, setModel] = useState("claude-3-5-sonnet");

  return (
    <Stack gap={3}>
      <ModelSelector value={model} onValueChange={setModel} />
      <Text variant="caption">Selected model: {model}</Text>
    </Stack>
  );
}`;

const COMPACT_CODE = `import { ModelSelector } from "@yuva-devlab/ui";

export function CompactModelSelectorDemo() {
  return <ModelSelector size="sm" defaultValue="gemini-2-0-flash" />;
}`;

export default function ModelSelectorDocPage() {
  const [model, setModel] = useState("claude-3-5-sonnet");

  const variants: ComponentVariant[] = [
    {
      id: "default",
      title: "Model Picker Dropdown",
      description:
        "Select LLM models with provider metadata, capability tags, and search filtering.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--sm">
          <Stack gap={3}>
            <ModelSelector value={model} onValueChange={setModel} />
            <Text variant="caption">Selected: {model}</Text>
          </Stack>
        </div>
      ),
      codeSnippet: PICKER_CODE,
    },
    {
      id: "small",
      title: "Compact Variant (Prompt Input)",
      description:
        "Reduced padding size designed for footer embed slots inside chat prompt bars.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--sm">
          <ModelSelector size="sm" defaultValue="gemini-2-0-flash" />
        </div>
      ),
      codeSnippet: COMPACT_CODE,
    },
  ];

  const propsList: PropDefinition[] = [
    {
      name: "models",
      type: "AIModel[]",
      default: "DEFAULT_AI_MODELS",
      description:
        "Array of model options with id, name, provider, tags, and description.",
    },
    {
      name: "value",
      type: "string",
      default: "—",
      description: "Controlled selected model ID.",
    },
    {
      name: "size",
      type: '"sm" | "md"',
      default: '"md"',
      description: "Trigger button sizing variation.",
    },
  ];

  const cssClasses: CssClassDefinition[] = [
    {
      name: ".dl-model-selector",
      description: "Relative wrapper container for trigger and dropdown.",
    },
    {
      name: ".dl-model-selector__trigger",
      description: "Clickable trigger pill showing model name and chevron.",
    },
  ];

  return (
    <ComponentView
      title="Model Selector"
      description="Dropdown picker for selecting LLMs and agent models with capability tags and search filtering."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
