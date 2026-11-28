/**
 * @file packages/agent-ui/src/use-agent-chat.ts
 * @description Stateful React hook orchestrating threads, Gateway SSE streaming, stop/retry, and HITL confirmations.
 * @module @yuva-devlab/agent-ui/use-agent-chat
 */

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AgentStreamEventType,
  type ExecutionPhase,
  type PhaseStatus,
} from "@yuva-devlab/agent-protocol";
import type { PromptInputAttachmentItem } from "@yuva-devlab/ui";
import {
  AgentApprovalState,
  AgentMessageRole,
  AgentStreamStatus,
} from "./enums";
import { reduceAssistantMessageEvent } from "./sse-parser";
import {
  buildGatewayRequestBody,
  postAgentConfirmation,
  streamAgentGateway,
} from "./stream-client";
import type {
  AgentChatMessageItem,
  AgentChatThread,
  AgentChatTransportConfig,
  AgentThreadAdapter,
  AgentTraceLogItem,
} from "./types";

interface UseAgentChatOptions {
  transport: AgentChatTransportConfig;
  threadAdapter?: AgentThreadAdapter;
  initialThreads?: AgentChatThread[];
  initialMessages?: AgentChatMessageItem[];
  defaultModelId?: string;
  onPhaseChange?: (phase: ExecutionPhase, status: PhaseStatus) => void;
  onStatusChange?: (status: AgentStreamStatus) => void;
}

/**
 * Manages agentic chat state, SSE streaming, thread switching, and HITL confirmations.
 */
export function useAgentChat({
  transport,
  threadAdapter,
  initialThreads = [],
  initialMessages = [],
  defaultModelId,
  onPhaseChange,
  onStatusChange,
}: UseAgentChatOptions) {
  const [threads, setThreads] = useState<AgentChatThread[]>(initialThreads);
  const [activeThreadId, setActiveThreadId] = useState<string | undefined>(
    initialThreads[0]?.id,
  );
  const [messages, setMessages] =
    useState<AgentChatMessageItem[]>(initialMessages);
  const [status, setStatus] = useState<AgentStreamStatus>(
    AgentStreamStatus.IDLE,
  );
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<AgentTraceLogItem[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedModelId, setSelectedModelId] = useState<string | undefined>(
    defaultModelId,
  );
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    onStatusChange?.(status);
  }, [onStatusChange, status]);

  useEffect(() => {
    if (!threadAdapter?.listThreads) return;
    void threadAdapter.listThreads().then((loaded) => {
      setThreads(loaded);
      if (loaded[0]?.id && !activeThreadId) {
        setActiveThreadId(loaded[0].id);
      }
    });
  }, [activeThreadId, threadAdapter]);

  const resolveHeaders = useCallback(async () => {
    const custom =
      typeof transport.headers === "function"
        ? await transport.headers()
        : (transport.headers ?? {});
    return { "Content-Type": "application/json", ...custom };
  }, [transport]);

  const stopGeneration = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setStatus(AgentStreamStatus.IDLE);
  }, []);

  const sendMessage = useCallback(
    async (prompt: string, attachments: PromptInputAttachmentItem[] = []) => {
      const trimmed = prompt.trim();
      if (!trimmed) return;

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      setError(null);
      setSuggestions([]);
      setStatus(AgentStreamStatus.CONNECTING);

      const userMsg: AgentChatMessageItem = {
        id: `usr-${Date.now()}`,
        role: AgentMessageRole.USER,
        content: trimmed,
        attachments: attachments.length > 0 ? attachments : undefined,
        createdAt: new Date().toISOString(),
      };
      const assistantId = `ast-${Date.now() + 1}`;
      const assistantSeed: AgentChatMessageItem = {
        id: assistantId,
        role: AgentMessageRole.ASSISTANT,
        content: "",
        createdAt: new Date().toISOString(),
      };

      const historyPayload = [...messages, userMsg].map((item) => ({
        role: item.role,
        content: item.content,
      }));
      setMessages((prev) => [...prev, userMsg, assistantSeed]);

      try {
        const headers = await resolveHeaders();
        const body = buildGatewayRequestBody({
          transport,
          prompt: trimmed,
          messages: historyPayload,
          threadId: activeThreadId,
          modelId: selectedModelId,
          attachments,
        });

        setStatus(AgentStreamStatus.STREAMING);
        await streamAgentGateway({
          url: transport.streamUrl,
          headers,
          body,
          signal: controller.signal,
          onEvent: (event) => {
            if (event.type === AgentStreamEventType.PHASE) {
              onPhaseChange?.(event.phase, event.status);
            }
            setMessages((prev) =>
              prev.map((item) => {
                if (item.id !== assistantId) return item;
                const reduced = reduceAssistantMessageEvent(item, event);
                if (reduced.log) setLogs((l) => [...l, reduced.log!]);
                if (reduced.suggestions) setSuggestions(reduced.suggestions);
                if (reduced.conversationId)
                  setActiveThreadId(reduced.conversationId);
                if (reduced.error) setError(reduced.error);
                if (reduced.awaitingApproval)
                  setStatus(AgentStreamStatus.AWAITING_APPROVAL);
                return reduced.message;
              }),
            );
          },
        });
        setStatus((curr) =>
          curr === AgentStreamStatus.AWAITING_APPROVAL
            ? curr
            : AgentStreamStatus.IDLE,
        );
      } catch (err) {
        if ((err as Error).name === "AbortError") {
          setStatus(AgentStreamStatus.IDLE);
          return;
        }
        setError(err instanceof Error ? err.message : "Stream request failed");
        setStatus(AgentStreamStatus.ERROR);
      }
    },
    [
      activeThreadId,
      messages,
      onPhaseChange,
      resolveHeaders,
      selectedModelId,
      transport,
    ],
  );

  const resolveConfirmation = useCallback(
    async (actionId: string, approved: boolean) => {
      setMessages((prev) =>
        prev.map((msg) => ({
          ...msg,
          confirmations: msg.confirmations?.map((conf) =>
            conf.actionId === actionId
              ? {
                  ...conf,
                  state: approved
                    ? AgentApprovalState.ACCEPTED
                    : AgentApprovalState.REJECTED,
                }
              : conf,
          ),
        })),
      );
      if (transport.onConfirmAction) {
        await transport.onConfirmAction(actionId, approved);
      } else if (transport.confirmUrl) {
        await postAgentConfirmation({
          url: transport.confirmUrl,
          headers: await resolveHeaders(),
          actionId,
          approved,
          threadId: activeThreadId,
        });
      }
      setStatus(AgentStreamStatus.IDLE);
    },
    [activeThreadId, resolveHeaders, transport],
  );

  const createThread = useCallback(() => {
    stopGeneration();
    setActiveThreadId(undefined);
    setMessages([]);
    setLogs([]);
    setSuggestions([]);
    setError(null);
  }, [stopGeneration]);

  const selectThread = useCallback(
    async (threadId: string) => {
      stopGeneration();
      setActiveThreadId(threadId);
      setError(null);
      if (threadAdapter?.loadThread) {
        setMessages(await threadAdapter.loadThread(threadId));
      }
    },
    [stopGeneration, threadAdapter],
  );

  const deleteThread = useCallback(
    async (threadId: string) => {
      await threadAdapter?.deleteThread?.(threadId);
      setThreads((prev) => prev.filter((item) => item.id !== threadId));
      if (activeThreadId === threadId) createThread();
    },
    [activeThreadId, createThread, threadAdapter],
  );

  return {
    threads,
    activeThreadId,
    messages,
    status,
    error,
    logs,
    suggestions,
    selectedModelId,
    setSelectedModelId,
    sendMessage,
    stopGeneration,
    resolveConfirmation,
    createThread,
    selectThread,
    deleteThread,
  };
}
