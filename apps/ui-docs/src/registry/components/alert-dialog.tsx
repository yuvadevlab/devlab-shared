"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  Button,
} from "@yuva-devlab/ui";
import { ComponentView, ComponentVariant } from "@/components/component-view";

/**
 * Documentation page for AlertDialog component with AntD-inspired variant showcase.
 */
export default function AlertDialogDocPage() {
  const [destructiveDone, setDestructiveDone] = useState(false);
  const [publishDone, setPublishDone] = useState(false);

  const variants: ComponentVariant[] = [
    {
      id: "destructive",
      title: "Destructive Action",
      description:
        "Requires explicit user confirmation before executing irreversible or high-impact operations.",
      preview: (
        <div className="flex flex-col items-center gap-3">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Deprovision Sandbox Cluster</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. All ephemeral worker nodes,
                  vector memory, and active sessions will be permanently purged.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Keep Active</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => setDestructiveDone(true)}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Confirm Deprovision
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          {destructiveDone && (
            <p className="text-xs text-destructive font-mono">
              Cluster deprovisioning dispatched.
            </p>
          )}
        </div>
      ),
      codeSnippet: `<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Deprovision Sandbox Cluster</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. All ephemeral worker nodes will be permanently purged.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Keep Active</AlertDialogCancel>
      <AlertDialogAction onClick={() => deprovision()}>Confirm Deprovision</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
    },
    {
      id: "standard",
      title: "Standard Confirmation",
      description:
        "Modal prompt to verify user intent for non-destructive operations like publishing drafts.",
      preview: (
        <div className="flex flex-col items-center gap-3">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="default">Publish Model to Production</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Publish AI Model Version?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will route 100% of live incoming user queries to model
                  revision v2.4-flash.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Back to Review</AlertDialogCancel>
                <AlertDialogAction onClick={() => setPublishDone(true)}>
                  Proceed with Release
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          {publishDone && (
            <p className="text-xs text-emerald-500 font-mono">
              Model release initiated successfully.
            </p>
          )}
        </div>
      ),
      codeSnippet: `<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button>Publish Model</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Publish AI Model Version?</AlertDialogTitle>
      <AlertDialogDescription>
        This will route 100% of live incoming user queries to v2.4-flash.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handlePublish}>Proceed</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
    },
  ];

  const propsList = [
    {
      name: "AlertDialogContent",
      type: "React.Component",
      default: "—",
      description:
        "Modal window card rendering title, description, and action buttons.",
    },
    {
      name: "AlertDialogAction",
      type: "React.Component",
      default: "—",
      description:
        "Primary confirmation button that automatically closes the dialog when triggered.",
    },
    {
      name: "AlertDialogCancel",
      type: "React.Component",
      default: "—",
      description:
        "Cancellation button that dismisses the prompt without executing actions.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-alert-dialog-overlay",
      description: "Backdrop blur overlay behind the dialog prompt.",
    },
    {
      name: ".dl-alert-dialog-content",
      description: "Centered elevated modal card surface.",
    },
  ];

  return (
    <ComponentView
      title="Alert Dialog"
      description="A modal dialog that interrupts the user with important content and expects a response before proceeding."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
