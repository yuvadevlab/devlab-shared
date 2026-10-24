"""FastAPI dependencies and security guards."""

from collections.abc import Callable, Coroutine
from typing import Any

from fastapi import Header, HTTPException, Security, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from devlab_auth.client import DevLabAuth
from devlab_auth.models import AuthPrincipal

security = HTTPBearer(auto_error=False)
_default_auth: DevLabAuth | None = None


def get_devlab_auth() -> DevLabAuth:
    """Resolves or initializes the global DevLabAuth singleton."""
    global _default_auth
    if _default_auth is None:
        _default_auth = DevLabAuth()
    return _default_auth


def set_devlab_auth(auth_instance: DevLabAuth) -> None:
    """Configures a custom DevLabAuth instance globally."""
    global _default_auth
    _default_auth = auth_instance


async def get_current_principal(
    credentials: HTTPAuthorizationCredentials | None = Security(security),
    x_api_key: str | None = Header(None, alias="x-api-key"),
    x_devlab_key: str | None = Header(None, alias="x-devlab-key"),
) -> AuthPrincipal:
    """Universal FastAPI dependency: resolves user JWT or M2M key."""
    token = None
    if credentials and credentials.credentials:
        token = credentials.credentials.strip()
    elif x_api_key:
        token = x_api_key.strip()
    elif x_devlab_key:
        token = x_devlab_key.strip()

    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing authentication credentials (Bearer token or x-api-key)",
            headers={"WWW-Authenticate": "Bearer"},
        )

    auth = get_devlab_auth()
    try:
        return await auth.authenticate_async(token)
    except PermissionError as pe:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=str(pe)) from pe
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Authentication failed: {e!s}",
            headers={"WWW-Authenticate": "Bearer"},
        ) from e


def require_role(*roles: str) -> Callable[..., Coroutine[Any, Any, AuthPrincipal]]:
    """FastAPI dependency factory enforcing specified roles."""

    async def role_checker(
        principal: AuthPrincipal = Security(get_current_principal),
    ) -> AuthPrincipal:
        if not principal.has_role(*roles):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Insufficient role permissions. Required: {', '.join(roles)}",
            )
        return principal

    return role_checker


def require_scope(scope: str) -> Callable[..., Coroutine[Any, Any, AuthPrincipal]]:
    """FastAPI dependency factory enforcing specified permission scope."""

    async def scope_checker(
        principal: AuthPrincipal = Security(get_current_principal),
    ) -> AuthPrincipal:
        if not principal.has_scope(scope):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Missing required permission scope: '{scope}'",
            )
        return principal

    return scope_checker
