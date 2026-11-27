/**
 * @file packages/agent-ui/src/components/agent-chat.tsx
 * @description Top-level customizable, responsive, theme-adaptive Agentic Chat UI workspace.
 * @module @yuva-devlab/agent-ui/components
 */

import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { DEFAULT_AGENT_CHAT_COPY } from "../constants";
import { AgentChatLayout, AgentChatSlot } from "../enums";
import type { AgentChatProps } from "../types";
import { useAgentChat } from "../use-agent-chat";
import { AgentChatComposer } from "./agent-chat-composer";
import { AgentChatHeader } from "./agent-chat-header";
import { AgentChatSidebar } from "./agent-chat-sidebar";
import { AgentChatViewport } from "./agent-chat-viewport";

/**
 * Reusable, 100% transparent Agentic Chat UI composite.
 * Consumer apps pass transport config, optional custom tool/card renderers, copy, and CSS overrides;
 * `devlab-ai-studio` Gateway executes the agent loop and streams events.
 */
export function AgentChat({
  transport,
  threadAdapter,
  initialThreads,
  initialMessages,
  layout = AgentChatLayout.FULL,
  showSidebar = layout === AgentChatLayout.FULL,
  showTraceInspector = true,
  starterPrompts = [],
  models = [],
  defaultModelId,
  copy: copyOverrides,
  classNames,
  style,
  renderers,
  onPhaseChange,
  onStatusChange,
}: AgentChatProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isTraceOpen, setIsTraceOpen] = useState(false);

  const copy = useMemo(
    () => ({ ...DEFAULT_AGENT_CHAT_COPY, ...copyOverrides }),
    [copyOverrides],
  );

  const chat = useAgentChat({
    transport,
    threadAdapter,
    initialThreads,
    initialMessages,
    defaultModelId,
    onPhaseChange,
    onStatusChange,
  });

  const activeThread = chat.threads.find((t) => t.id === chat.activeThreadId);
  const headerTitle = activeThread?.title || copy.defaultTitle;

  return (
    <section
      className={`dl-agent-chat ${classNames?.[AgentChatSlot.ROOT] ?? ""}`.trim()}
      data-layout={layout}
      style={style}
    >
      {showSidebar && (
        <AgentChatSidebar
          threads={chat.threads}
          activeThreadId={chat.activeThreadId}
          isOpenMobile={isMobileSidebarOpen}
          copy={copy}
          className={classNames?.[AgentChatSlot.SIDEBAR]}
          headerSlot={renderers?.renderSidebarHeader?.()}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
          onCreateThread={chat.createThread}
          onSelectThread={chat.selectThread}
          onDeleteThread={chat.deleteThread}
        />
      )}

      <div className="dl-agent-chat__main">
        <AgentChatHeader
          title={headerTitle}
          status={chat.status}
          showSidebarToggle={showSidebar}
          showTraceToggle={showTraceInspector}
          isTraceOpen={isTraceOpen}
          logCount={chat.logs.length}
          copy={copy}
          className={classNames?.[AgentChatSlot.HEADER]}
          actionsSlot={renderers?.renderHeaderActions?.()}
          onOpenSidebar={() => setIsMobileSidebarOpen(true)}
          onToggleTrace={() => setIsTraceOpen((prev) => !prev)}
        />

        <AgentChatViewport
          messages={chat.messages}
          status={chat.status}
          starterPrompts={starterPrompts}
          copy={copy}
          className={classNames?.[AgentChatSlot.VIEWPORT]}
          rowClassName={classNames?.[AgentChatSlot.MESSAGE_ROW]}
          userBubbleClassName={classNames?.[AgentChatSlot.BUBBLE_USER]}
          assistantBubbleClassName={
            classNames?.[AgentChatSlot.BUBBLE_ASSISTANT]
          }
          emptyStateClassName={classNames?.[AgentChatSlot.EMPTY_STATE]}
          renderers={renderers}
          onSelectPrompt={(prompt) => void chat.sendMessage(prompt)}
          onResolveConfirmation={(id, ok) =>
            void chat.resolveConfirmation(id, ok)
          }
        />

        <AgentChatComposer
          status={chat.status}
          error={chat.error}
          suggestions={chat.suggestions}
          models={models}
          selectedModelId={chat.selectedModelId}
          copy={copy}
          className={classNames?.[AgentChatSlot.COMPOSER]}
          footerSlot={renderers?.renderComposerFooter?.()}
          onModelChange={chat.setSelectedModelId}
          onSubmit={(prompt, attachments) =>
            void chat.sendMessage(prompt, attachments)
          }
          onStop={chat.stopGeneration}
        />
      </div>

      {showTraceInspector && isTraceOpen && (
        <aside
          className={`dl-agent-chat__inspector ${classNames?.[AgentChatSlot.INSPECTOR] ?? ""}`.trim()}
        >
          <div className="dl-agent-chat__inspector-head">
            <h3>{copy.traceTitle}</h3>
            <button
              type="button"
              onClick={() => setIsTraceOpen(false)}
              aria-label="Close trace"
            >
              <X size={15} />
            </button>
          </div>
          <div className="dl-agent-chat__inspector-body">
            {chat.logs.length === 0 ? (
              <p className="dl-agent-chat__trace-empty">{copy.traceEmpty}</p>
            ) : (
              chat.logs.map((entry) => (
                <div key={entry.id} className="dl-agent-chat__trace-item">
                  <span className="dl-agent-chat__trace-level">
                    {entry.level}
                  </span>
                  <div>
                    <div className="dl-agent-chat__trace-msg">
                      {entry.message}
                    </div>
                    {entry.detail && (
                      <div className="dl-agent-chat__trace-detail">
                        {entry.detail}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </aside>
      )}
    </section>
  );
}
