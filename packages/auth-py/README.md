# DevLab Auth — Python SDK

Enterprise-grade authentication SDK and FastAPI security guards for the Yuva DevLab platform ecosystem.

## Features

- **Strict Typing:** 100% type-annotated with `py.typed` marker (PEP 561) and strict mypy compliance.
- **RS256 JWKS Verification:** Validates DevLab Portal SSO tokens without network overhead using local in-memory public key caching.
- **M2M API Key Validation:** Authenticates machine-to-machine callers (`dlk_...`) via DevLab Portal API with local TTL caching.
- **FastAPI Dependency Injection:** Drop-in `Depends(get_current_principal)`, `require_role`, and `require_scope` guards.
- **ASGI Middleware:** Global route protection via `DevLabAuthMiddleware`.

## Installation

```bash
# Using uv
uv add devlab-auth

# Using pip
pip install devlab-auth
```

## Quickstart (FastAPI)

```python
from fastapi import FastAPI, Depends
from devlab_auth import AuthPrincipal, get_current_principal, require_role

app = FastAPI()


@app.get("/api/v1/forecast")
async def get_forecast(principal: AuthPrincipal = Depends(get_current_principal)):
    return {
        "caller_id": principal.id,
        "is_service": principal.is_m2m,
        "role": principal.role,
    }


@app.post("/api/v1/admin/purge", dependencies=[Depends(require_role("admin", "super_admin"))])
async def admin_purge():
    return {"status": "purged"}
```

## Development & Verification

```bash
# Run test suite
uv run pytest

# Strict lint check & format
uv run ruff check .
uv run ruff format --check .

# Strict typechecking (zero any, strict mode)
uv run mypy src
```
