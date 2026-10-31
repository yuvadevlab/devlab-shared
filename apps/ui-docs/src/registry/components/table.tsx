"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  StatusBadge,
  Button,
} from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
} from "@/components/component-view";

const basicRows = [
  {
    name: "Production Gateway",
    endpoint: "https://api.devlab.io/v1",
    status: "Active",
    p99: "42ms",
  },
  {
    name: "Staging Pipeline",
    endpoint: "https://staging.devlab.io",
    status: "Active",
    p99: "58ms",
  },
  {
    name: "Sandboxed Worker",
    endpoint: "https://sandbox.devlab.io",
    status: "Offline",
    p99: "—",
  },
];

const interactiveRows = [
  {
    id: "exec-98201",
    agent: "Code Synthesizer",
    model: "gemini-2.5-pro",
    status: "online",
    tokens: "14,820",
  },
  {
    id: "exec-98202",
    agent: "Forensic Debugger",
    model: "claude-3-7-sonnet",
    status: "busy",
    tokens: "8,430",
  },
  {
    id: "exec-98203",
    agent: "Policy Sentinel",
    model: "gemini-2.5-flash",
    status: "offline",
    tokens: "1,250",
  },
];

export default function TableDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "basic",
      title: "Basic Data Table",
      description:
        "AntD-inspired clean tabular presentation for structured records.",
      preview: (
        <div className="w-full border border-border rounded-lg overflow-hidden bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service Name</TableHead>
                <TableHead>Endpoint</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Latency (p99)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {basicRows.map((r) => (
                <TableRow key={r.name}>
                  <TableCell className="font-medium text-xs">
                    {r.name}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {r.endpoint}
                  </TableCell>
                  <TableCell className="text-xs">{r.status}</TableCell>
                  <TableCell className="text-right font-mono text-xs text-muted-foreground">
                    {r.p99}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ),
      codeSnippet: `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Service</TableHead>
      <TableHead>Endpoint</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Latency</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">Gateway</TableCell>
      <TableCell>https://api.devlab.io</TableCell>
      <TableCell>Active</TableCell>
      <TableCell className="text-right">42ms</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
    },
    {
      id: "interactive",
      title: "Interactive Table with Badges & Actions",
      description:
        "Enhanced dashboard table enriched with status badges and action trigger buttons.",
      preview: (
        <div className="w-full border border-border rounded-lg overflow-hidden bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-mono text-xs">Run ID</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead className="font-mono text-xs">
                  Engine Model
                </TableHead>
                <TableHead>Presence</TableHead>
                <TableHead className="text-right font-mono text-xs">
                  Tokens
                </TableHead>
                <TableHead className="text-right w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {interactiveRows.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-mono text-xs text-primary font-medium">
                    {r.id}
                  </TableCell>
                  <TableCell className="font-medium text-xs whitespace-nowrap">
                    {r.agent}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground whitespace-nowrap">
                    {r.model}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={r.status} />
                  </TableCell>
                  <TableCell className="font-mono text-xs text-right whitespace-nowrap">
                    {r.tokens}
                  </TableCell>
                  <TableCell className="text-right whitespace-nowrap">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs px-2.5"
                    >
                      Inspect
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ),
      codeSnippet: `<Table>
  <TableBody>
    <TableRow>
      <TableCell className="font-mono">exec-98201</TableCell>
      <TableCell className="font-medium">Code Synthesizer</TableCell>
      <TableCell><StatusBadge status="online" label="Online" /></TableCell>
      <TableCell className="text-right"><Button size="sm">Inspect</Button></TableCell>
    </TableRow>
  </TableBody>
</Table>`,
    },
  ];

  const propsList = [
    {
      name: "Table",
      type: "React.HTMLAttributes<HTMLTableElement>",
      default: "—",
      description:
        "Root table element wrapped in a horizontally scrollable container.",
    },
    {
      name: "TableHeader",
      type: "React.HTMLAttributes<HTMLTableSectionElement>",
      default: "—",
      description:
        "Table head element with bottom border and semantic typography.",
    },
    {
      name: "TableRow",
      type: "React.HTMLAttributes<HTMLTableRowElement>",
      default: "—",
      description: "Table row with hover highlight transitions.",
    },
    {
      name: "TableCell",
      type: "React.TdHTMLAttributes<HTMLTableCellElement>",
      default: "—",
      description: "Standard table cell with token padding and alignment.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-table-wrapper",
      description: "Overflow container enabling smooth horizontal scrolling.",
    },
    {
      name: ".dl-table",
      description: "Full-width table with border-collapse and font scaling.",
    },
    {
      name: ".dl-table__row",
      description: "Row with subtle bottom border and background hover state.",
    },
  ];

  return (
    <ComponentView
      title="Table"
      description="Data table component with responsive horizontal scrolling wrapper, multi-device breakpoints, and pure CSS styling. Showcasing basic data tables and interactive tables with status badges and action buttons."
      category="Data Display"
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
