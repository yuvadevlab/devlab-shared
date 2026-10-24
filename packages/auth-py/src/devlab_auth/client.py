"""High-level DevLabAuth orchestrator combining JWKS and M2M validation."""

import os

from devlab_auth.jwks import JwksValidator
from devlab_auth.m2m import M2mApiKeyValidator
from devlab_auth.models import AuthPrincipal


class DevLabAuth:
    """Primary entry point for DevLab authentication verification."""

    def __init__(
        self,
        portal_url: str | None = None,
        required_app_id: str | None = None,
        jwks_cache_ttl: int = 3600,
        m2m_cache_ttl: int = 300,
    ):
        self.portal_url = (
            portal_url or os.getenv("DEVLAB_PORTAL_API_URL") or "http://localhost:4000"
        )
        self.jwks_validator = JwksValidator(
            portal_url=self.portal_url, cache_ttl_seconds=jwks_cache_ttl
        )
        self.m2m_validator = M2mApiKeyValidator(
            portal_url=self.portal_url,
            cache_ttl_seconds=m2m_cache_ttl,
            required_app_id=required_app_id,
        )

    async def authenticate_async(self, credential: str) -> AuthPrincipal:
        """Dispatches credential to M2M or JWKS validator asynchronously."""
        cred = credential.strip()
        if cred.startswith("Bearer "):
            cred = cred[7:].strip()

        if cred.startswith("dlk_"):
            return await self.m2m_validator.validate_key_async(cred)
        return self.jwks_validator.validate_token(cred)

    def authenticate_sync(self, credential: str) -> AuthPrincipal:
        """Dispatches credential to M2M or JWKS validator synchronously."""
        cred = credential.strip()
        if cred.startswith("Bearer "):
            cred = cred[7:].strip()

        if cred.startswith("dlk_"):
            return self.m2m_validator.validate_key_sync(cred)
        return self.jwks_validator.validate_token(cred)
