"use client";

import React from "react";
import { CopyButton, Input } from "@yuva-devlab/ui";
import {
  ComponentView,
  ComponentVariant,
} from "../../../components/component-view";

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
        <div className="flex flex-col items-center gap-3 w-full max-w-sm">
          <div className="flex items-center gap-2 w-full">
            <Input readOnly value={apiKey} className="font-mono text-xs" />
            <CopyButton
              textToCopy={apiKey}
              label="Copy Key"
              copiedLabel="Copied!"
            />
          </div>
        </div>
      ),
      codeSnippet: `<div className="flex items-center gap-2">
  <Input readOnly value={apiKey} className="font-mono text-xs" />
  <CopyButton textToCopy={apiKey} label="Copy Key" copiedLabel="Copied!" />
</div>`,
    },
    {
      id: "terminal",
      title: "CLI Command Copy Action",
      description:
        "Embedded terminal style command box with an instant copy action button.",
      preview: (
        <div className="w-full max-w-sm flex items-center justify-between p-2.5 rounded-lg border border-border bg-muted/40 font-mono text-xs">
          <span className="text-foreground">$ {installCmd}</span>
          <CopyButton textToCopy={installCmd} label="Copy" copiedLabel="Done" />
        </div>
      ),
      codeSnippet: `<div className="flex items-center justify-between p-2.5 rounded-lg border bg-muted/40 font-mono text-xs">
  <span>$ pnpm add @yuva-devlab/ui</span>
  <CopyButton textToCopy="pnpm add @yuva-devlab/ui" label="Copy" copiedLabel="Done" />
</div>`,
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
