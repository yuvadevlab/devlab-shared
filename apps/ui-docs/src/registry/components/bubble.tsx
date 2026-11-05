"use client";

import { Bubble } from "@yuva-devlab/ui";
import { ComponentView } from "@/components/component-view";
import { createExampleSource } from "@/lib/create-example-source";

/**
 * Interactive documentation for Bubble.
 */
export default function BubbleDoc() {
  return (
    <ComponentView
      title="Bubble"
      category="AI Elements"
      description="Role-aware message surface for user, assistant, and system turns."
      preview={
        <div className="dl-story-w-md space-y-3">
          <Bubble role="user">Why did the deployment fail?</Bubble>
          <Bubble role="assistant">
            The build failed because the environment variable is missing.
          </Bubble>
        </div>
      }
      codeSnippet={createExampleSource({
        imports: ["Bubble"],
        body: `<div className="mx-auto flex max-w-md flex-col gap-3">
  <Bubble role="user">Why did the deployment fail?</Bubble>
  <Bubble role="assistant">
    The build failed because the environment variable is missing.
  </Bubble>
</div>`,
      })}
      propsList={[
        {
          name: "role",
          type: '"user" | "assistant" | "system"',
          default: '"assistant"',
          description: "Selects alignment and role styling.",
        },
        {
          name: "children",
          type: "ReactNode",
          default: "—",
          description: "Message content.",
        },
      ]}
    />
  );
}
