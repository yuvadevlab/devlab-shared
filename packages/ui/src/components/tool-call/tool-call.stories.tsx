import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Database, Terminal, Globe } from "lucide-react";
import { ToolCall } from "./tool-call";

const meta: Meta<typeof ToolCall> = {
  title: "AI Elements/ToolCall",
  component: ToolCall,
};

export default meta;
type Story = StoryObj<typeof ToolCall>;

export const Default: Story = {
  render: () => (
    <div className="dl-story-w-md">
      <ToolCall
        name="search_database"
        status="success"
        defaultOpen
        icon={<Database className="size-4 text-primary" />}
        args={{ table: "users", role: "admin", limit: 3 }}
        result={JSON.stringify(
          [
            { id: "usr_1", name: "Alice", email: "alice@devlab.io" },
            { id: "usr_2", name: "Bob", email: "bob@devlab.io" },
          ],
          null,
          2,
        )}
      />
    </div>
  ),
};

export const Running: Story = {
  render: () => (
    <div className="dl-story-w-md">
      <ToolCall
        name="fetch_live_telemetry"
        status="running"
        defaultOpen
        icon={<Globe className="size-4 text-primary" />}
        args={{ endpoint: "https://api.devlab.io/metrics", window: "5m" }}
      />
    </div>
  ),
};

export const ErrorState: Story = {
  render: () => (
    <div className="dl-story-w-md">
      <ToolCall
        name="execute_migration"
        status="error"
        defaultOpen
        icon={<Terminal className="size-4 text-destructive" />}
        args={{ migration: "20261104_add_fk.sql" }}
        result="Error: relation 'tenants' does not exist at line 4:12"
      />
    </div>
  ),
};
