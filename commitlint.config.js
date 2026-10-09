export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // New feature
        "fix", // Bug fix
        "docs", // Documentation
        "style", // Formatting, missing semi colons, etc
        "refactor", // Code refactoring
        "perf", // Performance improvements
        "test", // Adding tests
        "build", // Build system changes
        "ci", // CI configuration
        "chore", // Other changes
        "revert", // Revert a commit
      ],
    ],
    "scope-enum": [
      2,
      "always",
      [
        "core",
        "agent-core",
        "ai-client",
        "auth-server",
        "billing",
        "errors",
        "events",
        "rag",
        "regex",
        "resilience",
        "sdk",
        "semantic-cache",
        "ui",
        "tokens",
        "logger",
        "cli",
        "docs",
        "storybook",
        "ui-docs",
        "ui-storybook",
        "playground",
        "eslint-config",
        "prettier-config",
        "typescript-config",
        "config",
        "workspace",
        "release",
        "infra",
        "ci",
      ],
    ],
    "subject-case": [2, "never", ["upper-case"]],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "header-max-length": [2, "always", 100],
  },
};
