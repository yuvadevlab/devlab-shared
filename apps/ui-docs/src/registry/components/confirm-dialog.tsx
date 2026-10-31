"use client";

import React, { useState } from "react";
import { ConfirmDialog, Button } from "@yuva-devlab/ui";
import { ComponentView, ComponentVariant } from "@/components/component-view";

/**
 * Documentation page for ConfirmDialog component showcasing standard and destructive variants.
 */
export default function ConfirmDialogDocPage() {
  const [openDestructive, setOpenDestructive] = useState(false);
  const [openStandard, setOpenStandard] = useState(false);
  const [status, setStatus] = useState("");

  const variants: ComponentVariant[] = [
    {
      id: "destructive",
      title: "Destructive Confirmation",
      description:
        "High-stakes confirmation dialog styled with destructive action buttons.",
      preview: (
        <div className="flex flex-col items-center gap-3">
          <Button variant="outline" onClick={() => setOpenDestructive(true)}>
            Revoke Cluster Credentials
          </Button>

          <ConfirmDialog
            open={openDestructive}
            onOpenChange={setOpenDestructive}
            title="Revoke Cluster Credentials?"
            description="All ongoing worker traces and live socket streams will be immediately severed."
            confirmText="Revoke Credentials"
            destructive={true}
            onConfirm={() => {
              setStatus(
                "Credentials revoked at " + new Date().toLocaleTimeString(),
              );
              setOpenDestructive(false);
            }}
          />

          {status && (
            <p className="text-xs text-muted-foreground font-mono">{status}</p>
          )}
        </div>
      ),
      codeSnippet: `<ConfirmDialog
  open={open}
  onOpenChange={setOpen}
  title="Revoke Cluster Credentials?"
  description="All ongoing worker traces will be immediately severed."
  confirmText="Revoke Credentials"
  destructive={true}
  onConfirm={handleRevoke}
/>`,
    },
    {
      id: "standard",
      title: "Standard Confirmation",
      description:
        "Lightweight confirmation for non-destructive workflow events such as schema syncs.",
      preview: (
        <div className="flex flex-col items-center gap-3">
          <Button variant="default" onClick={() => setOpenStandard(true)}>
            Synchronize Vector Database
          </Button>

          <ConfirmDialog
            open={openStandard}
            onOpenChange={setOpenStandard}
            title="Synchronize Vector Index?"
            description="This will index 1,420 updated documents across the active workspace."
            confirmText="Start Indexing"
            destructive={false}
            onConfirm={() => {
              setStatus(
                "Indexing dispatched at " + new Date().toLocaleTimeString(),
              );
              setOpenStandard(false);
            }}
          />
        </div>
      ),
      codeSnippet: `<ConfirmDialog
  open={open}
  onOpenChange={setOpen}
  title="Synchronize Vector Index?"
  description="This will index 1,420 updated documents."
  confirmText="Start Indexing"
  destructive={false}
  onConfirm={handleSync}
/>`,
    },
  ];

  const propsList = [
    {
      name: "open",
      type: "boolean",
      default: "false",
      description: "Controls the modal visibility.",
    },
    {
      name: "title",
      type: "string",
      default: "undefined",
      description: "Header title string explaining the required confirmation.",
    },
    {
      name: "description",
      type: "string",
      default: "undefined",
      description: "Explanatory consequences text.",
    },
    {
      name: "confirmText",
      type: "string",
      default: '"Confirm"',
      description: "Text rendered inside the primary confirm button.",
    },
    {
      name: "cancelText",
      type: "string",
      default: '"Cancel"',
      description: "Text rendered inside the secondary cancel button.",
    },
    {
      name: "destructive",
      type: "boolean",
      default: "false",
      description: "Renders the confirm button in red destructive styling.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-dialog-content",
      description: "Container surface for the confirm dialog box.",
    },
  ];

  return (
    <ComponentView
      title="Confirm Dialog"
      description="A streamlined confirmation modal for binary decisions, similar to Ant Design's Modal.confirm."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
