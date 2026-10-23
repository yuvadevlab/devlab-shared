"""Machine-to-Machine (M2M) API key validation against DevLab Portal."""

import os
from typing import Any

import httpx
from cachetools import TTLCache

from devlab_auth.models import AuthPrincipal


class M2mApiKeyValidator:
    """Validates DevLab M2M API keys (dlk_...) with in-memory caching."""

    def __init__(
        self,
        portal_url: str | None = None,
        cache_ttl_seconds: int = 300,
        cache_maxsize: int = 1000,
        required_app_id: str | None = None,
    ):
        base_url = portal_url or os.getenv("DEVLAB_PORTAL_API_URL") or "http://localhost:4000"
        self.validate_url = f"{base_url.rstrip('/')}/api/v1/api-keys/validate"
        self.cache: TTLCache[str, AuthPrincipal] = TTLCache(
            maxsize=cache_maxsize, ttl=cache_ttl_seconds
        )
        self.required_app_id = required_app_id

    async def validate_key_async(self, api_key: str) -> AuthPrincipal:
        """Asynchronously validates an API key, using cache if available."""
        if api_key in self.cache:
            return self.cache[api_key]

        async with httpx.AsyncClient(timeout=4.0) as client:
            response = await client.post(
                self.validate_url,
                headers={
                    "Authorization": f"Bearer {api_key}",
                    "Content-Type": "application/json",
                },
            )
            if response.status_code != 200:
                raise ValueError(f"M2M validation failed with status {response.status_code}")

            data = response.json()
            if not data.get("valid"):
                raise ValueError(data.get("message") or "Invalid API key")

            principal = self._build_principal(data)
            self._check_app_id(principal)
            self.cache[api_key] = principal
            return principal

    def validate_key_sync(self, api_key: str) -> AuthPrincipal:
        """Synchronously validates an API key, using cache if available."""
        if api_key in self.cache:
            return self.cache[api_key]

        with httpx.Client(timeout=4.0) as client:
            response = client.post(
                self.validate_url,
                headers={
                    "Authorization": f"Bearer {api_key}",
                    "Content-Type": "application/json",
                },
            )
            if response.status_code != 200:
                raise ValueError(f"M2M validation failed with status {response.status_code}")

            data = response.json()
            if not data.get("valid"):
                raise ValueError(data.get("message") or "Invalid API key")

            principal = self._build_principal(data)
            self._check_app_id(principal)
            self.cache[api_key] = principal
            return principal

    def _build_principal(self, data: dict[str, Any]) -> AuthPrincipal:
        scopes = data.get("scopes", [])
        if isinstance(scopes, str):
            scopes = [scopes]
        return AuthPrincipal(
            id=str(data.get("keyId") or "m2m-key"),
            name=data.get("name"),
            app_id=data.get("appId"),
            role="service",
            scopes=scopes,
            is_m2m=True,
            metadata=data,
        )

    def _check_app_id(self, principal: AuthPrincipal) -> None:
        if not self.required_app_id:
            return
        if principal.has_scope("*") or principal.has_scope(f"{self.required_app_id}:*"):
            return
        if principal.app_id and principal.app_id == self.required_app_id:
            return
        raise PermissionError(
            f"API key belonging to '{principal.app_id}' lacks scope for '{self.required_app_id}'"
        )
