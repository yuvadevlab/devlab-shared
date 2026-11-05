"use client";

import React, { useState } from "react";
import { ModelSelector, PromptInput } from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
  type PropDefinition,
  type CssClassDefinition,
} from "@/components/component-view";
import { createExampleSource } from "@/lib/create-example-source";

export default function PromptInputDocPage() {
  const [submitted, setSubmitted] = useState<string>("");
  const [model, setModel] = useState("claude-3-5-sonnet");

  const variants: ComponentVariant[] = [
    {
      id: "default",
      title: "Interactive Prompt Bar",
      description:
        "Theme-aware prompt composer built from the shared Textarea, Input, Attachment, and Button primitives.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md">
          <div className="w-full max-w-xl space-y-3">
            <PromptInput
              placeholder="Ask anything or request code edits..."
              onSubmit={(val, files) => {
                setSubmitted(
                  `Submitted: "${val}" (${files.length} attachment${files.length === 1 ? "" : "s"})`,
                );
              }}
            />
            {submitted && (
              <p className="text-xs text-muted-foreground">{submitted}</p>
            )}
          </div>
        </div>
      ),
      codeSnippet: createExampleSource({
        imports: ["PromptInput"],
        body: `<PromptInput
  placeholder="Ask anything or request code edits..."
  onSubmit={(value, files) => {
    console.log("Prompt:", value, "Attachments:", files);
  }}
/>`,
      }),
    },
    {
      id: "with-model",
      title: "With Attachments, Model Selector & Generating State",
      description:
        "Compose file attachments, a compact model selector, and the stop action.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md">
          <div className="w-full max-w-xl">
            <PromptInput
              defaultValue="Review the attached query plan and schema."
              isGenerating
              onStop={() => alert("Generation cancelled")}
              attachments={[
                { id: "plan", name: "query-plan.json" },
                { id: "schema", name: "schema.prisma" },
              ]}
              modelSelector={
                <ModelSelector
                  size="sm"
                  value={model}
                  onValueChange={setModel}
                />
              }
            />
          </div>
        </div>
      ),
      codeSnippet: createExampleSource({
        externalImports: ['import { useState } from "react";'],
        imports: ["ModelSelector", "PromptInput"],
        setup: `const [model, setModel] = useState("claude-3-5-sonnet");`,
        body: `<PromptInput
  defaultValue="Review the attached query plan and schema."
  attachments={[
    { id: "plan", name: "query-plan.json" },
    { id: "schema", name: "schema.prisma" },
  ]}
  modelSelector={
    <ModelSelector size="sm" value={model} onValueChange={setModel} />
  }
  isGenerating
  onStop={() => console.log("Stop generation")}
/>`,
      }),
    },
  ];

  const propsList: PropDefinition[] = [
    {
      name: "placeholder",
      type: "string",
      default: '"Send a message or prompt..."',
      description: "Placeholder text inside textarea.",
    },
    {
      name: "isGenerating",
      type: "boolean",
      default: "false",
      description: "Switches submit icon to a square stop button.",
    },
    {
      name: "onSubmit",
      type: "(value: string, attachments: PromptInputAttachmentItem[]) => void",
      default: "—",
      description: "Triggered on Enter (without Shift) or submit button click.",
    },
    {
      name: "onStop",
      type: "() => void",
      default: "—",
      description: "Triggered when clicking the stop button while generating.",
    },
    {
      name: "modelSelector",
      type: "React.ReactNode",
      default: "—",
      description: "Optional slot at bottom-left for model picker or badge.",
    },
    {
      name: "maxAttachments",
      type: "number",
      default: "5",
      description: "Maximum number of files that can be attached.",
    },
  ];

  const cssClasses: CssClassDefinition[] = [
    {
      name: ".dl-prompt-input",
      description: "Outer rounded card container for the prompt box.",
    },
    {
      name: ".dl-prompt-input__textarea",
      description: "Token-styled, content-sizing Textarea primitive.",
    },
    {
      name: ".dl-prompt-input__toolbar",
      description: "Bottom action bar housing attachment and submit controls.",
    },
    {
      name: ".dl-prompt-input__btn",
      description:
        "Button primitive styled for attachment, send, and stop actions.",
    },
  ];

  return (
    <ComponentView
      title="Prompt Input"
      description="Enterprise chat input field designed for conversational AI agents, featuring auto-resizing textareas, multi-file attachments, model badges, and responsive action triggers."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
