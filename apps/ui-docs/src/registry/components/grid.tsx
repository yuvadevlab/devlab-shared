"use client";

import React from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
} from "@/components/component-view";

export default function GridDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "three-col",
      title: "Three Column Metric Grid",
      description: "Responsive 3-column layout driven by native CSS Grid.",
      preview: (
        <Grid cols={3} gap="4" className="dl-demo-frame">
          <Card>
            <CardHeader>
              <CardTitle>
                <span className="dl-demo-caption">Requests</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="dl-demo-title">1.4M</span>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                <span className="dl-demo-caption">Latency</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="dl-demo-title">12ms</span>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                <span className="dl-demo-caption">Uptime</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="dl-demo-title">99.99%</span>
            </CardContent>
          </Card>
        </Grid>
      ),
      codeSnippet: `<Grid cols={3} gap="4">
  <Card><CardHeader><CardTitle>Requests</CardTitle></CardHeader><CardContent>1.4M</CardContent></Card>
  <Card><CardHeader><CardTitle>Latency</CardTitle></CardHeader><CardContent>12ms</CardContent></Card>
  <Card><CardHeader><CardTitle>Uptime</CardTitle></CardHeader><CardContent>99.99%</CardContent></Card>
</Grid>`,
    },
  ];

  const propsList = [
    {
      name: "cols",
      type: "1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | string",
      default: "1",
      description:
        "Uniform column count, or auto-fit minItemWidth (e.g. '280px').",
    },
    {
      name: "gap",
      type: '"0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "10"',
      default: '"4"',
      description: "Spacing gap token mapped to --space-* variables.",
    },
    {
      name: "inline",
      type: "boolean",
      default: "false",
      description: "Whether to render as inline-grid.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-grid",
      description: "Base CSS grid container in @layer dl-layout.",
    },
  ];

  return (
    <ComponentView
      title="Grid"
      description="Responsive 2D grid layout supporting uniform columns and auto-fit column widths in @layer dl-layout."
      category="Layout"
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
