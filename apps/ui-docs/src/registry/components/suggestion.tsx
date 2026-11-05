"use client";

import React, { useState } from "react";
import { Suggestion, SuggestionList } from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
  type PropDefinition,
  type CssClassDefinition,
} from "@/components/component-view";
import { createExampleSource } from "@/lib/create-example-source";

export default function SuggestionDocPage() {
  const [selected, setSelected] = useState<string>("");

  const variants: ComponentVariant[] = [
    {
      id: "list",
      title: "Interactive Suggestion Pills",
      description:
        "Clickable follow-up prompt chips for quick actions, guiding user interactions.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md">
          <div className="w-full max-w-xl space-y-3">
            <SuggestionList>
              <Suggestion
                label="Explain the latest build failure"
                onClick={() => setSelected("Explain the latest build failure")}
              />
              <Suggestion
                label="Add a loading state to the dashboard"
                onClick={() =>
                  setSelected("Add a loading state to the dashboard")
                }
              />
              <Suggestion
                label="Summarize the recent changes"
                onClick={() => setSelected("Summarize the recent changes")}
              />
            </SuggestionList>
            {selected && (
              <p className="text-xs text-muted-foreground">
                Selected query:{" "}
                <span className="text-foreground font-medium">{selected}</span>
              </p>
            )}
          </div>
        </div>
      ),
      codeSnippet: createExampleSource({
        externalImports: ['import { useState } from "react";'],
        imports: ["Suggestion", "SuggestionList"],
        setup: `const [prompt, setPrompt] = useState("");`,
        body: `<div className="flex flex-col gap-3">
  <SuggestionList>
    <Suggestion
      label="Explain the latest build failure"
      onClick={() => setPrompt("Explain the latest build failure")}
    />
    <Suggestion
      label="Add a loading state to the dashboard"
      onClick={() => setPrompt("Add a loading state to the dashboard")}
    />
    <Suggestion
      label="Summarize the recent changes"
      onClick={() => setPrompt("Summarize the recent changes")}
    />
  </SuggestionList>
  {prompt && <p className="text-sm text-muted-foreground">Selected: {prompt}</p>}
</div>`,
      }),
    },
    {
      id: "with-descriptions",
      title: "With Subtext Descriptions",
      description:
        "Suggestions with secondary descriptions explaining outcome or source.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md">
          <div className="w-full max-w-xl">
            <SuggestionList layout="scroll">
              <Suggestion
                label="Fix linting errors"
                description="4 files affected"
                onClick={() => alert("Fix linting")}
              />
              <Suggestion
                label="Optimize Dockerfile"
                description="Reduce image size"
                onClick={() => alert("Optimize Dockerfile")}
              />
            </SuggestionList>
          </div>
        </div>
      ),
      codeSnippet: createExampleSource({
        imports: ["Suggestion", "SuggestionList"],
        body: `<SuggestionList layout="scroll">
  <Suggestion
    label="Fix linting errors"
    description="4 files affected"
  />
  <Suggestion
    label="Optimize Dockerfile"
    description="Reduce image size"
  />
</SuggestionList>`,
      }),
    },
  ];

  const propsList: PropDefinition[] = [
    {
      name: "label",
      type: "React.ReactNode",
      default: "—",
      description: "Primary suggestion prompt text.",
    },
    {
      name: "description",
      type: "string",
      default: "—",
      description:
        "Optional secondary context hint displayed alongside the label.",
    },
    {
      name: "icon",
      type: "React.ReactNode",
      default: "<Sparkles />",
      description: "Leading icon to display in the chip.",
    },
    {
      name: "layout",
      type: '"wrap" | "scroll"',
      default: '"wrap"',
      description: "Layout alignment on SuggestionList container.",
    },
  ];

  const cssClasses: CssClassDefinition[] = [
    {
      name: ".dl-suggestion",
      description: "Interactive pill button styling with hover state.",
    },
    {
      name: ".dl-suggestion__icon",
      description: "Leading icon container with muted color.",
    },
    {
      name: ".dl-suggestion-list",
      description: "Container row arranging suggestion chips.",
    },
  ];

  return (
    <ComponentView
      title="Suggestion"
      description="Quick-prompt action pills displayed after agent replies or on empty conversational canvases to prompt follow-up tasks."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
