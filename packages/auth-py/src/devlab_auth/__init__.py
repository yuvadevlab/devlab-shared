"""DevLab Authentication SDK for Python (FastAPI, LangChain, Agents)."""

from devlab_auth.client import DevLabAuth
from devlab_auth.jwks import JwksValidator
from devlab_auth.m2m import M2mApiKeyValidator
from devlab_auth.models import AuthPrincipal, M2mValidationResult

__all__ = [
    "AuthPrincipal",
    "DevLabAuth",
    "JwksValidator",
    "M2mApiKeyValidator",
    "M2mValidationResult",
]

try:
    from devlab_auth.fastapi import (
        get_current_principal,
        require_role,
        require_scope,
        set_devlab_auth,
    )
    from devlab_auth.middleware import DevLabAuthMiddleware

    __all__ += [
        "DevLabAuthMiddleware",
        "get_current_principal",
        "require_role",
        "require_scope",
        "set_devlab_auth",
    ]
except ImportError:
    pass
