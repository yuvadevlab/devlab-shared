import React from "react";
import { ShieldCheck, Palette, Terminal } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@yuva-devlab/ui";

/**
 * Server component highlighting the core architectural pillars of DevLab UI.
 */
export function HomePillars() {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <div className="bg-primary/10 text-primary mb-2 flex size-9 items-center justify-center rounded-lg">
            <ShieldCheck className="size-5" />
          </div>
          <CardTitle className="text-base">Zero Style Collisions</CardTitle>
          <CardDescription className="text-xs">
            Every component uses isolated, pure CSS classes mapped inside{" "}
            <code className="font-mono text-[11px]">@layer dl-components</code>{" "}
            so consuming apps never experience outline or flex collapses.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <div className="bg-primary/10 text-primary mb-2 flex size-9 items-center justify-center rounded-lg">
            <Palette className="size-5" />
          </div>
          <CardTitle className="text-base">Multi-Brand & OKLCH</CardTitle>
          <CardDescription className="text-xs">
            Switch seamlessly between OrchestrAI (Robotic Blue/Teal), FinAI
            (Emerald Forest), DevLab Portal, DevLab Logs, and VitalAI with
            perceptual OKLCH color palettes and dark mode support.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <div className="bg-primary/10 text-primary mb-2 flex size-9 items-center justify-center rounded-lg">
            <Terminal className="size-5" />
          </div>
          <CardTitle className="text-base">Rich IntelliSense</CardTitle>
          <CardDescription className="text-xs">
            Every prop, variant, and component has comprehensive JSDoc
            annotations and copyable code examples directly in VS Code hover
            dialogs.
          </CardDescription>
        </CardHeader>
      </Card>
    </section>
  );
}
