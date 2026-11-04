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

export default function CodeBlockDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "basic",
      title: "Header with Copy Action",
      description:
        "Code display container featuring filename badge, language label, and one-click copy button.",
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
      codeSnippet: `<CodeBlock
  filename="auth.ts"
  language="typescript"
  code={codeSnippet}
  copyable
  lineNumbers
/>`,
    },
    {
      id: "minimal",
      title: "Minimal Inline SQL Block",
      description: "Code block without header banner for concise queries.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md">
          <CodeBlock
            copyable={false}
            code='SELECT id, email, role FROM "users" WHERE "tenant_id" = $1;'
          />
        </div>
      ),
      codeSnippet: `<CodeBlock code="SELECT * FROM users;" copyable={false} />`,
    },
  ];

  const propsList: PropDefinition[] = [
    {
      name: "code",
      type: "string",
      default: "—",
      description: "Code string to display and copy.",
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
      default: "—",
      description: "Programming language badge indicator.",
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
      description: "Preformatted code scroll area.",
    },
  ];

  return (
    <ComponentView
      title="Code Block"
      description="Syntax code snippet presentation container with filename badge, language label, line numbers, and one-click copy button."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
