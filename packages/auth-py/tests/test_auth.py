"""Unit tests for DevLab Python authentication models and scope verification."""

from devlab_auth.models import AuthPrincipal


def test_auth_principal_scopes() -> None:
    principal = AuthPrincipal(
        id="user-123",
        role="operator",
        scopes=["finai:read", "orchestrai:*"],
    )

    assert principal.has_scope("finai:read") is True
    assert principal.has_scope("finai:write") is False
    assert principal.has_scope("orchestrai:deploy") is True
    assert principal.has_role("operator") is True
    assert principal.has_role("admin") is False


def test_wildcard_superuser_principal() -> None:
    principal = AuthPrincipal(
        id="admin-999",
        role="super_admin",
        scopes=["*"],
    )

    assert principal.has_scope("anything:action") is True
    assert principal.has_role("any_role") is True
