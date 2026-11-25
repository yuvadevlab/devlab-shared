"use client";

import React, { useState } from "react";
import { Checkpoint, Stack, Text } from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
  type PropDefinition,
  type CssClassDefinition,
} from "@/components/component-view";

const RESTORE_CODE = `import { useState } from "react";
import { Checkpoint, Stack, Text } from "@yuva-devlab/ui";

export function RestoreCheckpointDemo() {
  const [restored, setRestored] = useState(false);

  return (
    <Stack gap={2}>
      <Checkpoint
        label="Checkpoint: Before schema migration"
        onRestore={() => setRestored(true)}
      />
      {restored && <Text variant="caption">Conversation restored.</Text>}
    </Stack>
  );
}`;

const INFO_CODE = `import { Checkpoint } from "@yuva-devlab/ui";

export function InfoMilestoneDemo() {
  return <Checkpoint label="Switched model to Claude 3.5 Sonnet (v2)" />;
}`;

export default function CheckpointDocPage() {
  const [restored, setRestored] = useState(false);

  const variants: ComponentVariant[] = [
    {
      id: "basic",
      title: "Restore Checkpoint",
      description:
        "Milestone divider allowing users to rewind conversation to this point.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md">
          <Stack gap={2}>
            <Checkpoint
              label="Checkpoint: Before schema migration"
              onRestore={() => setRestored(true)}
            />
            {restored && <Text variant="caption">Checkpoint restored.</Text>}
          </Stack>
        </div>
      ),
      codeSnippet: RESTORE_CODE,
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
      codeSnippet: INFO_CODE,
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
  ];

  return (
    <ComponentView
      title="Checkpoint"
      description="Divider marker indicating a significant milestone in conversational history with optional restore trigger."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
