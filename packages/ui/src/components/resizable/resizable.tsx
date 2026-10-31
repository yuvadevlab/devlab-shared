import * as React from "react";
import { GripVertical } from "lucide-react";
import { Group, Panel, Separator } from "react-resizable-panels";

import { cn } from "@/lib/utils";

export type ResizablePanelGroupProps = React.ComponentProps<typeof Group>;

/**
 * Container component managing resizable panel layouts.
 *
 * @example
 * ```tsx
 * <ResizablePanelGroup orientation="horizontal">
 *   <ResizablePanel defaultSize={50}>Left Content</ResizablePanel>
 *   <ResizableHandle withHandle />
 *   <ResizablePanel defaultSize={50}>Right Content</ResizablePanel>
 * </ResizablePanelGroup>
 * ```
 */
const ResizablePanelGroup = ({
  className,
  ...props
}: ResizablePanelGroupProps) => (
  <Group className={cn("dl-resizable-group", className)} {...props} />
);

export type ResizablePanelProps = React.ComponentProps<typeof Panel>;

/**
 * Individual resizable panel section within a `ResizablePanelGroup`.
 */
const ResizablePanel = Panel;

export type ResizableHandleProps = React.ComponentProps<typeof Separator> & {
  /** Renders a visual draggable grip icon inside the handle */
  withHandle?: boolean;
};

/**
 * Drag handle divider placed between resizable panels.
 */
const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: ResizableHandleProps) => (
  <Separator className={cn("dl-resizable-handle", className)} {...props}>
    {withHandle && (
      <div className="dl-resizable-grip">
        <GripVertical />
      </div>
    )}
  </Separator>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
