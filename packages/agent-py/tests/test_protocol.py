"""Unit tests for devlab-agent protocol models and FastAPI SSE helper."""

import json
from collections.abc import AsyncIterator
from unittest.mock import AsyncMock, MagicMock

import pytest

from devlab_agent import (
    SSE_HTTP_STATUS_OK,
    AgentRunLogLevel,
    AgentStreamEventType,
    DoneEvent,
    LogEvent,
    RunEvent,
    sse_stream_response,
)


def test_sse_frame_serialization() -> None:
    frame = LogEvent(level=AgentRunLogLevel.SYS, message="Initialized", detail="test").to_sse()
    assert frame.startswith("data: ")
    assert frame.endswith("\n\n")
    payload = json.loads(frame.removeprefix("data: ").strip())
    assert payload == {
        "type": AgentStreamEventType.LOG,
        "level": "SYS",
        "message": "Initialized",
        "detail": "test",
    }


@pytest.mark.asyncio
async def test_sse_stream_response_emits_200_and_error_done_on_failure() -> None:
    request = MagicMock()
    request.is_disconnected = AsyncMock(return_value=False)

    async def failing_gen() -> AsyncIterator[RunEvent]:
        yield RunEvent(runId="run-1")
        raise RuntimeError("boom")

    response = sse_stream_response(request, failing_gen())
    assert response.status_code == SSE_HTTP_STATUS_OK
    assert response.headers["x-accel-buffering"] == "no"

    chunks: list[str] = []
    async for chunk in response.body_iterator:
        chunks.append(chunk if isinstance(chunk, str) else chunk.decode())

    assert len(chunks) == 3
    assert '"type":"run"' in chunks[0]
    assert '"type":"error"' in chunks[1]
    assert '"type":"done"' in chunks[2]


@pytest.mark.asyncio
async def test_sse_stream_response_appends_done_if_missing() -> None:
    request = MagicMock()
    request.is_disconnected = AsyncMock(return_value=False)

    async def simple_gen() -> AsyncIterator[RunEvent | DoneEvent]:
        yield RunEvent(runId="run-2")

    response = sse_stream_response(request, simple_gen())
    chunks = [c if isinstance(c, str) else c.decode() async for c in response.body_iterator]
    assert len(chunks) == 2
    assert '"type":"done"' in chunks[1]
