"use client";

import React from "react";
import { Stack } from "@yuva-devlab/ui";
import { useTheme } from "@/components/theme-provider";

/**
 * Quick installation and setup code snippet blocks synced with the active brand selector.
 */
export function HomeQuickstart() {
  const { brand } = useTheme();

  return (
    <Stack gap={4} as="section" className="dl-quickstart">
      <h2 className="dl-quickstart-title">Quick Installation</h2>

      <div className="dl-quickstart-block">
        <div className="dl-quickstart-block__header">1. Install Packages</div>
        <code className="dl-quickstart-block__code">
          pnpm add @yuva-devlab/ui @yuva-devlab/tokens
        </code>
      </div>

      <div className="dl-quickstart-block">
        <div className="dl-quickstart-block__header">
          2. Import Pure Platform CSS in globals.css
        </div>
        <pre className="dl-quickstart-block__pre">
          {`@layer dl-reset, dl-tokens, dl-components, dl-layout, dl-utilities, dl-app;

@import "@yuva-devlab/tokens/preset.css";
@import "@yuva-devlab/tokens/themes/${brand}.css";
@import "@yuva-devlab/ui/styles.css";`}
        </pre>
      </div>
    </Stack>
  );
}
