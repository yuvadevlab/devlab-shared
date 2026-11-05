"use client";

import { Bubble, MessageScroller } from "@yuva-devlab/ui";
import { ComponentView } from "@/components/component-view";
import { createExampleSource } from "@/lib/create-example-source";

/**
 * Interactive documentation for MessageScroller.
 */
export default function MessageScrollerDoc() {
  return (
    <ComponentView
      title="Message Scroller"
      category="AI Elements"
      description="Live message region that follows new turns when the reader is already near the bottom."
      preview={
        <MessageScroller className="dl-story-w-lg">
          <Bubble role="user">Summarize this pull request.</Bubble>
          <Bubble role="assistant">
            It updates the auth flow and adds tests.
          </Bubble>
        </MessageScroller>
      }
      codeSnippet={createExampleSource({
        imports: ["Bubble", "MessageScroller"],
        body: `<MessageScroller className="mx-auto max-w-lg">
  <Bubble role="user">Summarize this pull request.</Bubble>
  <Bubble role="assistant">
    It updates the auth flow, adds session validation, and includes regression
    tests for expired tokens.
  </Bubble>
</MessageScroller>`,
      })}
      propsList={[
        {
          name: "children",
          type: "ReactNode",
          default: "—",
          description: "Message elements.",
        },
        {
          name: "onScroll",
          type: "React.UIEventHandler<HTMLDivElement>",
          default: "—",
          description: "Optional scroll event callback.",
        },
      ]}
    />
  );
}
