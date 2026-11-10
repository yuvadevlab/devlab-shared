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
          <div
            style={{
              width: "100%",
              maxWidth: "36rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <Message role="user">
              <MessageAvatar role="user" />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.25rem",
                }}
              >
                <div
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--muted-foreground)",
                  }}
                >
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.25rem",
                }}
              >
                <div
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--muted-foreground)",
                  }}
                >
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
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--primary)",
                      fontWeight: 500,
                    }}
                  >
                    Feedback: {feedback}
                  </span>
                )}
              </div>
            </Message>
          </div>
        </div>
      ),
      codeSnippet: `<Message role="assistant">
  <MessageAvatar role="assistant" />
  <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
    <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--muted-foreground)" }}>DevLab Assistant</div>
    <MessageContent>
      I recommend adding a Redis caching layer...
    </MessageContent>
    <MessageActions
      copyText="I recommend adding a Redis caching layer..."
      onRetry={() => regenerate()}
      onThumbsUp={() => track(true)}
      onThumbsDown={() => track(false)}
    />
  </div>
</Message>`,
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
      codeSnippet: `<Message role="system">
  <MessageContent>
    Workspace context loaded: 24 packages, Node.js v22.14
  </MessageContent>
</Message>`,
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
