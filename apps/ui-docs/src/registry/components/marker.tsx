"use client";

import { Marker } from "@yuva-devlab/ui";
import { ComponentView } from "@/components/component-view";

/**
 * Interactive documentation for Marker.
 */
export default function MarkerDoc() {
  return (
    <ComponentView
      title="Marker"
      category="Data Display"
      description="Semantically highlights a short phrase using the current theme's accent color."
      preview={
        <p>
          Review the <Marker>breaking API change</Marker> before merging.
        </p>
      }
      codeSnippet={"<Marker>Important</Marker>"}
      propsList={[
        {
          name: "children",
          type: "ReactNode",
          default: "—",
          description: "Highlighted inline text.",
        },
        {
          name: "className",
          type: "string",
          default: "—",
          description: "Optional style extension.",
        },
      ]}
    />
  );
}
