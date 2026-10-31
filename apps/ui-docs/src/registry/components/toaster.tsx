"use client";

import React from "react";
import { toast, Button, Flex } from "@yuva-devlab/ui";
import { ComponentView, ComponentVariant } from "@/components/component-view";

/**
 * Documentation page for Toaster component showcasing status toast triggers and action notifications.
 */
export default function ToasterDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "types",
      title: "Notification Types",
      description:
        "Semantic toast notifications indicating success, warning, or error states.",
      preview: (
        <Flex wrap="wrap" align="center" justify="center" gap={2}>
          <Button
            size="sm"
            variant="default"
            onClick={() => toast("Autonomous workflow initialized.")}
          >
            Default
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() =>
              toast.success("Model checkpoint successfully saved to registry.")
            }
          >
            Success
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              toast.warning("High token consumption detected (85% quota).")
            }
          >
            Warning
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() =>
              toast.error("Execution error: Sandbox process timeout exceeded.")
            }
          >
            Error
          </Button>
        </Flex>
      ),
      codeSnippet: `// Trigger different semantic toasts:
toast("Workflow initialized.");
toast.success("Model checkpoint saved.");
toast.warning("High token consumption detected.");
toast.error("Process timeout exceeded.");`,
    },
    {
      id: "action",
      title: "Interactive Action Toast",
      description:
        "Toasts supporting inline interactive buttons for immediate retry or cancellation.",
      preview: (
        <Flex align="center" justify="center">
          <Button
            variant="outline"
            onClick={() =>
              toast("Agent deployment failed", {
                description: "Cluster nodepool unschedulable due to quota",
                action: {
                  label: "Retry",
                  onClick: () => toast.info("Retrying cluster deployment..."),
                },
              })
            }
          >
            Trigger Action Toast
          </Button>
        </Flex>
      ),
      codeSnippet: `toast("Agent deployment failed", {
  description: "Cluster nodepool unschedulable due to quota",
  action: {
    label: "Retry",
    onClick: () => toast.info("Retrying cluster deployment..."),
  },
});`,
    },
  ];

  const propsList = [
    {
      name: "toast(message, options)",
      type: "function",
      default: "—",
      description:
        "Imperative dispatch function to trigger floating feedback toasts.",
    },
    {
      name: "position",
      type: '"top-right" | "bottom-right" | ...',
      default: '"bottom-right"',
      description: "Screen anchor location for the toaster provider.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-toast",
      description: "Surface card for individual floating notifications.",
    },
  ];

  return (
    <ComponentView
      title="Toaster"
      description="Succinct, non-intrusive notification banners inspired by modern web interfaces and Ant Design's message / notification."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
