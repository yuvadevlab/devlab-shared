"use client";

import { Reasoning } from "@yuva-devlab/ui";
import { ComponentView } from "@/components/component-view";
import { createExampleSource } from "@/lib/create-example-source";

/**
 * Interactive documentation for Reasoning.
 */
export default function ReasoningDoc() {
  return (
    <ComponentView
      title="Reasoning"
      category="AI Elements"
      description="Collapsible disclosure for model reasoning and progress details."
      preview={
        <Reasoning duration="2.4s">
          Checking the request and comparing the relevant code paths.
        </Reasoning>
      }
      codeSnippet={createExampleSource({
        imports: ["Reasoning"],
        body: `<Reasoning title="Reasoning" duration="2.4s" open>
  <p>Checking the request and comparing the relevant code paths.</p>
  <p>Verifying the expected behavior before responding.</p>
</Reasoning>`,
      })}
      propsList={[
        {
          name: "title",
          type: "string",
          default: '"Reasoning"',
          description: "Disclosure heading.",
        },
        {
          name: "duration",
          type: "string",
          default: "—",
          description: "Optional elapsed time.",
        },
        {
          name: "open",
          type: "boolean",
          default: "—",
          description: "Whether details are expanded initially.",
        },
      ]}
    />
  );
}
