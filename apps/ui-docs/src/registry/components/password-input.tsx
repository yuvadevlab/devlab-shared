"use client";

import React from "react";
import { PasswordInput, Stack } from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
  type PropDefinition,
  type CssClassDefinition,
} from "@/components/component-view";

export default function PasswordInputDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "basic",
      title: "Basic Password Field",
      description:
        "Input equipped with an accessible eye toggle button to reveal or hide sensitive credentials.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--sm">
          <PasswordInput placeholder="Enter your credentials..." />
        </div>
      ),
      codeSnippet: `<PasswordInput placeholder="Enter your credentials..." />`,
    },
    {
      id: "states",
      title: "States & Customizations",
      description:
        "Supports defaultValue, disabled states, and optional suppression of the toggle trigger.",
      preview: (
        <Stack gap={3} className="dl-demo-frame dl-demo-frame--sm">
          <PasswordInput
            defaultValue="super-secret-password-123"
            placeholder="Filled password"
          />
          <PasswordInput
            disabled
            defaultValue="locked-credentials"
            placeholder="Disabled"
          />
          <PasswordInput
            showToggle={false}
            placeholder="Password without eye toggle"
          />
        </Stack>
      ),
      codeSnippet: `<PasswordInput defaultValue="super-secret-password-123" />
<PasswordInput disabled defaultValue="locked-credentials" />
<PasswordInput showToggle={false} placeholder="Without eye button" />`,
    },
  ];

  const propsList: PropDefinition[] = [
    {
      name: "showToggle",
      type: "boolean",
      default: "true",
      description:
        "Controls whether the interactive eye reveal toggle is rendered in the end slot.",
    },
    {
      name: "startIcon",
      type: "ReactNode",
      default: "—",
      description:
        "Leading decorative or functional icon rendered before the input value.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Whether the password input field is non-interactive.",
    },
  ];

  const cssClasses: CssClassDefinition[] = [
    {
      name: ".dl-password-input",
      description: "Root styling container for password field.",
    },
    {
      name: ".dl-password-toggle-btn",
      description: "Accessible toggle button managing show/hide state.",
    },
  ];

  return (
    <ComponentView
      title="Password Input"
      description="Enterprise password input control featuring built-in show/hide eye toggle, accessible ARIA states, and token styling."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
