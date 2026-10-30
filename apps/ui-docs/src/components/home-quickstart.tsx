import React from "react";

/**
 * Server component rendering the quick installation and setup code snippet blocks.
 */
export function HomeQuickstart() {
  return (
    <section className="space-y-4">
      <h2 className="text-foreground text-xl font-bold tracking-tight">
        Quick Installation
      </h2>
      <div className="border-border bg-muted/40 relative rounded-lg border p-4 font-mono text-xs">
        <div className="text-muted-foreground select-none pb-2 font-sans font-semibold uppercase tracking-wider text-[10px]">
          1. Install Packages
        </div>
        <code className="text-foreground">
          pnpm add @yuva-devlab/ui @yuva-devlab/tokens
        </code>
      </div>

      <div className="border-border bg-muted/40 relative rounded-lg border p-4 font-mono text-xs">
        <div className="text-muted-foreground select-none pb-2 font-sans font-semibold uppercase tracking-wider text-[10px]">
          2. Import Styles in globals.css
        </div>
        <pre className="text-foreground whitespace-pre m-0">
          {`@import "tailwindcss";
@import "@yuva-devlab/tokens/preset.css";
@import "@yuva-devlab/tokens/themes/orchestrai.css";
@import "@yuva-devlab/ui/styles.css";`}
        </pre>
      </div>
    </section>
  );
}
