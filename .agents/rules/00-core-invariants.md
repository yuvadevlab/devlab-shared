# Core Invariants — DevLab Shared

1. **250-Line Limit**: Every single file must stay strictly under 250 lines of code.
2. **Zero Internal Duplication**: Core contracts reside in `@yuva-devlab/shared-types` or base interfaces.
3. **Strict TypeScript & Tsup**: All packages must build with `tsup` producing both ESM (`.js`) and CJS (`.cjs`) with `.d.ts` declaration bundles.
