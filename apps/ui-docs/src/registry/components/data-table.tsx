"use client";

import React from "react";
import { DataTable, Badge, type DataTableColumn } from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
  type PropDefinition,
  type CssClassDefinition,
} from "@/components/component-view";

interface UserRecord {
  [key: string]: unknown;
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "invited" | "suspended";
}

const sampleUsers: UserRecord[] = [
  {
    id: "1",
    name: "Alice Zhang",
    email: "alice@devlab.io",
    role: "Admin",
    status: "active",
  },
  {
    id: "2",
    name: "Bob Martin",
    email: "bob@devlab.io",
    role: "Developer",
    status: "active",
  },
  {
    id: "3",
    name: "Charlie Davis",
    email: "charlie@devlab.io",
    role: "Viewer",
    status: "invited",
  },
  {
    id: "4",
    name: "Dana White",
    email: "dana@devlab.io",
    role: "Developer",
    status: "suspended",
  },
  {
    id: "5",
    name: "Evan Wright",
    email: "evan@devlab.io",
    role: "Developer",
    status: "active",
  },
  {
    id: "6",
    name: "Fiona Gallagher",
    email: "fiona@devlab.io",
    role: "Viewer",
    status: "active",
  },
  {
    id: "7",
    name: "George Clark",
    email: "george@devlab.io",
    role: "Developer",
    status: "active",
  },
];

const columns: DataTableColumn<UserRecord>[] = [
  { key: "name", header: "Name", sortable: true },
  { key: "email", header: "Email", sortable: true },
  {
    key: "role",
    header: "Role",
    cell: (u: UserRecord) => <Badge variant="outline">{u.role}</Badge>,
  },
  {
    key: "status",
    header: "Status",
    cell: (u: UserRecord) => (
      <Badge variant={u.status === "active" ? "default" : "secondary"}>
        {u.status}
      </Badge>
    ),
  },
];

export default function DataTableDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "paginated",
      title: "Interactive Data Table with Pagination",
      description:
        "Full-featured table integrating column sorting, automatic client pagination, and result summaries.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md">
          <DataTable
            data={sampleUsers}
            columns={columns}
            pagination={{ pageSize: 3 }}
          />
        </div>
      ),
      codeSnippet: `<DataTable
  data={users}
  columns={[
    { key: "name", header: "Name", sortable: true },
    { key: "email", header: "Email", sortable: true },
    { key: "role", header: "Role", cell: (u) => <Badge>{u.role}</Badge> },
  ]}
  pagination={{ pageSize: 5 }}
/>`,
    },
    {
      id: "empty",
      title: "Zero-Data Empty State",
      description:
        "Renders responsive fallback empty states when no records match current filter criteria.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md">
          <DataTable data={[]} columns={columns} pagination={false} />
        </div>
      ),
      codeSnippet: `<DataTable data={[]} columns={columns} pagination={false} />`,
    },
  ];

  const propsList: PropDefinition[] = [
    {
      name: "data",
      type: "T[]",
      default: "[]",
      description: "Array of record items rendered as table rows.",
    },
    {
      name: "columns",
      type: "DataTableColumn<T>[]",
      default: "[]",
      description:
        "Column definitions with headers, keys, sorting, and cell renderers.",
    },
    {
      name: "pagination",
      type: "boolean | DataTablePaginationConfig",
      default: "true",
      description:
        "Enables or configures client/server pagination with page sizes and counters.",
    },
    {
      name: "rowKey",
      type: "keyof T | ((row, idx) => string | number)",
      default: '"id"',
      description: "Row identifier for React key tracking.",
    },
    {
      name: "onRowClick",
      type: "(row: T) => void",
      default: "—",
      description: "Optional click handler invoked when any row is pressed.",
    },
  ];

  const cssClasses: CssClassDefinition[] = [
    {
      name: ".dl-data-table-container",
      description: "Card container surrounding table and footer pagination.",
    },
    {
      name: ".dl-data-table-sort-btn",
      description:
        "Interactive column header button triggering ascending/descending sort.",
    },
    {
      name: ".dl-data-table-footer",
      description: "Bottom rail housing result summary and pagination buttons.",
    },
  ];

  return (
    <ComponentView
      title="Data Table"
      description="Enterprise tabular data view unifying Table, Pagination, and EmptyState primitives with sortable columns and custom cell renderers."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
