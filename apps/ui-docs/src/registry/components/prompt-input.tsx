"use client";

import React, { useState } from "react";
import { PromptInput, Badge } from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
  type PropDefinition,
  type CssClassDefinition,
} from "@/components/component-view";

export default function PromptInputDocPage() {
  const [submitted, setSubmitted] = useState<string>("");

  const variants: ComponentVariant[] = [
    {
      id: "default",
      title: "Interactive Prompt Bar",
      description:
        "Auto-expanding input with file attachment capabilities, Enter submission, and Stop generation action.",
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
      codeSnippet: `<PromptInput
  placeholder="Ask anything or request code edits..."
  onSubmit={(val, files) => handlePrompt(val, files)}
/>`,
    },
    {
      id: "with-model",
      title: "With Model Badge & Generating State",
      description:
        "Display active model selection pill and square stop button during generation.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md">
          <div className="w-full max-w-xl">
            <PromptInput
              defaultValue="Analyze current database query performance"
              isGenerating={true}
              onStop={() => alert("Generation cancelled")}
              modelSelector={
                <Badge variant="outline" className="text-xs">
                  Claude 3.5 Sonnet
                </Badge>
              }
            />
          </div>
        </div>
      ),
      codeSnippet: `<PromptInput
  isGenerating={true}
  onStop={() => abortController.abort()}
  modelSelector={<Badge variant="outline">Claude 3.5 Sonnet</Badge>}
/>`,
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
      description: "Auto-resizing clean textarea.",
    },
    {
      name: ".dl-prompt-input__footer",
      description: "Bottom action bar housing attachments and submit button.",
    },
    {
      name: ".dl-prompt-input__submit-btn",
      description: "Circular submit or stop icon button.",
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
