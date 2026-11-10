# DevLab Shared Agent Guidelines

Master guidelines for AI agents developing on **DevLab Shared (Core Foundation Packages)**.

All agents must adhere to:

0. **Zero Commits Without Explicit Confirmation**: NEVER execute `git commit`, `git push`, or open pull requests without explicit, affirmative user confirmation. Directives such as "start" or "fix" authorize code implementation and testing only, NEVER committing.
1. **Organization Standards & .github Inheritance**:
   - Standardize all author and committer attribution to `yuva.devlab@gmail.com`.
   - Branch naming must strictly follow: `^(feat|fix|refactor|perf|chore|docs|test|ci|hotfix)/[a-z0-9-]+$`.
   - PRs must adhere to the 5-section standard in `yuvadevlab/.github` (Summary, Changes, How to Test, Proof of Verification, Risks).
   - Conventional Commits: `<type>(<optional-scope>): <imperative summary>`.
2. **Hard 250-Line Maximum Rule**: No source file (TypeScript or CSS) across `packages/*/src/` or `apps/*/src/` may exceed 250 lines. Decompose early at 200 lines.
3. **Detailed JSDoc Comments**: Every exported function, class, interface, and type MUST have comprehensive JSDoc.
4. **Strict Package Boundaries**: Zero circular internal workspace dependencies.
5. **Publishable Standards**: Every package must export clean ESM & CJS dist artifacts, types, and have public access (`publishConfig: { "access": "public" }`).
6. **Quality Gates & Conventional Commits**: Commits must pass commitlint (`feat(scope): ...`), ESLint, and Prettier before commit.
7. **Standardized Absolute Imports (`@/*`)**: All packages and apps must use `@/*` path aliases for internal source imports; zero relative parent traversals (`../`, `../../`).
8. **Pure Platform CSS Architecture**: All styling is driven by W3C Cascade Layers (`@layer dl-*`) and semantic tokens. Inline styles (`style={{ ... }}`) are strictly prohibited across components.
9. **Dynamic Multi-Brand Sizing**: Components must consume CSS variables (`--control-height-*`, `--space-*`, `--radius-*`) to adapt seamlessly across brand densities (e.g. compact telemetry in Logs, precision finance in FinAI, standard consumer in Portal/VitalAI/KnowledgeAI).
10. **Mandatory Documentation & Storybook Parity**: Whenever creating or updating any UI component in `packages/ui`, agents MUST simultaneously verify, add, or update its corresponding interactive documentation in `apps/ui-docs` and story suite in `apps/ui-storybook`. Component drift is prohibited.

## Specialized Agent Roster

- [Core Architect Agent](.agents/agents/core-architect.agent.md)
- [Design System & UI Specialist Agent](.agents/agents/design-system.agent.md)
- [Resilience & Intelligence Specialist Agent](.agents/agents/resilience-rag.agent.md)

## Core Invariants

- Detailed invariants documented in [`.agents/rules/00-core-invariants.md`](.agents/rules/00-core-invariants.md).
