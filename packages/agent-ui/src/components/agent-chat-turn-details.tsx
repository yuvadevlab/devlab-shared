/**
 * @file packages/agent-ui/src/components/agent-chat-turn-details.tsx
 * @description Transparent execution blocks for reasoning, plans, tool calls, HITL confirmations, sources, cards, and usage.
 * @module @yuva-devlab/agent-ui/components
 */

import {
  Badge,
  Button,
  Confirmation,
  ConfirmationActions,
  ConfirmationContent,
  ConfirmationDescription,
  ConfirmationTitle,
  Plan,
  PlanHeader,
  PlanTask,
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
  SourceCard,
  Sources,
  SourcesContent,
  SourcesTrigger,
  ToolCall,
} from "@yuva-devlab/ui";
import type { AgentChatCopy } from "../constants";
import type { AgentChatMessageItem, AgentChatRenderers } from "../types";

export interface AgentChatTurnDetailsProps {
  message: AgentChatMessageItem;
  copy: AgentChatCopy;
  renderers?: AgentChatRenderers;
  onResolveConfirmation: (actionId: string, approved: boolean) => void;
}

/** Renders 100% transparent agentic execution metadata for an assistant message turn. */
export function AgentChatTurnDetails({
  message,
  copy,
  renderers,
  onResolveConfirmation,
}: AgentChatTurnDetailsProps) {
  return (
    <div className="dl-agent-chat__turn-details">
      {message.reasoning && (
        <Reasoning
          isStreaming={message.isReasoningStreaming}
          durationMs={message.reasoningDurationMs}
          defaultOpen={Boolean(message.isReasoningStreaming)}
        >
          <ReasoningTrigger
            label={
              message.isReasoningStreaming
                ? copy.thinkingLabel
                : copy.thoughtProcessLabel
            }
          />
          <ReasoningContent>{message.reasoning}</ReasoningContent>
        </Reasoning>
      )}

      {message.plan && message.plan.steps.length > 0 && (
        <Plan
          title={message.plan.title ?? copy.planTitle}
          description={message.plan.description}
          totalSteps={message.plan.steps.length}
        >
          <PlanHeader
            title={message.plan.title ?? copy.planTitle}
            description={message.plan.description}
            progress={`${message.plan.steps.filter((s) => s.status === "completed").length}/${message.plan.steps.length}`}
          />
          {message.plan.steps.map((step) => (
            <PlanTask
              key={step.id}
              title={step.title}
              description={step.description}
              status={step.status}
            />
          ))}
        </Plan>
      )}

      {message.toolCalls?.map((tool) => {
        const customTool = renderers?.toolRenderers?.[tool.name];
        if (customTool) return <div key={tool.id}>{customTool(tool)}</div>;
        return (
          <ToolCall
            key={tool.id}
            name={tool.name}
            status={tool.status}
            durationMs={tool.durationMs}
            args={tool.args}
            result={tool.result}
            errorText={tool.errorText}
          />
        );
      })}

      {message.confirmations?.map((conf) => (
        <Confirmation key={conf.actionId} variant="card" state={conf.state}>
          <ConfirmationContent>
            <ConfirmationTitle>{conf.card.title}</ConfirmationTitle>
            {conf.card.rows && conf.card.rows.length > 0 && (
              <ConfirmationDescription>
                {conf.card.rows.map(([k, v]) => `${k}: ${v}`).join(" · ")}
              </ConfirmationDescription>
            )}
          </ConfirmationContent>
          <ConfirmationActions>
            {conf.state === "approval-requested" ? (
              <>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => onResolveConfirmation(conf.actionId, true)}
                >
                  {copy.approveLabel}
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => onResolveConfirmation(conf.actionId, false)}
                >
                  {copy.rejectLabel}
                </Button>
              </>
            ) : (
              <Badge
                variant={
                  conf.state === "approval-accepted" ? "default" : "secondary"
                }
              >
                {conf.state === "approval-accepted"
                  ? copy.approvedLabel
                  : copy.rejectedLabel}
              </Badge>
            )}
          </ConfirmationActions>
        </Confirmation>
      ))}

      {message.cards?.map((card, index) => {
        const customCard = card.rendererKey
          ? renderers?.cardRenderers?.[card.rendererKey]
          : undefined;
        if (customCard)
          return <div key={`${card.title}-${index}`}>{customCard(card)}</div>;
        return (
          <div key={`${card.title}-${index}`} className="dl-agent-chat__card">
            <div className="dl-agent-chat__card-title">{card.title}</div>
            {card.rows && (
              <dl className="dl-agent-chat__card-rows">
                {card.rows.map(([label, value]) => (
                  <div key={label} className="dl-agent-chat__card-row">
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        );
      })}

      {message.sources && message.sources.length > 0 && (
        <Sources sources={message.sources} title={copy.sourcesLabel}>
          <SourcesTrigger
            count={message.sources.length}
            label={copy.sourcesLabel}
          />
          <SourcesContent>
            {message.sources.map((src) => (
              <SourceCard key={src.id} source={src} />
            ))}
          </SourcesContent>
        </Sources>
      )}

      {message.usage && (
        <div className="dl-agent-chat__usage">
          <span>{message.usage.tokensIn + message.usage.tokensOut} tok</span>
          {message.usage.costUsd !== undefined && (
            <span>${message.usage.costUsd.toFixed(5)}</span>
          )}
          {message.usage.latencyMs !== undefined && (
            <span>{message.usage.latencyMs}ms</span>
          )}
          {message.usage.modelId && <span>{message.usage.modelId}</span>}
        </div>
      )}
    </div>
  );
}
