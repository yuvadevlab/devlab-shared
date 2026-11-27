/**
 * @file packages/agent-ui/src/components/agent-chat-viewport.tsx
 * @description Scrollable conversation stream with empty-state starter prompts, auto-scroll, and transparent message turns.
 * @module @yuva-devlab/agent-ui/components
 */

import { useEffect, useRef, useState } from "react";
import { ArrowDown, Bot, Sparkles, User } from "lucide-react";
import {
  Button,
  Message,
  MessageActions,
  MessageAvatar,
  MessageContent,
  Shimmer,
  Suggestion,
  SuggestionList,
} from "@yuva-devlab/ui";
import { AGENT_CHAT_DEFAULTS, type AgentChatCopy } from "../constants";
import { AgentMessageRole, AgentStreamStatus } from "../enums";
import type { AgentChatMessageItem, AgentChatRenderers } from "../types";
import { AgentChatTurnDetails } from "./agent-chat-turn-details";

export interface AgentChatViewportProps {
  messages: AgentChatMessageItem[];
  status: AgentStreamStatus;
  starterPrompts: string[];
  copy: AgentChatCopy;
  className?: string;
  rowClassName?: string;
  userBubbleClassName?: string;
  assistantBubbleClassName?: string;
  emptyStateClassName?: string;
  renderers?: AgentChatRenderers;
  onSelectPrompt: (prompt: string) => void;
  onResolveConfirmation: (actionId: string, approved: boolean) => void;
}

/** Scrollable message viewport supporting auto-scroll, empty state, and transparent turn blocks. */
export function AgentChatViewport({
  messages,
  status,
  starterPrompts,
  copy,
  className,
  rowClassName,
  userBubbleClassName,
  assistantBubbleClassName,
  emptyStateClassName,
  renderers,
  onSelectPrompt,
  onResolveConfirmation,
}: AgentChatViewportProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [showJumpButton, setShowJumpButton] = useState(false);

  const scrollToBottom = () => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    if (distanceFromBottom <= AGENT_CHAT_DEFAULTS.AUTO_SCROLL_THRESHOLD_PX) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    setShowJumpButton(
      distanceFromBottom > AGENT_CHAT_DEFAULTS.AUTO_SCROLL_THRESHOLD_PX,
    );
  };

  if (messages.length === 0) {
    if (renderers?.renderEmptyState) {
      return (
        <div className={`dl-agent-chat__viewport ${className ?? ""}`.trim()}>
          {renderers.renderEmptyState(onSelectPrompt)}
        </div>
      );
    }

    return (
      <div className={`dl-agent-chat__viewport ${className ?? ""}`.trim()}>
        <div
          className={`dl-agent-chat__empty ${emptyStateClassName ?? ""}`.trim()}
        >
          <div className="dl-agent-chat__empty-badge">
            <Sparkles size={20} />
          </div>
          <h3>{copy.emptyTitle}</h3>
          <p>{copy.emptyDescription}</p>
          {starterPrompts.length > 0 && (
            <SuggestionList className="dl-agent-chat__starters">
              {starterPrompts.map((prompt) => (
                <Suggestion key={prompt} onClick={() => onSelectPrompt(prompt)}>
                  {prompt}
                </Suggestion>
              ))}
            </SuggestionList>
          )}
        </div>
      </div>
    );
  }

  const isStreaming =
    status === AgentStreamStatus.CONNECTING ||
    status === AgentStreamStatus.STREAMING;

  return (
    <div className={`dl-agent-chat__viewport-wrap ${className ?? ""}`.trim()}>
      <div
        ref={scrollRef}
        className="dl-agent-chat__viewport"
        onScroll={handleScroll}
      >
        <div className="dl-agent-chat__stream">
          {messages.map((msg, idx) => {
            const isUser = msg.role === AgentMessageRole.USER;
            const isLast = idx === messages.length - 1;
            return (
              <Message key={msg.id} role={msg.role} className={rowClassName}>
                <MessageAvatar
                  role={msg.role}
                  fallback={isUser ? <User size={15} /> : <Bot size={15} />}
                />
                <div className="dl-agent-chat__msg-body">
                  {!isUser && (
                    <AgentChatTurnDetails
                      message={msg}
                      copy={copy}
                      renderers={renderers}
                      onResolveConfirmation={onResolveConfirmation}
                    />
                  )}
                  <MessageContent
                    className={
                      isUser ? userBubbleClassName : assistantBubbleClassName
                    }
                  >
                    {msg.content ? (
                      <div className="dl-agent-chat__markdown">
                        {msg.content}
                      </div>
                    ) : isLast && isStreaming ? (
                      <Shimmer className="dl-agent-chat__shimmer">
                        {copy.thinkingLabel}
                      </Shimmer>
                    ) : null}
                  </MessageContent>
                  {!isUser && msg.content && (
                    <>
                      <MessageActions copyText={msg.content} />
                      {renderers?.renderMessageFooter?.(msg)}
                    </>
                  )}
                </div>
              </Message>
            );
          })}
        </div>
      </div>

      {showJumpButton && (
        <Button
          type="button"
          size="sm"
          variant="secondary"
          className="dl-agent-chat__jump-btn"
          onClick={scrollToBottom}
        >
          <ArrowDown size={14} /> {copy.scrollToBottomLabel}
        </Button>
      )}
    </div>
  );
}
