"use client";

import React, { useState } from "react";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageActions,
} from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
  type PropDefinition,
  type CssClassDefinition,
} from "@/components/component-view";
import { createExampleSource } from "@/lib/create-example-source";

export default function MessageDocPage() {
  const [feedback, setFeedback] = useState<string>("");

  const variants: ComponentVariant[] = [
    {
      id: "conversation",
      title: "Assistant & User Turn",
      description:
        "Standard conversational stream format with user query, assistant reply, and feedback actions.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md">
          <div className="w-full max-w-xl space-y-4">
            <Message role="user">
              <MessageAvatar role="user" />
              <div className="space-y-1">
                <div className="text-xs font-semibold text-muted-foreground">
                  You
                </div>
                <MessageContent>
                  Can you optimize our database queries to handle 10,000
                  requests per second?
                </MessageContent>
              </div>
            </Message>

            <Message role="assistant">
              <MessageAvatar role="assistant" />
              <div className="space-y-1">
                <div className="text-xs font-semibold text-muted-foreground">
                  DevLab Assistant
                </div>
                <MessageContent>
                  To sustain 10k RPS, I recommend adding a Redis caching layer
                  for read-heavy routes, implementing connection pooling via
                  PgBouncer, and batching index lookups.
                </MessageContent>
                <MessageActions
                  copyText="To sustain 10k RPS, I recommend adding a Redis caching layer..."
                  onRetry={() => alert("Regenerating response...")}
                  onThumbsUp={() => setFeedback("Liked")}
                  onThumbsDown={() => setFeedback("Disliked")}
                />
                {feedback && (
                  <span className="text-xs text-primary font-medium">
                    Feedback: {feedback}
                  </span>
                )}
              </div>
            </Message>
          </div>
        </div>
      ),
      codeSnippet: createExampleSource({
        imports: [
          "Message",
          "MessageActions",
          "MessageAvatar",
          "MessageContent",
        ],
        body: `<div className="flex flex-col gap-4">
  <Message role="user">
    <MessageAvatar role="user" fallback="JD" />
    <div className="space-y-1">
      <div className="text-xs font-medium text-muted-foreground">You</div>
      <MessageContent>Can you review this database migration?</MessageContent>
    </div>
  </Message>
  <Message role="assistant">
  <MessageAvatar role="assistant" />
  <div className="space-y-1">
    <div className="text-xs font-medium text-muted-foreground">Assistant</div>
    <MessageContent>The migration is safe. Add an index on tenant_id for faster lookups.</MessageContent>
    <MessageActions
      copyText="The migration is safe. Add an index on tenant_id for faster lookups."
      onRetry={() => console.log("Retry response")}
      onThumbsUp={() => console.log("Positive feedback")}
      onThumbsDown={() => console.log("Negative feedback")}
    />
  </div>
</Message>
</div>`,
      }),
    },
    {
      id: "system",
      title: "System / Context Message",
      description:
        "Muted role message indicating environment context or automated triggers.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md">
          <div className="w-full max-w-xl">
            <Message role="system">
              <MessageContent>
                Workspace context loaded: 24 packages, Node.js v22.14, Turborepo
                2.4
              </MessageContent>
            </Message>
          </div>
        </div>
      ),
      codeSnippet: createExampleSource({
        imports: ["Message", "MessageContent"],
        body: `<Message role="system">
  <MessageContent>
    Workspace context loaded: 24 packages, Node.js v22.14.
  </MessageContent>
</Message>`,
      }),
    },
  ];

  const propsList: PropDefinition[] = [
    {
      name: "role",
      type: '"user" | "assistant" | "system"',
      default: '"assistant"',
      description: "Identifies message author and sets background styling.",
    },
    {
      name: "copyText",
      type: "string",
      default: "—",
      description: "Text to copy to clipboard when the copy button is pressed.",
    },
    {
      name: "onRetry",
      type: "() => void",
      default: "—",
      description:
        "Callback invoked when clicking the regenerate / retry button.",
    },
    {
      name: "onThumbsUp",
      type: "() => void",
      default: "—",
      description: "Positive feedback callback.",
    },
    {
      name: "onThumbsDown",
      type: "() => void",
      default: "—",
      description: "Negative feedback callback.",
    },
  ];

  const cssClasses: CssClassDefinition[] = [
    {
      name: ".dl-message",
      description: "Message container row with avatar and message bubble.",
    },
    {
      name: ".dl-message--user",
      description: "Modifier style for user-submitted prompt entries.",
    },
    {
      name: ".dl-message--assistant",
      description: "Modifier style for assistant response entries.",
    },
    {
      name: ".dl-message__avatar",
      description: "Avatar circle holding icon, initials, or image.",
    },
    {
      name: ".dl-message__actions",
      description: "Action button row for copying, rating, and retrying.",
    },
  ];

  return (
    <ComponentView
      title="Message"
      description="Chat message turn component representing user prompts, assistant replies, and system events with avatar badges, action toolbars, and rating controls."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
