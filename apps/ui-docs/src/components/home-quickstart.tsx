import React from "react";
import { Stack } from "@yuva-devlab/ui";

/**
 * Server component rendering the quick installation and setup code snippet blocks.
 */
export function HomeQuickstart() {
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
          2. Import Platform CSS in globals.css
        </div>
        <pre className="dl-quickstart-block__pre">
          {`@import "@yuva-devlab/tokens/preset.css";
@import "@yuva-devlab/tokens/themes/orchestrai.css";
@import "@yuva-devlab/ui/styles.css";`}
        </pre>
      </div>
    </Stack>
  );
}
