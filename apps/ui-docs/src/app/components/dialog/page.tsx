"use client";

import React, { useState } from "react";
import { Terminal, AlertTriangle, CheckCircle } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  ConfirmDialog,
  Button,
  Input,
} from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
} from "../../../components/component-view";

export default function DialogDocPage() {
  const [standardOpen, setStandardOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [destructiveOpen, setDestructiveOpen] = useState(false);

  const variants: ComponentVariant[] = [
    {
      id: "standard",
      title: "Standard Form Dialog",
      description:
        "Full modal dialog with header, custom form body, and footer actions.",
      preview: (
        <div>
          <Dialog open={standardOpen} onOpenChange={setStandardOpen}>
            <DialogTrigger asChild>
              <Button variant="default" className="gap-2">
                <Terminal className="size-4" />
                <span>Launch Execution Modal</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Configure Execution Run</DialogTitle>
                <DialogDescription>
                  Set runtime parameters before deploying agent to cluster.
                </DialogDescription>
              </DialogHeader>
              <DialogBody className="space-y-3 py-2">
                <div className="space-y-1">
                  <label className="text-foreground text-xs font-semibold">
                    Cluster Identifier
                  </label>
                  <Input defaultValue="us-east4-prod-a" />
                </div>
                <div className="space-y-1">
                  <label className="text-foreground text-xs font-semibold">
                    Max Step Budget
                  </label>
                  <Input type="number" defaultValue="25" />
                </div>
              </DialogBody>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setStandardOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={() => setStandardOpen(false)}>
                  Deploy Run
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      ),
      codeSnippet: `<Dialog>
  <DialogTrigger asChild><Button>Open Dialog</Button></DialogTrigger>
  <DialogContent className="max-w-md">
    <DialogHeader>
      <DialogTitle>Configure Run</DialogTitle>
      <DialogDescription>Set parameters for execution.</DialogDescription>
    </DialogHeader>
    <DialogBody><Input placeholder="Cluster ID" /></DialogBody>
    <DialogFooter><Button>Submit</Button></DialogFooter>
  </DialogContent>
</Dialog>`,
    },
    {
      id: "confirm",
      title: "Confirmation Dialog (AntD Modal.confirm)",
      description:
        "Pre-composed confirmation dialog for verifying non-destructive actions.",
      preview: (
        <div>
          <Button
            variant="secondary"
            className="gap-2"
            onClick={() => setConfirmOpen(true)}
          >
            <CheckCircle className="size-4" />
            <span>Open Confirmation Modal</span>
          </Button>

          <ConfirmDialog
            open={confirmOpen}
            onOpenChange={setConfirmOpen}
            title="Publish Agent Pipeline?"
            description="This will deploy version 2.4 to the public sandbox registry."
            confirmText="Publish Release"
            cancelText="Keep Draft"
            onConfirm={() => setConfirmOpen(false)}
          />
        </div>
      ),
      codeSnippet: `import { ConfirmDialog } from "@yuva-devlab/ui";

<ConfirmDialog
  open={open}
  onOpenChange={setOpen}
  title="Publish Agent Pipeline?"
  description="This will deploy version 2.4 to the public sandbox registry."
  confirmText="Publish Release"
  onConfirm={handlePublish}
/>`,
    },
    {
      id: "destructive",
      title: "Destructive Alert Confirmation",
      description:
        "Confirmation dialog for critical, irreversible actions (renders red confirm button).",
      preview: (
        <div>
          <Button
            variant="destructive"
            className="gap-2"
            onClick={() => setDestructiveOpen(true)}
          >
            <AlertTriangle className="size-4" />
            <span>Delete Database Workspace</span>
          </Button>

          <ConfirmDialog
            open={destructiveOpen}
            onOpenChange={setDestructiveOpen}
            title="Delete Database Workspace?"
            description="This operation cannot be undone. All active sessions and tables will be permanently deleted."
            confirmText="Delete Permanently"
            destructive
            onConfirm={() => setDestructiveOpen(false)}
          />
        </div>
      ),
      codeSnippet: `<ConfirmDialog
  open={open}
  onOpenChange={setOpen}
  title="Delete Database Workspace?"
  description="This operation cannot be undone."
  confirmText="Delete Permanently"
  destructive
  onConfirm={handleDelete}
/>`,
    },
  ];

  const propsList = [
    {
      name: "open",
      type: "boolean",
      default: "undefined",
      description: "Controlled open state of the modal dialog.",
    },
    {
      name: "onOpenChange",
      type: "(open: boolean) => void",
      default: "undefined",
      description: "Callback invoked when dialog open state changes.",
    },
    {
      name: "ConfirmDialog",
      type: "React.Component",
      default: "—",
      description:
        "Pre-composed confirmation modal with title, description, and confirm actions.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-dialog-overlay",
      description:
        "Backdrop overlay with glassmorphism blur and smooth opacity.",
    },
    {
      name: ".dl-dialog-content",
      description: "Modal card surface with centering, elevation, and padding.",
    },
    {
      name: ".dl-dialog__header",
      description: "Header area with title and description.",
    },
    {
      name: ".dl-dialog__footer",
      description: "Footer action row aligned to the right.",
    },
  ];

  return (
    <ComponentView
      title="Dialog"
      description="Accessible modal dialog window built on Radix UI Dialog. Showcasing standard form modals, confirmation dialogs (AntD Modal.confirm), and destructive action alerts."
      category="Feedback"
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
