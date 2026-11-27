"""Cloud Run-safe FastAPI SSE streaming helpers for DevLab AI agents."""

import asyncio
from collections.abc import AsyncIterator

from fastapi import Request
from fastapi.responses import StreamingResponse

from .enums import AgentErrorCode
from .events import DoneEvent, ErrorEvent, _SseModel

SSE_HTTP_STATUS_OK = 200

SSE_RESPONSE_HEADERS: dict[str, str] = {
    "Content-Type": "text/event-stream; charset=utf-8",
    "Cache-Control": "no-cache, no-transform",
    "Connection": "keep-alive",
    "X-Accel-Buffering": "no",
}


def sse_stream_response(
    request: Request,
    events: AsyncIterator[_SseModel],
) -> StreamingResponse:
    """Wrap an async event iterator in an unbuffered HTTP 200 SSE StreamingResponse.

    Enforces status 200 OK (so reverse proxies such as Cloud Run / GFE do not buffer),
    stops iteration on client disconnect, and guarantees `error` + `done` on exceptions.
    """

    async def _stream() -> AsyncIterator[str]:
        sent_done = False
        try:
            async for event in events:
                if await request.is_disconnected():
                    break
                if isinstance(event, DoneEvent):
                    sent_done = True
                yield event.to_sse()
        except asyncio.CancelledError:
            raise
        except Exception as exc:
            yield ErrorEvent(
                error=str(exc) or "Agent stream failure",
                code=AgentErrorCode.AGENT_ERROR,
            ).to_sse()
            yield DoneEvent().to_sse()
            sent_done = True
        finally:
            if not sent_done and not await request.is_disconnected():
                yield DoneEvent().to_sse()

    return StreamingResponse(
        _stream(),
        status_code=SSE_HTTP_STATUS_OK,
        headers=SSE_RESPONSE_HEADERS,
        media_type="text/event-stream",
    )
