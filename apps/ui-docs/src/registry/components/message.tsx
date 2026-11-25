"use client";

import React, { useState } from "react";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageActions,
  Stack,
  Text,
} from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
  type PropDefinition,
  type CssClassDefinition,
} from "@/components/component-view";

const CONVERSATION_CODE = `import { useState } from "react";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageActions,
  Stack,
} from "@yuva-devlab/ui";

export function ConversationTurnDemo() {
  const [feedback, setFeedback] = useState("");
  const reply =
    "To sustain 10k RPS, add Redis caching for read-heavy routes, PgBouncer pooling, and index batching.";

  return (
    <Stack gap={4}>
      <Message role="user">
        <MessageAvatar role="user" />
        <div className="dl-message__body">
          <MessageContent>
            Can you optimize our queries for 10,000 requests per second?
          </MessageContent>
        </div>
      </Message>

      <Message role="assistant">
        <MessageAvatar role="assistant" />
        <div className="dl-message__body">
          <MessageContent>{reply}</MessageContent>
          <MessageActions
            copyText={reply}
            onRetry={() => setFeedback("Retrying...")}
            onThumbsUp={() => setFeedback("Liked")}
            onThumbsDown={() => setFeedback("Disliked")}
          />
          {feedback && <span>Feedback: {feedback}</span>}
        </div>
      </Message>
    </Stack>
  );
}`;

const SYSTEM_CODE = `import { Message, MessageAvatar, MessageContent } from "@yuva-devlab/ui";

export function SystemMessageDemo() {
  return (
    <Message role="system">
      <MessageAvatar role="system" fallback="S" />
      <div className="dl-message__body">
        <MessageContent>
          Connected read-only PostgreSQL schema telemetry.
        </MessageContent>
      </div>
    </Message>
  );
}`;

export default function MessageDocPage() {
  const [feedback, setFeedback] = useState<string>("");

  const variants: ComponentVariant[] = [
    {
      id: "conversation",
      title: "Assistant & User Turn",
      description:
        "Standard conversational stream format with user query, assistant reply, and feedback actions.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--lg">
          <Stack gap={4}>
            <Message role="user">
              <MessageAvatar role="user" />
              <div className="dl-message__body">
                <Text variant="caption">You</Text>
                <MessageContent>
                  Can you optimize our database queries to handle 10,000
                  requests per second?
                </MessageContent>
              </div>
            </Message>

            <Message role="assistant">
              <MessageAvatar role="assistant" />
              <div className="dl-message__body">
                <Text variant="caption">DevLab Assistant</Text>
                <MessageContent>
                  To sustain 10k RPS, I recommend adding a Redis caching layer
                  for read-heavy routes, implementing connection pooling via
                  PgBouncer, and batching index lookups.
                </MessageContent>
                <MessageActions
                  copyText="To sustain 10k RPS, I recommend adding a Redis caching layer..."
                  onRetry={() => setFeedback("Regenerating...")}
                  onThumbsUp={() => setFeedback("Liked")}
                  onThumbsDown={() => setFeedback("Disliked")}
                />
                {feedback && (
                  <Text variant="caption">Feedback: {feedback}</Text>
                )}
              </div>
            </Message>
          </Stack>
        </div>
      ),
      codeSnippet: CONVERSATION_CODE,
    },
    {
      id: "system",
      title: "System / Context Message",
      description:
        "Muted role message indicating environment context or automated triggers.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--lg">
          <Message role="system">
            <MessageAvatar role="system" fallback="S" />
            <div className="dl-message__body">
              <MessageContent>
                Connected read-only PostgreSQL schema telemetry.
              </MessageContent>
            </div>
          </Message>
        </div>
      ),
      codeSnippet: SYSTEM_CODE,
    },
  ];

  const propsList: PropDefinition[] = [
    {
      name: "role",
      type: '"user" | "assistant" | "system"',
      default: '"assistant"',
      description: "Controls avatar treatment, alignment, and bubble accent.",
    },
    {
      name: "copyText",
      type: "string",
      default: "—",
      description: "Text payload copied when clicking copy on MessageActions.",
    },
  ];

  const cssClasses: CssClassDefinition[] = [
    { name: ".dl-message", description: "Outer conversational turn row." },
    {
      name: ".dl-message__avatar",
      description: "Circular avatar container with scaled icon sizing.",
    },
    {
      name: ".dl-message__actions",
      description:
        "Hover-revealed toolbar with copy, retry, and feedback icons.",
    },
  ];

  return (
    <ComponentView
      title="Message"
      description="Conversation turn wrapper for user, assistant, and system messages with avatars and interactive action toolbars."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
