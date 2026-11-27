"""Canonical Pydantic v2 SSE event models and frame serializer."""

from typing import Any, Literal

from pydantic import BaseModel, ConfigDict

from .enums import (
    AgentCardType,
    AgentMode,
    AgentRunLogLevel,
    AgentStreamEventType,
    ExecutionPhase,
    PhaseStatus,
)


class _SseModel(BaseModel):
    """Base model configured for camelCase wire compatibility."""

    model_config = ConfigDict(populate_by_name=True)

    def to_sse(self) -> str:
        """Serialize this event into a single SSE `data:` frame."""
        payload = self.model_dump_json(exclude_none=True)
        return f"data: {payload}\n\n"


class AgentCard(BaseModel):
    """Structured presentation card emitted during an agent turn."""

    type: AgentCardType
    title: str
    rows: list[tuple[str, str]] | None = None
    rendererKey: str | None = None
    data: dict[str, Any] | None = None


class ConversationEvent(_SseModel):
    """First event identifying the conversation this run belongs to."""

    type: Literal[AgentStreamEventType.CONVERSATION] = AgentStreamEventType.CONVERSATION
    conversationId: str


class TitleEvent(_SseModel):
    """Generated short summary title for the conversation."""

    type: Literal[AgentStreamEventType.TITLE] = AgentStreamEventType.TITLE
    title: str


class RunEvent(_SseModel):
    """Unique identifier for this agent run."""

    type: Literal[AgentStreamEventType.RUN] = AgentStreamEventType.RUN
    runId: str


class ModeEvent(_SseModel):
    """Resolved runtime mode (`agent` or `chat`)."""

    type: Literal[AgentStreamEventType.MODE] = AgentStreamEventType.MODE
    mode: AgentMode


class LogEvent(_SseModel):
    """Real-time transparent execution log entry."""

    type: Literal[AgentStreamEventType.LOG] = AgentStreamEventType.LOG
    level: AgentRunLogLevel
    message: str
    detail: str | None = None


class TokenEvent(_SseModel):
    """Streamed delta of the assistant's visible answer text."""

    type: Literal[AgentStreamEventType.TOKEN] = AgentStreamEventType.TOKEN
    content: str


class ReasoningEvent(_SseModel):
    """Streamed model thinking/reasoning delta."""

    type: Literal[AgentStreamEventType.REASONING] = AgentStreamEventType.REASONING
    content: str


class TokenReplaceEvent(_SseModel):
    """Replaces accumulated visible text with a corrected snapshot."""

    type: Literal[AgentStreamEventType.TOKEN_REPLACE] = AgentStreamEventType.TOKEN_REPLACE
    content: str


class ToolCallEvent(_SseModel):
    """Indicates a tool invocation has started."""

    type: Literal[AgentStreamEventType.TOOL_CALL] = AgentStreamEventType.TOOL_CALL
    tool: str
    runId: str


class ToolResultEvent(_SseModel):
    """Indicates a tool invocation has completed."""

    type: Literal[AgentStreamEventType.TOOL_RESULT] = AgentStreamEventType.TOOL_RESULT
    tool: str
    ok: bool
    summary: str | None = None
    label: str | None = None


class PhaseEvent(_SseModel):
    """Real agent lifecycle transition."""

    type: Literal[AgentStreamEventType.PHASE] = AgentStreamEventType.PHASE
    phase: ExecutionPhase
    status: PhaseStatus
    turn: int | None = None
    pendingAction: bool | None = None
    toolCalls: int | None = None


class CardEvent(_SseModel):
    """Passive information card to render in the thread."""

    type: Literal[AgentStreamEventType.CARD] = AgentStreamEventType.CARD
    card: AgentCard


class UiCardEvent(_SseModel):
    """Domain-specific custom card slot."""

    type: Literal[AgentStreamEventType.UI_CARD] = AgentStreamEventType.UI_CARD
    rendererKey: str
    data: dict[str, Any]


class ConfirmationRequiredEvent(_SseModel):
    """Proposed write action awaiting user confirmation."""

    type: Literal[AgentStreamEventType.CONFIRMATION_REQUIRED] = (
        AgentStreamEventType.CONFIRMATION_REQUIRED
    )
    actionId: str
    tool: str
    card: AgentCard


class ActionUpdatedEvent(_SseModel):
    """Pending action updated during conversation."""

    type: Literal[AgentStreamEventType.ACTION_UPDATED] = AgentStreamEventType.ACTION_UPDATED
    actionId: str
    tool: str
    card: AgentCard
    message: str | None = None


class ActionResultEvent(_SseModel):
    """Outcome of a confirmed or rejected action."""

    type: Literal[AgentStreamEventType.ACTION_RESULT] = AgentStreamEventType.ACTION_RESULT
    actionId: str
    ok: bool
    card: AgentCard | None = None


class SuggestionsEvent(_SseModel):
    """Follow-up suggestion chips for the user."""

    type: Literal[AgentStreamEventType.SUGGESTIONS] = AgentStreamEventType.SUGGESTIONS
    items: list[str]


class UsageEvent(_SseModel):
    """Token usage summary for the completed run."""

    type: Literal[AgentStreamEventType.USAGE] = AgentStreamEventType.USAGE
    tokensIn: int
    tokensOut: int


class ErrorEvent(_SseModel):
    """Terminal error event."""

    type: Literal[AgentStreamEventType.ERROR] = AgentStreamEventType.ERROR
    error: str
    code: str | None = None


class DoneEvent(_SseModel):
    """Final event marking clean stream termination."""

    type: Literal[AgentStreamEventType.DONE] = AgentStreamEventType.DONE


AgentStreamEvent = (
    ConversationEvent
    | TitleEvent
    | RunEvent
    | ModeEvent
    | LogEvent
    | TokenEvent
    | ReasoningEvent
    | TokenReplaceEvent
    | ToolCallEvent
    | ToolResultEvent
    | PhaseEvent
    | CardEvent
    | UiCardEvent
    | ConfirmationRequiredEvent
    | ActionUpdatedEvent
    | ActionResultEvent
    | SuggestionsEvent
    | UsageEvent
    | ErrorEvent
    | DoneEvent
)


def format_sse_frame(event: _SseModel) -> str:
    """Format any DevLab agent event model into an SSE `data:` frame."""
    return event.to_sse()
