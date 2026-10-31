"use client";

import React, { useState } from "react";
import { Switch } from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
} from "@/components/component-view";

export default function SwitchDocPage() {
  const [basicChecked, setBasicChecked] = useState(true);
  const [featureChecked, setFeatureChecked] = useState(false);

  const variants: ComponentVariant[] = [
    {
      id: "basic",
      title: "Basic Toggle Switch",
      description:
        "AntD-inspired binary switch component with smooth slide transition.",
      preview: (
        <div className="flex items-center gap-3">
          <Switch
            checked={basicChecked}
            onCheckedChange={setBasicChecked}
            aria-label="Toggle setting"
          />
          <span className="text-xs font-mono text-muted-foreground">
            {basicChecked ? "Active (On)" : "Disabled (Off)"}
          </span>
        </div>
      ),
      codeSnippet: `<Switch checked={checked} onCheckedChange={setChecked} />`,
    },
    {
      id: "with-label",
      title: "With Label & Description",
      description:
        "Form setting card combining the switch with bold label and subtitle.",
      preview: (
        <div className="w-full max-w-sm p-4 border border-border rounded-xl bg-card flex items-center justify-between">
          <div className="space-y-0.5">
            <label
              htmlFor="feature-toggle"
              className="text-xs font-semibold text-foreground cursor-pointer"
            >
              Automatic Failover Healing
            </label>
            <p className="text-[11px] text-muted-foreground">
              Reroutes agent tasks upon node timeout.
            </p>
          </div>
          <Switch
            id="feature-toggle"
            checked={featureChecked}
            onCheckedChange={setFeatureChecked}
          />
        </div>
      ),
      codeSnippet: `<div className="flex items-center justify-between">
  <div>
    <label htmlFor="feature">Automatic Failover</label>
    <p>Reroutes agent tasks upon node timeout.</p>
  </div>
  <Switch id="feature" checked={checked} onCheckedChange={setChecked} />
</div>`,
    },
    {
      id: "disabled",
      title: "Disabled States",
      description:
        "Non-interactive switch states with 50% opacity and disabled cursor.",
      preview: (
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Switch disabled defaultChecked />
            <span className="text-xs text-muted-foreground">
              Checked Disabled
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Switch disabled />
            <span className="text-xs text-muted-foreground">
              Unchecked Disabled
            </span>
          </div>
        </div>
      ),
      codeSnippet: `<Switch disabled defaultChecked />
<Switch disabled />`,
    },
  ];

  const propsList = [
    {
      name: "checked",
      type: "boolean",
      default: "undefined",
      description: "Controlled checked state of the switch toggle.",
    },
    {
      name: "onCheckedChange",
      type: "(checked: boolean) => void",
      default: "undefined",
      description: "Callback invoked when checked state transitions.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Disables interaction and reduces opacity.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-switch",
      description:
        "Pill track container with background transition and focus ring.",
    },
    {
      name: ".dl-switch__thumb",
      description: "Circular slider thumb translating across the pill track.",
    },
  ];

  return (
    <ComponentView
      title="Switch"
      description="Interactive toggle switch allowing users to alternate between binary on/off states. Showcasing basic switches, labeled settings, and disabled states."
      category="Data Entry"
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
