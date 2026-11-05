"use client";

import { Input, InputGroup, InputGroupAddon } from "@yuva-devlab/ui";
import { ComponentView } from "@/components/component-view";

/**
 * Interactive documentation for InputGroup.
 */
export default function InputGroupDoc() {
  return (
    <ComponentView
      title="Input Group"
      category="Data Entry"
      description="Joins an input with inline text, icons, or other adornments."
      preview={
        <InputGroup className="dl-story-w-sm">
          <InputGroupAddon>https://</InputGroupAddon>
          <Input aria-label="Website" placeholder="example.com" />
        </InputGroup>
      }
      codeSnippet={
        '<InputGroup><InputGroupAddon>https://</InputGroupAddon><Input placeholder="example.com" /></InputGroup>'
      }
      propsList={[
        {
          name: "InputGroup",
          type: "HTMLAttributes<HTMLDivElement>",
          default: "—",
          description: "Shared wrapper for the control and addons.",
        },
        {
          name: "InputGroupAddon",
          type: "HTMLAttributes<HTMLSpanElement>",
          default: "—",
          description: "Leading or trailing supporting content.",
        },
      ]}
    />
  );
}
