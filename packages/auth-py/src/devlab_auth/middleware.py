"""Pure ASGI / FastAPI middleware for global request authentication."""

from typing import Any

from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from starlette.responses import JSONResponse

from devlab_auth.client import DevLabAuth


class DevLabAuthMiddleware(BaseHTTPMiddleware):
    """ASGI middleware authenticating requests and injecting 'request.state.principal'."""

    def __init__(
        self,
        app: Any,
        auth: DevLabAuth | None = None,
        public_paths: set[str] | None = None,
    ) -> None:
        super().__init__(app)
        self.auth = auth or DevLabAuth()
        self.public_paths = public_paths or {
            "/health",
            "/ready",
            "/docs",
            "/openapi.json",
            "/redoc",
        }

    async def dispatch(self, request: Request, call_next: RequestResponseEndpoint) -> Response:
        if request.url.path in self.public_paths:
            return await call_next(request)

        header = request.headers.get("Authorization") or request.headers.get("x-api-key")
        if not header:
            return JSONResponse(
                status_code=401,
                content={"error": "Unauthorized: Missing Authorization Bearer token or x-api-key"},
            )

        try:
            principal = await self.auth.authenticate_async(header)
            request.state.principal = principal
            return await call_next(request)
        except PermissionError as pe:
            return JSONResponse(status_code=403, content={"error": str(pe)})
        except Exception as e:
            return JSONResponse(
                status_code=401,
                content={"error": f"Authentication rejected: {e!s}"},
            )
