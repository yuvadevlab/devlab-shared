import React from "react";
import { ShieldCheck, Palette, Terminal } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  Grid,
} from "@yuva-devlab/ui";

/**
 * Server component highlighting the core architectural pillars of DevLab UI.
 */
export function HomePillars() {
  return (
    <Grid columns={3} gap={4} as="section" className="dl-pillars-grid">
      <Card>
        <CardHeader>
          <div className="dl-pillar-icon-box">
            <ShieldCheck className="dl-pillar-icon" />
          </div>
          <CardTitle className="dl-pillar-title">
            Zero Style Collisions
          </CardTitle>
          <CardDescription className="dl-pillar-desc">
            Every component uses isolated, pure CSS classes mapped inside{" "}
            <code className="dl-pillar-code">@layer dl-components</code> so
            consuming apps never experience outline or flex collapses.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <div className="dl-pillar-icon-box">
            <Palette className="dl-pillar-icon" />
          </div>
          <CardTitle className="dl-pillar-title">Multi-Brand & OKLCH</CardTitle>
          <CardDescription className="dl-pillar-desc">
            Switch seamlessly between OrchestrAI (Robotic Blue/Teal), FinAI
            (Emerald Forest), DevLab Portal, DevLab Logs, and VitalAI with
            perceptual OKLCH color palettes and dark mode support.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <div className="dl-pillar-icon-box">
            <Terminal className="dl-pillar-icon" />
          </div>
          <CardTitle className="dl-pillar-title">Rich IntelliSense</CardTitle>
          <CardDescription className="dl-pillar-desc">
            Every prop, variant, and component has comprehensive JSDoc
            annotations and copyable code examples directly in VS Code hover
            dialogs.
          </CardDescription>
        </CardHeader>
      </Card>
    </Grid>
  );
}
