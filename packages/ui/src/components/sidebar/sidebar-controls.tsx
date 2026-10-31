import * as React from "react";
import { PanelLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Separator } from "@/components/separator";
import { useSidebar } from "./sidebar-context";

/** Props for `SidebarTrigger`. */
export type SidebarTriggerProps = React.ComponentProps<typeof Button>;

/**
 * Button trigger toggling sidebar collapsed/expanded state.
 */
export const SidebarTrigger = React.forwardRef<
  React.ComponentRef<typeof Button>,
  SidebarTriggerProps
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn("dl-sidebar-trigger", className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeft />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
});
SidebarTrigger.displayName = "SidebarTrigger";

/** Props for `SidebarSeparator`. */
export type SidebarSeparatorProps = React.ComponentProps<typeof Separator>;

/**
 * Divider separating sidebar sections.
 */
export const SidebarSeparator = React.forwardRef<
  React.ComponentRef<typeof Separator>,
  SidebarSeparatorProps
>(({ className, ...props }, ref) => {
  return (
    <Separator
      ref={ref}
      data-sidebar="separator"
      className={cn("dl-sidebar-separator", className)}
      {...props}
    />
  );
});
SidebarSeparator.displayName = "SidebarSeparator";

/** Props for `SidebarInput`. */
export type SidebarInputProps = React.ComponentProps<typeof Input>;

/**
 * Styled text input tailored for use inside a sidebar header or filter bar.
 */
export const SidebarInput = React.forwardRef<
  React.ComponentRef<typeof Input>,
  SidebarInputProps
>(({ className, ...props }, ref) => {
  return (
    <Input
      ref={ref}
      data-sidebar="input"
      className={cn("dl-sidebar-input", className)}
      {...props}
    />
  );
});
SidebarInput.displayName = "SidebarInput";
