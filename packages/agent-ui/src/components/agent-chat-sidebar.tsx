/**
 * @file packages/agent-ui/src/components/agent-chat-sidebar.tsx
 * @description Responsive conversation thread sidebar with search and new-thread action.
 * @module @yuva-devlab/agent-ui/components
 */

import { useMemo, useState, type ReactNode } from "react";
import { MessageSquare, Plus, Search, Trash2, X } from "lucide-react";
import { Button } from "@yuva-devlab/ui";
import type { AgentChatCopy } from "../constants";
import type { AgentChatThread } from "../types";

export interface AgentChatSidebarProps {
  threads: AgentChatThread[];
  activeThreadId?: string;
  isOpenMobile: boolean;
  copy: AgentChatCopy;
  className?: string;
  headerSlot?: ReactNode;
  onCloseMobile: () => void;
  onCreateThread: () => void;
  onSelectThread: (threadId: string) => void;
  onDeleteThread: (threadId: string) => void;
}

/** Conversation thread sidebar supporting desktop split-pane and mobile drawer modes. */
export function AgentChatSidebar({
  threads,
  activeThreadId,
  isOpenMobile,
  copy,
  className,
  headerSlot,
  onCloseMobile,
  onCreateThread,
  onSelectThread,
  onDeleteThread,
}: AgentChatSidebarProps) {
  const [query, setQuery] = useState("");

  const filteredThreads = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return threads;
    return threads.filter((t) => t.title.toLowerCase().includes(q));
  }, [query, threads]);

  return (
    <>
      {isOpenMobile && (
        <div
          className="dl-agent-chat__backdrop"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}
      <aside
        className={`dl-agent-chat__sidebar ${isOpenMobile ? "is-open" : ""} ${className ?? ""}`.trim()}
      >
        <div className="dl-agent-chat__sidebar-top">
          {headerSlot}
          <div className="dl-agent-chat__sidebar-actions">
            <Button
              type="button"
              size="sm"
              className="dl-agent-chat__new-btn"
              onClick={() => {
                onCreateThread();
                onCloseMobile();
              }}
            >
              <Plus size={14} /> {copy.newThread}
            </Button>
            {isOpenMobile && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={onCloseMobile}
                aria-label="Close sidebar"
              >
                <X size={16} />
              </Button>
            )}
          </div>
          <label className="dl-agent-chat__search">
            <Search size={14} />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={copy.searchThreadsPlaceholder}
              aria-label={copy.searchThreadsPlaceholder}
            />
          </label>
        </div>

        <div className="dl-agent-chat__thread-list" role="list">
          {filteredThreads.length === 0 ? (
            <p className="dl-agent-chat__thread-empty">{copy.noThreads}</p>
          ) : (
            filteredThreads.map((thread) => {
              const isActive = thread.id === activeThreadId;
              return (
                <div
                  key={thread.id}
                  role="listitem"
                  className={`dl-agent-chat__thread-item ${isActive ? "is-active" : ""}`.trim()}
                >
                  <button
                    type="button"
                    className="dl-agent-chat__thread-btn"
                    onClick={() => {
                      onSelectThread(thread.id);
                      onCloseMobile();
                    }}
                  >
                    <MessageSquare size={14} />
                    <span>{thread.title || copy.untitledThread}</span>
                  </button>
                  <button
                    type="button"
                    className="dl-agent-chat__thread-del"
                    onClick={() => onDeleteThread(thread.id)}
                    aria-label={`Delete ${thread.title}`}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </aside>
    </>
  );
}
