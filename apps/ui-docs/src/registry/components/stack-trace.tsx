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
    snippet: `  141 |   const rows = data.map((item, idx) => {
> 142 |     return columns.map((col) => col.render(item[col.key]));
  143 |   });`,
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
    functionName: "AppPage",
    fileName: "apps/portal/src/app/team/page.tsx",
    lineNumber: 34,
    columnNumber: 9,
  },
];

export default function StackTraceDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "default",
      title: "Interactive Error Trace",
      description:
        "Formatted stack trace with clickable frames that expand to reveal the code snippet.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md">
          <div className="w-full max-w-xl">
            <StackTrace
              errorType="TypeError"
              message="Cannot read properties of undefined (reading 'render')"
              frames={sampleFrames}
            />
          </div>
        </div>
      ),
      codeSnippet: `<StackTrace
  errorType="TypeError"
  message="Cannot read properties of undefined"
  frames={frames}
/>`,
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
      description: "Main error message string.",
    },
    {
      name: "frames",
      type: "StackFrameItem[]",
      default: "[]",
      description:
        "Array of stack frame records with functionName, fileName, and lineNumber.",
    },
    {
      name: "copyable",
      type: "boolean",
      default: "true",
      description: "Whether to render the copy stack button.",
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
        "Red-tinted error header with error type, message, and copy button.",
    },
    {
      name: ".dl-stack-frame",
      description:
        "Individual call frame row with location and expandable snippet.",
    },
  ];

  return (
    <ComponentView
      title="Stack Trace"
      description="Exception stack trace viewer displaying error types, messages, call frame locations, and expandable source code snippets."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
