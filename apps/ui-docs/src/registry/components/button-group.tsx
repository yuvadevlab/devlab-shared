"use client";

import { Button, ButtonGroup } from "@yuva-devlab/ui";
import { ComponentView } from "@/components/component-view";

/**
 * Interactive documentation for ButtonGroup.
 */
export default function ButtonGroupDoc() {
  return (
    <ComponentView
      title="Button Group"
      category="General"
      description="Groups related controls with connected borders and rounded outer corners."
      preview={
        <ButtonGroup>
          <Button variant="outline">Previous</Button>
          <Button variant="outline">Next</Button>
        </ButtonGroup>
      }
      codeSnippet={
        '<ButtonGroup><Button variant="outline">Previous</Button><Button variant="outline">Next</Button></ButtonGroup>'
      }
      propsList={[
        {
          name: "orientation",
          type: '"horizontal" | "vertical"',
          default: '"horizontal"',
          description: "Layout direction for the controls.",
        },
        {
          name: "children",
          type: "ReactNode",
          default: "—",
          description: "Related interactive controls.",
        },
      ]}
    />
  );
}
