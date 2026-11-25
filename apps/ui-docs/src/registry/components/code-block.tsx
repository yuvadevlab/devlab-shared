"use client";

import React from "react";
import { CodeBlock } from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
  type PropDefinition,
  type CssClassDefinition,
} from "@/components/component-view";

const sampleTs = `export function getApiKey(name: string): string {
  const key = process.env[name];
  if (!key) throw new Error(\`Key \${name} is missing\`);
  return key;
}`;

const BASIC_CODE = `import { CodeBlock } from "@yuva-devlab/ui";

const CODE = \`export function getApiKey(name: string): string {
  const key = process.env[name];
  if (!key) throw new Error(\\\`Key \\\${name} is missing\\\`);
  return key;
}\`;

export function CodeBlockDemo() {
  return (
    <CodeBlock
      filename="auth.ts"
      language="typescript"
      code={CODE}
      copyable
      lineNumbers
    />
  );
}`;

const SQL_CODE = `import { CodeBlock } from "@yuva-devlab/ui";

export function SqlCodeBlockDemo() {
  return (
    <CodeBlock
      language="sql"
      copyable={false}
      code='SELECT id, email, role FROM "users" WHERE "tenant_id" = $1;'
    />
  );
}`;

export default function CodeBlockDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "basic",
      title: "Header with Copy Action",
      description:
        "Syntax-colored code display featuring filename badge, language label, line numbers, and copy trigger.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md">
          <CodeBlock
            filename="auth.ts"
            language="typescript"
            code={sampleTs}
            copyable
            lineNumbers
          />
        </div>
      ),
      codeSnippet: BASIC_CODE,
    },
    {
      id: "minimal",
      title: "Minimal Inline SQL Block",
      description: "Syntax-highlighted SQL block without copy control.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md">
          <CodeBlock
            language="sql"
            copyable={false}
            code='SELECT id, email, role FROM "users" WHERE "tenant_id" = $1;'
          />
        </div>
      ),
      codeSnippet: SQL_CODE,
    },
  ];

  const propsList: PropDefinition[] = [
    {
      name: "code",
      type: "string",
      default: "—",
      description: "Code string to highlight, display, and copy.",
    },
    {
      name: "filename",
      type: "string",
      default: "—",
      description: "File path or title rendered in the top header bar.",
    },
    {
      name: "language",
      type: "string",
      default: '"tsx"',
      description: "Language hint driving syntax highlighting and badge label.",
    },
    {
      name: "copyable",
      type: "boolean",
      default: "true",
      description: "Whether to render the copy button in header.",
    },
    {
      name: "lineNumbers",
      type: "boolean",
      default: "false",
      description: "Whether line number column is displayed.",
    },
  ];

  const cssClasses: CssClassDefinition[] = [
    { name: ".dl-code-block", description: "Container card for code snippet." },
    {
      name: ".dl-code-block__header",
      description: "Header bar with filename and copy button.",
    },
    {
      name: ".dl-code-block__content",
      description: "Preformatted code scroll area with token variables.",
    },
  ];

  return (
    <ComponentView
      title="Code Block"
      description="Syntax-highlighted code snippet presentation container with filename badge, language label, line numbers, and one-click copy button."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
