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
import { Button } from "@/components/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/collapsible";
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
    return <FileCode className="size-4 text-primary" />;
  }
  if (name.endsWith(".json")) {
    return <FileJson className="size-4 text-warning" />;
  }
  if (name.endsWith(".md") || name.endsWith(".mdx")) {
    return <FileText className="size-4 text-info" />;
  }
  return <File className="size-4 text-muted-foreground" />;
};

export const FileTreeNode = React.forwardRef<HTMLDivElement, FileTreeNodeProps>(
  ({ className, item, level = 0, selectedId, onSelect, ...props }, ref) => {
    const isFolder = item.type === "folder";
    const [isOpen, setIsOpen] = React.useState(item.defaultOpen ?? false);
    const isSelected = selectedId === item.id;

    const handleSelect = () => {
      onSelect?.(item);
    };

    const button = (
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={cn(
          "dl-file-tree__node",
          isSelected && "dl-file-tree__node--active",
        )}
        aria-current={isSelected ? "page" : undefined}
        data-level={level}
        onClick={handleSelect}
      >
        {isFolder && (
          <ChevronRight
            className={cn(
              "size-4 shrink-0 text-muted-foreground transition-transform",
              isOpen && "rotate-90",
            )}
          />
        )}
        <span className="dl-file-tree__icon">
          {isFolder ? (
            isOpen ? (
              <FolderOpen className="size-4 shrink-0" />
            ) : (
              <Folder className="size-4 shrink-0" />
            )
          ) : (
            getFileIcon(item.name)
          )}
        </span>
        <span className="dl-file-tree__name">{item.name}</span>
      </Button>
    );

    return (
      <div ref={ref} className={cn("flex flex-col", className)} {...props}>
        {isFolder ? (
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>{button}</CollapsibleTrigger>
            <CollapsibleContent className="dl-file-tree__children">
              {item.children?.map((child) => (
                <FileTreeNode
                  key={child.id}
                  item={child}
                  level={level + 1}
                  selectedId={selectedId}
                  onSelect={onSelect}
                />
              ))}
            </CollapsibleContent>
          </Collapsible>
        ) : (
          button
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
