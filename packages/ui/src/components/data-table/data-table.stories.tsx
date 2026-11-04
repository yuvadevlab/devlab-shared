import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "./data-table";
import { Badge } from "@/components/badge";

interface MockUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "developer" | "viewer";
  status: "active" | "invited" | "suspended";
}

const mockUsers: MockUser[] = [
  {
    id: "usr_1",
    name: "Alice Zhang",
    email: "alice@devlab.io",
    role: "admin",
    status: "active",
  },
  {
    id: "usr_2",
    name: "Bob Martin",
    email: "bob@devlab.io",
    role: "developer",
    status: "active",
  },
  {
    id: "usr_3",
    name: "Charlie Davis",
    email: "charlie@devlab.io",
    role: "viewer",
    status: "invited",
  },
  {
    id: "usr_4",
    name: "Dana White",
    email: "dana@devlab.io",
    role: "developer",
    status: "suspended",
  },
  {
    id: "usr_5",
    name: "Evan Wright",
    email: "evan@devlab.io",
    role: "developer",
    status: "active",
  },
  {
    id: "usr_6",
    name: "Fiona Gallagher",
    email: "fiona@devlab.io",
    role: "viewer",
    status: "active",
  },
  {
    id: "usr_7",
    name: "George Clark",
    email: "george@devlab.io",
    role: "developer",
    status: "active",
  },
  {
    id: "usr_8",
    name: "Hannah Abbott",
    email: "hannah@devlab.io",
    role: "viewer",
    status: "invited",
  },
  {
    id: "usr_9",
    name: "Ian Malcolm",
    email: "ian@devlab.io",
    role: "developer",
    status: "active",
  },
  {
    id: "usr_10",
    name: "Julia Roberts",
    email: "julia@devlab.io",
    role: "admin",
    status: "active",
  },
  {
    id: "usr_11",
    name: "Kevin Bacon",
    email: "kevin@devlab.io",
    role: "developer",
    status: "active",
  },
  {
    id: "usr_12",
    name: "Laura Croft",
    email: "laura@devlab.io",
    role: "admin",
    status: "active",
  },
];

const columns = [
  { key: "name", header: "Name", sortable: true },
  { key: "email", header: "Email", sortable: true },
  {
    key: "role",
    header: "Role",
    cell: (u: MockUser) => <Badge variant="outline">{u.role}</Badge>,
  },
  {
    key: "status",
    header: "Status",
    cell: (u: MockUser) => (
      <Badge variant={u.status === "active" ? "default" : "secondary"}>
        {u.status}
      </Badge>
    ),
  },
];

const meta: Meta<typeof DataTable> = {
  title: "Components/DataTable",
  component: DataTable,
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const Default: Story = {
  render: () => (
    <div className="dl-story-w-full">
      <DataTable
        data={mockUsers}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />
    </div>
  ),
};

export const WithoutPagination: Story = {
  render: () => (
    <div className="dl-story-w-full">
      <DataTable
        data={mockUsers.slice(0, 4)}
        columns={columns}
        pagination={false}
      />
    </div>
  ),
};

export const Empty: Story = {
  render: () => (
    <div className="dl-story-w-full">
      <DataTable data={[]} columns={columns} pagination={false} />
    </div>
  ),
};
