/**
 * @file packages/agent-ui/src/components/agent-chat-composer.tsx
 * @description Responsive prompt composer with model selector, follow-up suggestion chips, and error banner.
 * @module @yuva-devlab/agent-ui/components
 */

import type { ReactNode } from "react";
import {
  Alert,
  PromptInput,
  Suggestion,
  SuggestionList,
  type PromptInputAttachmentItem,
} from "@yuva-devlab/ui";
import { AGENT_CHAT_DEFAULTS, type AgentChatCopy } from "../constants";
import { AgentStreamStatus } from "../enums";
import type { AgentModelOption } from "../types";

export interface AgentChatComposerProps {
  status: AgentStreamStatus;
  error: string | null;
  suggestions: string[];
  models: AgentModelOption[];
  selectedModelId?: string;
  copy: AgentChatCopy;
  className?: string;
  footerSlot?: ReactNode;
  onModelChange: (modelId: string) => void;
  onSubmit: (prompt: string, attachments: PromptInputAttachmentItem[]) => void;
  onStop: () => void;
}

/** Bottom composer wrapping PromptInput, model switcher, follow-up suggestions, and error banner. */
export function AgentChatComposer({
  status,
  error,
  suggestions,
  models,
  selectedModelId,
  copy,
  className,
  footerSlot,
  onModelChange,
  onSubmit,
  onStop,
}: AgentChatComposerProps) {
  const isGenerating =
    status === AgentStreamStatus.CONNECTING ||
    status === AgentStreamStatus.STREAMING;

  return (
    <div className={`dl-agent-chat__composer ${className ?? ""}`.trim()}>
      <div className="dl-agent-chat__composer-inner">
        {error && (
          <Alert variant="destructive">
            {error || copy.streamErrorFallback}
          </Alert>
        )}

        {suggestions.length > 0 && !isGenerating && (
          <SuggestionList>
            {suggestions.map((item) => (
              <Suggestion key={item} onClick={() => onSubmit(item, [])}>
                {item}
              </Suggestion>
            ))}
          </SuggestionList>
        )}

        <PromptInput
          placeholder={copy.composerPlaceholder}
          isGenerating={isGenerating}
          maxAttachments={AGENT_CHAT_DEFAULTS.MAX_ATTACHMENTS}
          onSubmit={onSubmit}
          onStop={onStop}
          modelSelector={
            models.length > 0 ? (
              <select
                className="dl-agent-chat__model-select"
                value={selectedModelId ?? models[0]?.id ?? ""}
                onChange={(e) => onModelChange(e.target.value)}
                aria-label="Select model"
              >
                {models.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.label}
                  </option>
                ))}
              </select>
            ) : undefined
          }
        />
        {footerSlot}
      </div>
    </div>
  );
}
