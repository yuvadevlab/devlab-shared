import type { Meta, StoryObj } from "@storybook/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "./table";
import { StatusBadge } from "@/components/status-badge/status-badge";
import { Button } from "@/components/button/button";

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
};

export default meta;
type Story = StoryObj<typeof Table>;

const executions = [
  {
    id: "exec-98201",
    agent: "Code Synthesizer",
    role: "Fullstack Architect",
    model: "gemini-2.5-pro",
    status: "Completed",
    tokens: "14,820",
    runtime: "3.4s",
  },
  {
    id: "exec-98202",
    agent: "Forensic Debugger",
    role: "Core Diagnostic",
    model: "claude-3-7-sonnet",
    status: "Active",
    tokens: "8,430",
    runtime: "1.8s",
  },
  {
    id: "exec-98203",
    agent: "Policy Sentinel",
    role: "Security Guardrail",
    model: "gemini-2.5-flash",
    status: "Needs Approval",
    tokens: "1,250",
    runtime: "0.6s",
  },
  {
    id: "exec-98204",
    agent: "Database Migrator",
    role: "Data Infrastructure",
    model: "claude-3-5-haiku",
    status: "Failed",
    tokens: "22,400",
    runtime: "12.1s",
  },
  {
    id: "exec-98205",
    agent: "Telemetry Streamer",
    role: "Observability",
    model: "gemini-2.5-flash",
    status: "Offline",
    tokens: "0",
    runtime: "—",
  },
];

export const Default: Story = {
  render: () => (
    <div className="dl-story-w-xl">
      <Table>
        <TableCaption>
          Autonomous Agent Execution Fleet — Realtime Metrics
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="dl-story-mono">Execution ID</TableHead>
            <TableHead>Agent Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="dl-story-mono">Model Engine</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="dl-story-mono dl-text-right">
              Tokens Used
            </TableHead>
            <TableHead className="dl-text-right">Runtime</TableHead>
            <TableHead className="dl-text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {executions.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="dl-story-mono dl-whitespace-nowrap">
                {row.id}
              </TableCell>
              <TableCell className="dl-whitespace-nowrap">
                {row.agent}
              </TableCell>
              <TableCell className="dl-whitespace-nowrap">{row.role}</TableCell>
              <TableCell className="dl-story-mono dl-whitespace-nowrap">
                {row.model}
              </TableCell>
              <TableCell className="dl-whitespace-nowrap">
                <StatusBadge status={row.status} />
              </TableCell>
              <TableCell className="dl-story-mono dl-text-right dl-whitespace-nowrap">
                {row.tokens}
              </TableCell>
              <TableCell className="dl-text-right dl-whitespace-nowrap">
                {row.runtime}
              </TableCell>
              <TableCell className="dl-text-right dl-whitespace-nowrap">
                <Button
                  variant="ghost"
                  size="sm"
                  className="dl-story-action-btn"
                >
                  View Trace
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};
