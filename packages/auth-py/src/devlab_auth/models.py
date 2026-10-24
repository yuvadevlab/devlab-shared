"""Data models for DevLab authentication principals, tokens, and verification results."""

from typing import Any

from pydantic import BaseModel, Field


class AuthPrincipal(BaseModel):
    """Represents an authenticated entity in the DevLab ecosystem."""

    id: str = Field(description="Unique subject or key identifier")
    email: str | None = Field(default=None, description="User email if user session")
    name: str | None = Field(default=None, description="Display name if available")
    role: str | None = Field(default=None, description="User role (operator/admin)")
    tenant_id: str | None = Field(default=None, description="Workspace or tenant identifier")
    app_id: str | None = Field(default=None, description="Originating application identifier")
    scopes: list[str] = Field(default_factory=list, description="Granted permission scopes")
    is_m2m: bool = Field(default=False, description="True if authenticated via M2M API key")
    metadata: dict[str, Any] = Field(default_factory=dict, description="Raw claims metadata")

    def has_scope(self, required_scope: str) -> bool:
        """Checks if principal has wildcard '*' or specific scope."""
        if "*" in self.scopes:
            return True
        if required_scope in self.scopes:
            return True
        prefix = required_scope.split(":")[0] + ":*"
        return prefix in self.scopes

    def has_role(self, *required_roles: str) -> bool:
        """Checks if principal has one of the required roles."""
        if self.role == "super_admin":
            return True
        return bool(self.role and self.role in required_roles)


class M2mValidationResult(BaseModel):
    """Result of an M2M API key validation against DevLab Portal."""

    valid: bool
    key_id: str | None = None
    name: str | None = None
    app_id: str | None = None
    scopes: list[str] = Field(default_factory=list)
    rate_limit_rpm: int | None = None
    error: str | None = None
