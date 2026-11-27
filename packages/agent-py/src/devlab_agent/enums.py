"""Canonical runtime, stream, phase, activity, and log enums for DevLab AI agents."""

from enum import StrEnum


class LlmRole(StrEnum):
    """Provider-agnostic chat roles for LLMs."""

    SYSTEM = "system"
    USER = "user"
    ASSISTANT = "assistant"
    TOOL = "tool"


class LlmStreamEventType(StrEnum):
    """Low-level streaming event types emitted by LLM adapters."""

    TEXT_DELTA = "text-delta"
    REASONING_DELTA = "reasoning-delta"
    TOOL_CALL = "tool_call"
    USAGE = "usage"
    DONE = "done"


class AgentMode(StrEnum):
    """Agent execution mode determining tool loop availability."""

    AGENT = "agent"
    CHAT = "chat"


class AgentCardType(StrEnum):
    """Presentation card categories returned during conversational turns."""

    INSIGHT = "insight"
    TABLE = "table"
    CONFIRMATION = "confirmation"
    BULK_CONFIRMATION = "bulk_confirmation"
    ENTITY = "entity"
    CUSTOM = "custom"


class ExecutionPhase(StrEnum):
    """Lifecycle execution phases emitted during an SSE agent stream."""

    LOADING_CONTEXT = "loading_context"
    MODEL_TURN = "model_turn"
    AGENT_LOOP = "agent_loop"
    SYNTHESIZING = "synthesizing"


class PhaseStatus(StrEnum):
    """Phase progression boundary states."""

    START = "start"
    END = "end"


class AgentStreamEventType(StrEnum):
    """Server-Sent Event stream event types emitted during agent execution."""

    RUN = "run"
    PHASE = "phase"
    MODE = "mode"
    LOG = "log"
    REASONING = "reasoning"
    CONVERSATION = "conversation"
    TITLE = "title"
    TEXT = "text"
    TOKEN = "token"
    TOKEN_REPLACE = "token_replace"
    TOOL_START = "tool_start"
    TOOL_END = "tool_end"
    TOOL_CALL = "tool_call"
    TOOL_RESULT = "tool_result"
    CARD = "card"
    UI_CARD = "ui_card"
    CONFIRMATION = "confirmation"
    CONFIRMATION_REQUIRED = "confirmation_required"
    ACTION_UPDATED = "action_updated"
    ACTION_RESULT = "action_result"
    STATUS = "status"
    SUGGESTIONS = "suggestions"
    USAGE = "usage"
    ERROR = "error"
    DONE = "done"


class AgentActivityStatus(StrEnum):
    """Lifecycle status of an individual tool call or execution step."""

    PENDING = "pending"
    RUNNING = "running"
    SUCCESS = "success"
    ERROR = "error"


class AgentActivityKind(StrEnum):
    """Kind of activity entry in the timeline."""

    TOOL = "tool"
    PHASE = "phase"
    APPROVAL = "approval"


class AgentConfirmationStatus(StrEnum):
    """Confirmation card lifecycle status."""

    PENDING = "pending"
    EXECUTED = "executed"
    REJECTED = "rejected"
    FAILED = "failed"


class AgentRunLogLevel(StrEnum):
    """Real-time processing log entry levels."""

    SYS = "SYS"
    CTX = "CTX"
    LLM = "LLM"
    TOOL = "TOOL"
    STREAM = "STREAM"
    ACTION = "ACTION"
    DONE = "DONE"
    ERR = "ERR"


class AgentChatRole(StrEnum):
    """Role in agent conversation chat messages."""

    USER = "user"
    ASSISTANT = "assistant"


class AgentErrorCode(StrEnum):
    """Canonical error codes emitted on SSE error events."""

    MAX_ITERATIONS = "MAX_ITERATIONS"
    CONVERSATION_NOT_FOUND = "CONVERSATION_NOT_FOUND"
    LLM_UNAVAILABLE = "LLM_UNAVAILABLE"
    AGENT_ERROR = "AGENT_ERROR"
