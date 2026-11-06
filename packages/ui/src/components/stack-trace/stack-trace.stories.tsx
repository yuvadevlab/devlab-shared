import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { StackTrace, StackFrameItem } from "./stack-trace";

const meta: Meta<typeof StackTrace> = {
  title: "AI Elements/StackTrace",
  component: StackTrace,
};

export default meta;
type Story = StoryObj<typeof StackTrace>;

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
    snippet: `  33 |   return (
> 34 |     <DataTable columns={columns} data={users} />
  35 |   );`,
  },
  {
    id: "f-4",
    functionName: "processTicksAndRejections",
    fileName: "node:internal/process/task_queues",
    lineNumber: 95,
    isInternal: true,
  },
];

export const Default: Story = {
  render: () => (
    <div className="dl-story-w-lg">
      <StackTrace
        errorType="TypeError"
        message="Cannot read properties of undefined (reading 'render')"
        frames={sampleFrames}
      />
    </div>
  ),
};
