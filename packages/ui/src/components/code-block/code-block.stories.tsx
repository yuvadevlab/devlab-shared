import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { CodeBlock } from "./code-block";

const sampleTypeScript = `import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}`;

const meta: Meta<typeof CodeBlock> = {
  title: "Components/CodeBlock",
  component: CodeBlock,
  argTypes: {
    filename: { control: "text" },
    language: { control: "text" },
    copyable: { control: "boolean" },
    lineNumbers: { control: "boolean" },
  },
  args: {
    filename: "counter.tsx",
    language: "typescript",
    code: sampleTypeScript,
    copyable: true,
    lineNumbers: true,
  },
};

export default meta;
type Story = StoryObj<typeof CodeBlock>;

export const Default: Story = {
  render: (args) => (
    <div className="dl-story-w-md">
      <CodeBlock {...args} />
    </div>
  ),
};

export const WithoutHeader: Story = {
  render: () => (
    <div className="dl-story-w-md">
      <CodeBlock
        copyable={false}
        code={`SELECT * FROM "users" WHERE "role" = 'admin';`}
      />
    </div>
  ),
};

export const LineNumbers: Story = {
  render: () => (
    <div className="dl-story-w-md">
      <CodeBlock
        filename="schema.sql"
        language="sql"
        lineNumbers
        code={`CREATE TABLE devlab_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  role VARCHAR(64) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);`}
      />
    </div>
  ),
};
