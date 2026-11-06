"use client";

import React, { useState } from "react";
import { ModelSelector } from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
  type PropDefinition,
  type CssClassDefinition,
} from "@/components/component-view";

export default function ModelSelectorDocPage() {
  const [model, setModel] = useState("claude-3-5-sonnet");

  const variants: ComponentVariant[] = [
    {
      id: "default",
      title: "Model Picker Dropdown",
      description:
        "Select LLM models with provider logos, context window badges, and search filtering.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md">
          <div className="w-full max-w-sm space-y-3">
            <ModelSelector value={model} onValueChange={setModel} />
            <p className="text-xs text-muted-foreground">
              Selected:{" "}
              <span className="font-mono text-foreground">{model}</span>
            </p>
          </div>
        </div>
      ),
      codeSnippet: `<ModelSelector
  value={model}
  onValueChange={(id) => setModel(id)}
/>`,
    },
    {
      id: "small",
      title: "Compact Variant (Prompt Input)",
      description:
        "Reduced padding size designed for footer embed slots inside chat prompt bars.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md">
          <div className="w-full max-w-sm">
            <ModelSelector size="sm" defaultValue="gemini-2-0-flash" />
          </div>
        </div>
      ),
      codeSnippet: `<ModelSelector size="sm" defaultValue="gemini-2-0-flash" />`,
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
      name: "defaultValue",
      type: "string",
      default: "models[0]?.id",
      description: "Initial model ID when uncontrolled.",
    },
    {
      name: "size",
      type: '"sm" | "md"',
      default: '"md"',
      description: "Button sizing variation.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Whether selection is disabled.",
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
    {
      name: ".dl-model-selector__content",
      description: "Floating popup list with search filter and model options.",
    },
    {
      name: ".dl-model-selector__tag",
      description: "Pill badge displaying capability tags.",
    },
  ];

  return (
    <ComponentView
      title="Model Selector"
      description="Dropdown picker for selecting LLMs and agent models with provider branding, capability tags, context window metadata, and search filtering."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
