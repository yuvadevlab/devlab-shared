"use client";

import React, { useState } from "react";
import { Checkbox } from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
} from "../../../components/component-view";

export default function CheckboxDocPage() {
  const [basicChecked, setBasicChecked] = useState<boolean>(true);
  const [sub1, setSub1] = useState(true);
  const [sub2, setSub2] = useState(false);

  // Indeterminate calculation
  const allChecked = sub1 && sub2;
  const isIndeterminate = (sub1 || sub2) && !allChecked;

  const variants: ComponentVariant[] = [
    {
      id: "basic",
      title: "Basic Checkbox with Label",
      description:
        "AntD-inspired binary checkbox with accessible focus ring and primary fill on check.",
      preview: (
        <div className="flex items-center gap-3">
          <Checkbox
            id="require-approval"
            checked={basicChecked}
            onCheckedChange={(val) => setBasicChecked(Boolean(val))}
          />
          <label
            htmlFor="require-approval"
            className="text-foreground text-sm font-semibold cursor-pointer"
          >
            Require Human Approval for Destructive Steps
          </label>
        </div>
      ),
      codeSnippet: `<div className="flex items-center gap-2.5">
  <Checkbox id="approval" checked={checked} onCheckedChange={setChecked} />
  <label htmlFor="approval">Require Human Approval</label>
</div>`,
    },
    {
      id: "indeterminate",
      title: "Indeterminate / Partial Selection",
      description:
        "Tri-state parent checkbox reflecting mixed child states (AntD Checkbox.Group pattern).",
      preview: (
        <div className="space-y-3 p-4 border border-border rounded-xl bg-card w-full max-w-sm">
          <div className="flex items-center gap-2.5 border-b border-border pb-2.5">
            <Checkbox
              id="select-all"
              checked={
                allChecked ? true : isIndeterminate ? "indeterminate" : false
              }
              onCheckedChange={(val) => {
                const target = Boolean(val);
                setSub1(target);
                setSub2(target);
              }}
            />
            <label
              htmlFor="select-all"
              className="text-xs font-bold text-foreground cursor-pointer"
            >
              Select All Cluster Policies
            </label>
          </div>
          <div className="pl-6 space-y-2">
            <div className="flex items-center gap-2">
              <Checkbox
                id="sub1"
                checked={sub1}
                onCheckedChange={(v) => setSub1(Boolean(v))}
              />
              <label
                htmlFor="sub1"
                className="text-xs text-muted-foreground cursor-pointer"
              >
                Strict TLS 1.3 Encryption
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="sub2"
                checked={sub2}
                onCheckedChange={(v) => setSub2(Boolean(v))}
              />
              <label
                htmlFor="sub2"
                className="text-xs text-muted-foreground cursor-pointer"
              >
                Automatic Token Revocation
              </label>
            </div>
          </div>
        </div>
      ),
      codeSnippet: `<Checkbox
  checked={allChecked ? true : isIndeterminate ? "indeterminate" : false}
  onCheckedChange={handleToggleAll}
/>`,
    },
    {
      id: "disabled",
      title: "Disabled States",
      description:
        "Non-interactive disabled checkbox states showing checked and unchecked variations.",
      preview: (
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Checkbox disabled defaultChecked id="dis-1" />
            <label htmlFor="dis-1" className="text-xs text-muted-foreground">
              Checked Disabled
            </label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox disabled id="dis-2" />
            <label htmlFor="dis-2" className="text-xs text-muted-foreground">
              Unchecked Disabled
            </label>
          </div>
        </div>
      ),
      codeSnippet: `<Checkbox disabled defaultChecked />
<Checkbox disabled />`,
    },
  ];

  const propsList = [
    {
      name: "checked",
      type: "boolean | 'indeterminate'",
      default: "undefined",
      description: "Controlled checked or indeterminate state.",
    },
    {
      name: "onCheckedChange",
      type: "(checked: boolean | 'indeterminate') => void",
      default: "undefined",
      description: "Callback fired when checked state toggles.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Disables user interaction.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-checkbox",
      description: "Square checkbox box with focus ring and border styling.",
    },
    {
      name: ".dl-checkbox[data-state='checked']",
      description: "Active state with var(--primary) fill and check indicator.",
    },
  ];

  return (
    <ComponentView
      title="Checkbox"
      description="Accessible binary selection checkbox control supporting checked, unchecked, and indeterminate states. Showcasing basic checkboxes, parent indeterminate groups, and disabled states."
      category="Data Entry"
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
