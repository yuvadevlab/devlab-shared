"use client";

import React, { useState } from "react";
import { FileTree, Stack, Text, type FileTreeItem } from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
  type PropDefinition,
  type CssClassDefinition,
} from "@/components/component-view";

const sampleFiles: FileTreeItem[] = [
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
    ],
  },
  { id: "turbo", name: "turbo.json", type: "file" },
];

const TREE_CODE = `import { useState } from "react";
import { FileTree, Stack, Text, type FileTreeItem } from "@yuva-devlab/ui";

const FILES: FileTreeItem[] = [
  {
    id: "apps",
    name: "apps",
    type: "folder",
    defaultOpen: true,
    children: [
      { id: "p-page", name: "page.tsx", type: "file" },
      { id: "d-package", name: "package.json", type: "file" },
    ],
  },
  { id: "turbo", name: "turbo.json", type: "file" },
];

export function WorkspaceFileTreeDemo() {
  const [selected, setSelected] = useState("p-page");

  return (
    <Stack gap={3}>
      <FileTree
        data={FILES}
        selectedId={selected}
        onSelect={(item) => setSelected(item.id)}
      />
      <Text variant="caption">Selected: {selected}</Text>
    </Stack>
  );
}`;

export default function FileTreeDocPage() {
  const [selected, setSelected] = useState<string>("p-page");

  const variants: ComponentVariant[] = [
    {
      id: "default",
      title: "Workspace Directory Tree",
      description:
        "Expandable directory folders with file extension icons and item selection tracking.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--sm">
          <Stack gap={3}>
            <FileTree
              data={sampleFiles}
              selectedId={selected}
              onSelect={(item) => setSelected(item.id)}
            />
            <Text variant="caption">Selected: {selected}</Text>
          </Stack>
        </div>
      ),
      codeSnippet: TREE_CODE,
    },
  ];

  const propsList: PropDefinition[] = [
    {
      name: "data",
      type: "FileTreeItem[]",
      default: "[]",
      description: "Hierarchical array of file and folder nodes.",
    },
    {
      name: "selectedId",
      type: "string",
      default: "—",
      description: "Controlled selected node ID.",
    },
    {
      name: "onSelect",
      type: "(item: FileTreeItem) => void",
      default: "—",
      description: "Callback fired when clicking any node in the tree.",
    },
  ];

  const cssClasses: CssClassDefinition[] = [
    {
      name: ".dl-file-tree",
      description: "Monospace container holding directory nodes.",
    },
    {
      name: ".dl-file-tree__node",
      description: "Interactive file or folder item row.",
    },
    {
      name: ".dl-file-tree__node--active",
      description: "Active highlighted selection state.",
    },
  ];

  return (
    <ComponentView
      title="File Tree"
      description="Hierarchical file and directory tree view for agent workspace browsing and code navigation."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
