"use client";

import React from "react";
import { StackTrace, type StackFrameItem } from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
  type PropDefinition,
  type CssClassDefinition,
} from "@/components/component-view";

const sampleFrames: StackFrameItem[] = [
  {
    id: "f-1",
    functionName: "renderRows",
    fileName: "packages/ui/src/components/data-table/data-table.tsx",
    lineNumber: 142,
    columnNumber: 21,
    snippet: `const rows = data.map((item) => {
  return columns.map((col) => col.render(item[col.key]));
});`,
  },
  {
    id: "f-2",
    functionName: "DataTable",
    fileName: "packages/ui/src/components/data-table/data-table.tsx",
    lineNumber: 86,
    columnNumber: 12,
  },
  {
    id: "f-3",
    functionName: "renderWithHooks",
    fileName: "node_modules/react-dom/cjs/react-dom.development.js",
    lineNumber: 14985,
    isInternal: true,
  },
];

const STACK_CODE = `import { StackTrace, type StackFrameItem } from "@yuva-devlab/ui";

const FRAMES: StackFrameItem[] = [
  {
    id: "f-1",
    functionName: "renderRows",
    fileName: "packages/ui/src/components/data-table/data-table.tsx",
    lineNumber: 142,
    columnNumber: 21,
    snippet: \`const rows = data.map((item) => {
  return columns.map((col) => col.render(item[col.key]));
});\`,
  },
  {
    id: "f-2",
    functionName: "renderWithHooks",
    fileName: "node_modules/react-dom/cjs/react-dom.development.js",
    lineNumber: 14985,
    isInternal: true,
  },
];

export function StackTraceDemo() {
  return (
    <StackTrace
      errorType="TypeError"
      message="Cannot read properties of undefined (reading 'render')"
      cause="Caused by empty column accessor definition in table schema."
      frames={FRAMES}
      collapsible
    />
  );
}`;

export default function StackTraceDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "default",
      title: "Interactive Error Trace",
      description:
        "Formatted exception banner with collapsible frames and syntax-highlighted code snippets.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--lg">
          <StackTrace
            errorType="TypeError"
            message="Cannot read properties of undefined (reading 'render')"
            cause="Caused by empty column accessor definition in table schema."
            frames={sampleFrames}
            collapsible
          />
        </div>
      ),
      codeSnippet: STACK_CODE,
    },
  ];

  const propsList: PropDefinition[] = [
    {
      name: "errorType",
      type: "string",
      default: '"Error"',
      description: "Class name of error exception.",
    },
    {
      name: "message",
      type: "string",
      default: "—",
      description: "Primary error message string.",
    },
    {
      name: "frames",
      type: "StackFrameItem[]",
      default: "[]",
      description: "Call frame items with optional highlighted code excerpts.",
    },
    {
      name: "collapsible",
      type: "boolean",
      default: "false",
      description: "Adds collapse toggle trigger in header actions.",
    },
  ];

  const cssClasses: CssClassDefinition[] = [
    {
      name: ".dl-stack-trace",
      description: "Outer card container with monospace font styling.",
    },
    {
      name: ".dl-stack-trace__header",
      description:
        "Destructive-tinted header with frame counter and copy trigger.",
    },
    {
      name: ".dl-stack-frame",
      description: "Call frame row with expandable highlighted code excerpt.",
    },
  ];

  return (
    <ComponentView
      title="Stack Trace"
      description="Exception stack trace viewer displaying error types, messages, call frames, and syntax-colored code excerpts."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
