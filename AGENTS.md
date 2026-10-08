# DevLab Shared Agent Guidelines

Master guidelines for AI agents developing on **DevLab Shared (Core Foundation Packages)**.

All agents must adhere to:

1. **Hard 250-Line Maximum Rule**: No package source file across `packages/*/src/` may exceed 250 lines. Decompose early at 200 lines.
2. **Detailed JSDoc Comments**: Every exported function, class, interface, and type MUST have comprehensive JSDoc.
3. **Strict Package Boundaries**: Zero circular internal workspace dependencies.
4. **Publishable Standards**: Every package must export clean ESM & CJS dist artifacts, types, and have public access.
5. **Quality Gates & Conventional Commits**: Commits must pass commitlint (`feat(scope): ...`).
