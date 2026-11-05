"use client";

import { Spinner } from "@yuva-devlab/ui";
import { ComponentView } from "@/components/component-view";

/**
 * Interactive documentation for Spinner.
 */
export default function SpinnerDoc() {
  return (
    <ComponentView
      title="Spinner"
      category="Data Display"
      description="Compact loading indicator with a screen-reader status label."
      preview={<Spinner label="Loading results" />}
      codeSnippet={'<Spinner label="Loading results" />'}
      propsList={[
        {
          name: "label",
          type: "string",
          default: '"Loading"',
          description: "Accessible loading message.",
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
