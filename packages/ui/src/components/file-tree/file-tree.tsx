import * as React from "react";
import {
  Folder,
  FolderOpen,
  FileCode,
  FileJson,
  FileText,
  File,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  FileTreeItem,
  FileTreeProps,
  FileTreeNodeProps,
} from "./file-tree-types";

export type { FileTreeItem, FileTreeProps, FileTreeNodeProps };

const getFileIcon = (name: string) => {
  if (
    name.endsWith(".ts") ||
    name.endsWith(".tsx") ||
    name.endsWith(".js") ||
    name.endsWith(".jsx")
  ) {
    return (
      <FileCode className="dl-file-tree__glyph dl-file-tree__glyph--primary" />
    );
  }
  if (name.endsWith(".json")) {
    return (
      <FileJson className="dl-file-tree__glyph dl-file-tree__glyph--warning" />
    );
  }
  if (name.endsWith(".md") || name.endsWith(".mdx")) {
    return (
      <FileText className="dl-file-tree__glyph dl-file-tree__glyph--info" />
    );
  }
  return <File className="dl-file-tree__glyph dl-file-tree__glyph--muted" />;
};

export const FileTreeNode = React.forwardRef<HTMLDivElement, FileTreeNodeProps>(
  ({ className, item, level = 0, selectedId, onSelect, ...props }, ref) => {
    const isFolder = item.type === "folder";
    const [isOpen, setIsOpen] = React.useState(item.defaultOpen ?? false);
    const isSelected = selectedId === item.id;

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (isFolder) {
        setIsOpen((prev) => !prev);
      }
      onSelect?.(item);
    };

    return (
      <div ref={ref} className={cn("dl-file-tree__item", className)} {...props}>
        <div
          className={cn(
            "dl-file-tree__node",
            isSelected && "dl-file-tree__node--active",
          )}
          onClick={handleClick}
        >
          {isFolder && (
            <ChevronRight
              className={cn(
                "dl-file-tree__chevron",
                isOpen && "dl-file-tree__chevron--open",
              )}
            />
          )}
          <span className="dl-file-tree__icon">
            {isFolder ? (
              isOpen ? (
                <FolderOpen className="dl-file-tree__glyph dl-file-tree__glyph--warning" />
              ) : (
                <Folder className="dl-file-tree__glyph dl-file-tree__glyph--warning" />
              )
            ) : (
              getFileIcon(item.name)
            )}
          </span>
          <span className="dl-file-tree__name">{item.name}</span>
        </div>

        {isFolder && isOpen && item.children && (
          <div className="dl-file-tree__children">
            {item.children.map((child) => (
              <FileTreeNode
                key={child.id}
                item={child}
                level={level + 1}
                selectedId={selectedId}
                onSelect={onSelect}
              />
            ))}
          </div>
        )}
      </div>
    );
  },
);
FileTreeNode.displayName = "FileTreeNode";

/**
 * Interactive workspace file and directory tree view for agent codebases.
 *
 * @example
 * ```tsx
 * <FileTree
 *   data={[{ id: "src", name: "src", type: "folder", children: [...] }]}
 *   onSelect={(file) => console.log(file)}
 * />
 * ```
 */
export const FileTree = React.forwardRef<HTMLDivElement, FileTreeProps>(
  (
    {
      className,
      data,
      selectedId: propSelectedId,
      defaultSelectedId,
      onSelect,
      ...props
    },
    ref,
  ) => {
    const isControlled = propSelectedId !== undefined;
    const [selected, setSelected] = React.useState<string | undefined>(
      isControlled ? propSelectedId : defaultSelectedId,
    );
    const activeSelectedId = isControlled ? propSelectedId : selected;

    const handleSelect = (item: FileTreeItem) => {
      if (!isControlled) setSelected(item.id);
      onSelect?.(item);
    };

    return (
      <div ref={ref} className={cn("dl-file-tree", className)} {...props}>
        {data.map((item) => (
          <FileTreeNode
            key={item.id}
            item={item}
            selectedId={activeSelectedId}
            onSelect={handleSelect}
          />
        ))}
      </div>
    );
  },
);
FileTree.displayName = "FileTree";
