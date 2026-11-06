"use client";

import React from "react";
import { Checkpoint } from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
  type PropDefinition,
  type CssClassDefinition,
} from "@/components/component-view";

export default function CheckpointDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "basic",
      title: "Restore Checkpoint",
      description:
        "Milestone divider allowing users to rewind conversation to this point.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md">
          <Checkpoint
            label="Checkpoint: Before schema migration"
            onRestore={() => alert("Restored checkpoint")}
          />
        </div>
      ),
      codeSnippet: `<Checkpoint
  label="Checkpoint: Before schema migration"
  onRestore={() => handleRestore()}
/>`,
    },
    {
      id: "info",
      title: "Informational Milestone",
      description:
        "Visual indicator for configuration or model changes in conversation flow.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md">
          <Checkpoint label="Switched model to Claude 3.5 Sonnet (v2)" />
        </div>
      ),
      codeSnippet: `<Checkpoint label="Switched model to Claude 3.5 Sonnet" />`,
    },
  ];

  const propsList: PropDefinition[] = [
    {
      name: "label",
      type: "ReactNode",
      default: '"Checkpoint"',
      description: "Text or node rendered inside the checkpoint capsule.",
    },
    {
      name: "onRestore",
      type: "() => void",
      default: "—",
      description: "Callback invoked when Restore button is pressed.",
    },
    {
      name: "restoreLabel",
      type: "string",
      default: '"Restore"',
      description: "Label for the interactive restore trigger button.",
    },
  ];

  const cssClasses: CssClassDefinition[] = [
    {
      name: ".dl-checkpoint",
      description: "Divider line spanning the chat thread.",
    },
    {
      name: ".dl-checkpoint__content",
      description: "Capsule container in center of divider.",
    },
    {
      name: ".dl-checkpoint__restore-btn",
      description: "Restore button trigger.",
    },
  ];

  return (
    <ComponentView
      title="Checkpoint"
      description="Divider marker indicating a significant milestone in conversational history with optional one-click restore capabilities."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
