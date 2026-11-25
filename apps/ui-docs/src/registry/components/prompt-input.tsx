"use client";

import React, { useState } from "react";
import { PromptInput, Badge, Stack, Text } from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
  type PropDefinition,
  type CssClassDefinition,
} from "@/components/component-view";

const INTERACTIVE_CODE = `import { useState } from "react";
import { PromptInput, Stack, Text, type PromptInputAttachmentItem } from "@yuva-devlab/ui";

export function PromptInputDemo() {
  const [status, setStatus] = useState("");

  const handleSubmit = (
    value: string,
    files: PromptInputAttachmentItem[],
  ) => {
    setStatus(
      \`Submitted "\${value}" with \${files.length} attachment(s)\`,
    );
  };

  return (
    <Stack gap={3}>
      <PromptInput
        placeholder="Ask anything or attach files..."
        onSubmit={handleSubmit}
      />
      {status && <Text variant="caption">{status}</Text>}
    </Stack>
  );
}`;

const STREAMING_CODE = `import { PromptInput, Badge } from "@yuva-devlab/ui";

export function StreamingPromptInputDemo() {
  return (
    <PromptInput
      defaultValue="Analyze current database query performance"
      isGenerating
      onStop={() => console.info("Stopped")}
      modelSelector={<Badge variant="outline">Gemini 2.5 Pro</Badge>}
    />
  );
}`;

export default function PromptInputDocPage() {
  const [submitted, setSubmitted] = useState<string>("");

  const variants: ComponentVariant[] = [
    {
      id: "default",
      title: "Interactive Prompt Bar",
      description:
        "Auto-expanding textarea with hidden native file picker trigger, attachment chips, and Enter submission.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--lg">
          <Stack gap={3}>
            <PromptInput
              placeholder="Ask anything or request code edits..."
              onSubmit={(val, files) => {
                setSubmitted(
                  `Submitted: "${val}" (${files.length} attachment${files.length === 1 ? "" : "s"})`,
                );
              }}
            />
            {submitted && <Text variant="caption">{submitted}</Text>}
          </Stack>
        </div>
      ),
      codeSnippet: INTERACTIVE_CODE,
    },
    {
      id: "with-model",
      title: "With Model Badge & Generating State",
      description:
        "Displays active model pill and square stop control during response streaming.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--lg">
          <PromptInput
            defaultValue="Analyze current database query performance"
            isGenerating
            onStop={() => setSubmitted("Generation stopped")}
            modelSelector={<Badge variant="outline">Claude 3.5 Sonnet</Badge>}
          />
        </div>
      ),
      codeSnippet: STREAMING_CODE,
    },
  ];

  const propsList: PropDefinition[] = [
    {
      name: "placeholder",
      type: "string",
      default: '"Ask anything or describe a task..."',
      description: "Placeholder text inside the auto-sizing textarea.",
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
      name: "modelSelector",
      type: "React.ReactNode",
      default: "—",
      description: "Optional footer slot for a model picker or badge.",
    },
    {
      name: "maxAttachments",
      type: "number",
      default: "5",
      description: "Maximum number of attached files allowed.",
    },
  ];

  const cssClasses: CssClassDefinition[] = [
    {
      name: ".dl-prompt-input",
      description: "Outer elevated composer container with focus ring.",
    },
    {
      name: ".dl-prompt-input__toolbar",
      description:
        "Bottom toolbar aligning attachment trigger and send/stop button.",
    },
  ];

  return (
    <ComponentView
      title="Prompt Input"
      description="Conversational composition box featuring auto-expanding textarea, multi-file attachment chips, model slot, and send/stop states."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
