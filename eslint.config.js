import js from "@eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import globals from "globals";
import tseslint from "typescript-eslint";

const rootDir = import.meta.dirname;

export default tseslint.config(
  {
    ignores: [
      "**/node_modules/**",
      "**/.venv/**",
      "**/dist/**",
      "**/.turbo/**",
      "**/coverage/**",
      "**/build/**",
      "**/.output/**",
      "**/*.d.ts",
      "**/tsup.config.*",
      "**/vite.config.*",
      "**/vitest.config.*",
      "**/test/setup.ts",
      "**/next.config.*",
      "**/postcss.config.*",
      "**/storybook-static/**",
      "**/.next/**",
    ],
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: rootDir,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      "@typescript-eslint/no-deprecated": "warn",
      "no-console": "warn",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/explicit-function-return-type": "off",
      /**
       * Hard 250-line rule per file.
       */
      "max-lines": [
        "error",
        {
          max: 250,
          skipComments: true,
          skipBlankLines: true,
        },
      ],
      /**
       * Maximum line length rule (100 characters).
       */
      "max-len": [
        "warn",
        {
          code: 100,
          tabWidth: 2,
          ignoreComments: true,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
        },
      ],
    },
  },
  {
    files: ["packages/cli/**/*.{ts,tsx}"],
    rules: {
      "no-console": "off",
    },
  },
  eslintPluginPrettier,
);
