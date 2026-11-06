import * as React from "react";

export interface FileTreeItem {
  id: string;
  name: string;
  type: "file" | "folder";
  children?: FileTreeItem[];
  defaultOpen?: boolean;
}

export interface FileTreeProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onSelect"
> {
  /** Root or recursive file tree data */
  data: FileTreeItem[];
  /** Currently selected file or folder ID */
  selectedId?: string;
  /** Selection callback */
  onSelect?: (item: FileTreeItem) => void;
  /** Initial selected ID */
  defaultSelectedId?: string;
}

export interface FileTreeNodeProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onSelect"
> {
  item: FileTreeItem;
  level?: number;
  selectedId?: string;
  onSelect?: (item: FileTreeItem) => void;
}
