"use client";

import React from "react";
import { CopyButton, Input, Flex, Stack } from "@yuva-devlab/ui";
import { ComponentView, ComponentVariant } from "@/components/component-view";

/**
 * Documentation page for CopyButton component showcasing labeled and compact triggers.
 */
export default function CopyButtonDocPage() {
  const apiKey = "dl_live_9a8f4c2e1b7d5e8a3f0c";
  const installCmd = "pnpm add @yuva-devlab/ui";

  const variants: ComponentVariant[] = [
    {
      id: "labeled",
      title: "With Label & Copied State",
      description:
        "Displays explicit label text alongside the clipboard icon, transitioning to feedback state on click.",
      preview: (
        <Stack
          align="center"
          gap={3}
          className="dl-demo-frame dl-demo-frame--sm"
        >
          <Flex align="center" gap={2} className="dl-demo-frame">
            <Input readOnly value={apiKey} className="dl-demo-code" />
            <CopyButton
              textToCopy={apiKey}
              label="Copy Key"
              copiedLabel="Copied!"
            />
          </Flex>
        </Stack>
      ),
      codeSnippet: `<Flex align="center" gap="2">
  <Input readOnly value={apiKey} className="dl-demo-code" />
  <CopyButton textToCopy={apiKey} label="Copy Key" copiedLabel="Copied!" />
</Flex>`,
    },
    {
      id: "terminal",
      title: "CLI Command Copy Action",
      description:
        "Embedded terminal style command box with an instant copy action button.",
      preview: (
        <Flex
          align="center"
          justify="between"
          className="dl-demo-frame dl-demo-frame--sm dl-demo-box--code"
        >
          <span>$ {installCmd}</span>
          <CopyButton textToCopy={installCmd} label="Copy" copiedLabel="Done" />
        </Flex>
      ),
      codeSnippet: `<Flex align="center" justify="between" className="dl-demo-box--code">
  <span>$ pnpm add @yuva-devlab/ui</span>
  <CopyButton textToCopy="pnpm add @yuva-devlab/ui" label="Copy" copiedLabel="Done" />
</Flex>`,
    },
  ];

  const propsList = [
    {
      name: "textToCopy",
      type: "string",
      default: "undefined",
      description: "Text content to write to the user's system clipboard.",
    },
    {
      name: "label",
      type: "string",
      default: '"Copy"',
      description: "Default idle label rendered next to the copy icon.",
    },
    {
      name: "copiedLabel",
      type: "string",
      default: '"Copied"',
      description: "Feedback label displayed after successful copy.",
    },
    {
      name: "resetTimeoutMs",
      type: "number",
      default: "2000",
      description: "Milliseconds to maintain the copied feedback state.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-copy-button",
      description:
        "Button styling with animated transitions between copy and check states.",
    },
  ];

  return (
    <ComponentView
      title="Copy Button"
      description="An interactive button for one-click copying to clipboard with smooth feedback animations, inspired by Ant Design's Typography.Paragraph copyable feature."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
