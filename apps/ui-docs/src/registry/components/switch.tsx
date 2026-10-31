"use client";

import React, { useState } from "react";
import { Switch, Flex, Stack } from "@yuva-devlab/ui";
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
        <Flex align="center" gap={3}>
          <Switch
            checked={basicChecked}
            onCheckedChange={setBasicChecked}
            aria-label="Toggle setting"
          />
          <span className="dl-demo-code dl-demo-desc">
            {basicChecked ? "Active (On)" : "Disabled (Off)"}
          </span>
        </Flex>
      ),
      codeSnippet: `<Switch checked={checked} onCheckedChange={setChecked} />`,
    },
    {
      id: "with-label",
      title: "With Label & Description",
      description:
        "Form setting card combining the switch with bold label and subtitle.",
      preview: (
        <Flex
          align="center"
          justify="between"
          className="dl-demo-frame dl-demo-frame--sm dl-demo-box"
        >
          <Stack gap={1}>
            <label htmlFor="feature-toggle" className="dl-demo-heading">
              Automatic Failover Healing
            </label>
            <p className="dl-demo-desc">
              Reroutes agent tasks upon node timeout.
            </p>
          </Stack>
          <Switch
            id="feature-toggle"
            checked={featureChecked}
            onCheckedChange={setFeatureChecked}
          />
        </Flex>
      ),
      codeSnippet: `<Flex align="center" justify="between">
  <Stack gap={1}>
    <label htmlFor="feature">Automatic Failover</label>
    <p>Reroutes agent tasks upon node timeout.</p>
  </Stack>
  <Switch id="feature" checked={checked} onCheckedChange={setChecked} />
</Flex>`,
    },
    {
      id: "disabled",
      title: "Disabled States",
      description:
        "Non-interactive switch states with 50% opacity and disabled cursor.",
      preview: (
        <Flex align="center" gap={6}>
          <Flex align="center" gap={2}>
            <Switch disabled defaultChecked />
            <span className="dl-demo-desc">Checked Disabled</span>
          </Flex>
          <Flex align="center" gap={2}>
            <Switch disabled />
            <span className="dl-demo-desc">Unchecked Disabled</span>
          </Flex>
        </Flex>
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
