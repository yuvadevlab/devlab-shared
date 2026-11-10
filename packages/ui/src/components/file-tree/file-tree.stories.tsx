import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FileTree, FileTreeItem } from "./file-tree";

const meta: Meta<typeof FileTree> = {
  title: "AI Elements/FileTree",
  component: FileTree,
};

export default meta;
type Story = StoryObj<typeof FileTree>;

const workspaceFiles: FileTreeItem[] = [
  {
    id: "apps",
    name: "apps",
    type: "folder",
    defaultOpen: true,
    children: [
      {
        id: "portal",
        name: "portal",
        type: "folder",
        defaultOpen: true,
        children: [
          { id: "p-package", name: "package.json", type: "file" },
          { id: "p-page", name: "page.tsx", type: "file" },
        ],
      },
      {
        id: "ui-docs",
        name: "ui-docs",
        type: "folder",
        children: [{ id: "d-package", name: "package.json", type: "file" }],
      },
    ],
  },
  {
    id: "packages",
    name: "packages",
    type: "folder",
    defaultOpen: true,
    children: [
      {
        id: "ui",
        name: "ui",
        type: "folder",
        defaultOpen: true,
        children: [
          { id: "u-package", name: "package.json", type: "file" },
          { id: "u-readme", name: "README.md", type: "file" },
        ],
      },
      {
        id: "tokens",
        name: "tokens",
        type: "folder",
        children: [{ id: "t-package", name: "package.json", type: "file" }],
      },
    ],
  },
  { id: "turbo", name: "turbo.json", type: "file" },
  { id: "root-readme", name: "README.md", type: "file" },
];

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<string>("p-page");
    return (
      <div
        className="dl-story-w-md"
        style={{
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
        }}
      >
        <FileTree
          data={workspaceFiles}
          selectedId={selected}
          onSelect={(item) => setSelected(item.id)}
        />
        <div style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>
          Selected Node:{" "}
          <span
            style={{
              fontFamily: "var(--font-mono, monospace)",
              color: "var(--foreground)",
            }}
          >
            {selected}
          </span>
        </div>
      </div>
    );
  },
};
