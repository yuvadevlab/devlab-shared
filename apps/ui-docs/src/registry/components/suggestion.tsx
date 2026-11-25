"use client";

import React, { useState } from "react";
import { Suggestion, SuggestionList, Stack, Text } from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
  type PropDefinition,
  type CssClassDefinition,
} from "@/components/component-view";

const LIST_CODE = `import { useState } from "react";
import { Suggestion, SuggestionList, Stack, Text } from "@yuva-devlab/ui";

const PROMPTS = [
  "How do I add SSO via Okta?",
  "Generate TypeScript types for audit_logs",
  "Run security benchmark on PostgreSQL",
];

export function SuggestionPillsDemo() {
  const [selected, setSelected] = useState("");

  return (
    <Stack gap={3}>
      <SuggestionList>
        {PROMPTS.map((prompt) => (
          <Suggestion
            key={prompt}
            label={prompt}
            onClick={() => setSelected(prompt)}
          />
        ))}
      </SuggestionList>
      {selected && <Text variant="caption">Selected: {selected}</Text>}
    </Stack>
  );
}`;

const SCROLL_CODE = `import { Suggestion, SuggestionList } from "@yuva-devlab/ui";

export function SuggestionScrollDemo() {
  return (
    <SuggestionList layout="scroll">
      <Suggestion label="Fix linting errors" description="4 files affected" />
      <Suggestion label="Optimize Dockerfile" description="Reduce image size" />
    </SuggestionList>
  );
}`;

export default function SuggestionDocPage() {
  const [selected, setSelected] = useState<string>("");

  const variants: ComponentVariant[] = [
    {
      id: "list",
      title: "Interactive Suggestion Pills",
      description:
        "Clickable follow-up prompt chips with crisp 12px spark icons.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--lg">
          <Stack gap={3}>
            <SuggestionList>
              <Suggestion
                label="How do I add SSO via Okta?"
                onClick={() => setSelected("How do I add SSO via Okta?")}
              />
              <Suggestion
                label="Generate TypeScript types for audit_logs"
                onClick={() =>
                  setSelected("Generate TypeScript types for audit_logs")
                }
              />
              <Suggestion
                label="Run security benchmark on PostgreSQL"
                onClick={() =>
                  setSelected("Run security benchmark on PostgreSQL")
                }
              />
            </SuggestionList>
            {selected && <Text variant="caption">Selected: {selected}</Text>}
          </Stack>
        </div>
      ),
      codeSnippet: LIST_CODE,
    },
    {
      id: "with-descriptions",
      title: "Scrollable Chips with Subtext",
      description:
        "Horizontal scrolling suggestions with secondary context hints.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--lg">
          <SuggestionList layout="scroll">
            <Suggestion
              label="Fix linting errors"
              description="4 files affected"
              onClick={() => setSelected("Fix linting errors")}
            />
            <Suggestion
              label="Optimize Dockerfile"
              description="Reduce image size"
              onClick={() => setSelected("Optimize Dockerfile")}
            />
          </SuggestionList>
        </div>
      ),
      codeSnippet: SCROLL_CODE,
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
      description: "Optional secondary hint displayed beside the label.",
    },
    {
      name: "layout",
      type: '"wrap" | "scroll"',
      default: '"wrap"',
      description: "Wrapping flex grid or horizontal scroll strip.",
    },
  ];

  const cssClasses: CssClassDefinition[] = [
    { name: ".dl-suggestion-list", description: "Flex container for pills." },
    {
      name: ".dl-suggestion",
      description: "Interactive suggestion chip button.",
    },
    {
      name: ".dl-suggestion__icon",
      description: "Leading icon slot sized at 12px.",
    },
  ];

  return (
    <ComponentView
      title="Suggestion"
      description="Clickable starter prompt pills and follow-up inquiry chips."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
