"use client";

import React, { useState } from "react";
import { Suggestion, SuggestionList } from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
  type PropDefinition,
  type CssClassDefinition,
} from "@/components/component-view";

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
          <div
            style={{
              width: "100%",
              maxWidth: "36rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
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
            {selected && (
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "var(--muted-foreground)",
                }}
              >
                Selected query:{" "}
                <span style={{ color: "var(--foreground)", fontWeight: 500 }}>
                  {selected}
                </span>
              </p>
            )}
          </div>
        </div>
      ),
      codeSnippet: `<SuggestionList>
  <Suggestion
    label="How do I add SSO via Okta?"
    onClick={() => setPrompt("How do I add SSO via Okta?")}
  />
  <Suggestion
    label="Generate TypeScript types"
    onClick={() => setPrompt("Generate TypeScript types")}
  />
</SuggestionList>`,
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
      codeSnippet: `<SuggestionList layout="scroll">
  <Suggestion
    label="Fix linting errors"
    description="4 files affected"
  />
</SuggestionList>`,
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
