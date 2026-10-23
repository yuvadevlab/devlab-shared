"""RS256 JWKS token validation against DevLab Portal."""

import os
from typing import Any

import jwt
from jwt import PyJWKClient

from devlab_auth.models import AuthPrincipal


class JwksValidator:
    """Cryptographic RS256 JWT validator using DevLab Portal JWKS endpoint."""

    def __init__(
        self,
        portal_url: str | None = None,
        jwks_uri: str | None = None,
        cache_ttl_seconds: int = 3600,
    ):
        base_url = portal_url or os.getenv("DEVLAB_PORTAL_API_URL") or "http://localhost:4000"
        self.jwks_uri = jwks_uri or f"{base_url.rstrip('/')}/.well-known/jwks.json"
        self._client = PyJWKClient(self.jwks_uri, cache_jwk_set=True, lifespan=cache_ttl_seconds)

    def validate_token(self, token: str) -> AuthPrincipal:
        """Validates an RS256 JWT and returns the parsed AuthPrincipal."""
        signing_key = self._client.get_signing_key_from_jwt(token)
        payload: dict[str, Any] = jwt.decode(
            token,
            signing_key.key,
            algorithms=["RS256"],
            options={"verify_aud": False},
        )

        sub = str(payload.get("sub") or payload.get("id") or "")
        email = payload.get("email")
        name = payload.get("name")
        role = payload.get("role")
        tenant_id = payload.get("tenant_id")
        app_id = payload.get("app_id")

        raw_scopes = payload.get("scopes") or []
        if isinstance(raw_scopes, str):
            scopes = [raw_scopes]
        elif isinstance(raw_scopes, list):
            scopes = [str(s) for s in raw_scopes]
        else:
            scopes = []

        if role and role not in scopes:
            scopes.append(role)

        return AuthPrincipal(
            id=sub,
            email=email,
            name=name,
            role=role,
            tenant_id=tenant_id,
            app_id=app_id,
            scopes=scopes,
            is_m2m=False,
            metadata=payload,
        )
