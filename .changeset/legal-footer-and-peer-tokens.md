---
"@yuva-devlab/ui": minor
---

### Legal Footer Component & Peer Dependency Optimization

- **Legal Footer Component (`@yuva-devlab/ui`)**:
  - Added polymorphic `<LegalFooter />` component supporting 3 variants (`login`, `sidebar`, and `settings`).
  - Scoped styling via `.dl-legal-footer` under `@layer dl-components`, natively inheriting host application semantic tokens, typography, and dark mode palettes.
  - Added comprehensive Storybook stories (`legal-footer.stories.tsx`), documentation (`legal-footer.mdx`), and Next.js docs page (`apps/ui-docs`).

- **Peer Dependency Optimization (`@yuva-devlab/ui`)**:
  - Moved `@yuva-devlab/tokens` to `peerDependencies` (`>=2.0.0`) to enforce a single canonical token instance and prevent duplicate stylesheets in consumer applications.
  - Preserved `@yuva-devlab/tokens: "workspace:*"` in `devDependencies` for local monorepo compilation, testing, and Storybook dev.
