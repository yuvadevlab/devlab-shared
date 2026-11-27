/**
 * @file packages/agent-ui/src/components/agent-chat-header.tsx
 * @description Top workspace header with mobile sidebar trigger, status pill, trace toggle, and custom actions.
 * @module @yuva-devlab/agent-ui/components
 */

import type { ReactNode } from "react";
import { Activity, Menu, Sparkles } from "lucide-react";
import { Badge, Button } from "@yuva-devlab/ui";
import type { AgentChatCopy } from "../constants";
import { AgentStreamStatus } from "../enums";

export interface AgentChatHeaderProps {
  title: string;
  status: AgentStreamStatus;
  showSidebarToggle: boolean;
  showTraceToggle: boolean;
  isTraceOpen: boolean;
  logCount: number;
  copy: AgentChatCopy;
  className?: string;
  actionsSlot?: ReactNode;
  onOpenSidebar: () => void;
  onToggleTrace: () => void;
}

/** Workspace header displaying active thread title, live stream state, and trace toggle. */
export function AgentChatHeader({
  title,
  status,
  showSidebarToggle,
  showTraceToggle,
  isTraceOpen,
  logCount,
  copy,
  className,
  actionsSlot,
  onOpenSidebar,
  onToggleTrace,
}: AgentChatHeaderProps) {
  const isBusy =
    status === AgentStreamStatus.CONNECTING ||
    status === AgentStreamStatus.STREAMING;

  return (
    <header className={`dl-agent-chat__header ${className ?? ""}`.trim()}>
      <div className="dl-agent-chat__header-left">
        {showSidebarToggle && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="dl-agent-chat__menu-btn"
            onClick={onOpenSidebar}
            aria-label="Open conversations"
          >
            <Menu size={18} />
          </Button>
        )}
        <span className="dl-agent-chat__header-icon">
          <Sparkles size={15} />
        </span>
        <h2 className="dl-agent-chat__header-title">{title}</h2>
        {status !== AgentStreamStatus.IDLE && (
          <Badge variant={isBusy ? "default" : "secondary"}>{status}</Badge>
        )}
      </div>

      <div className="dl-agent-chat__header-right">
        {actionsSlot}
        {showTraceToggle && (
          <Button
            type="button"
            variant={isTraceOpen ? "secondary" : "ghost"}
            size="sm"
            onClick={onToggleTrace}
          >
            <Activity size={14} /> {copy.traceToggleLabel}
            {logCount > 0 && (
              <span className="dl-agent-chat__trace-count">{logCount}</span>
            )}
          </Button>
        )}
      </div>
    </header>
  );
}
