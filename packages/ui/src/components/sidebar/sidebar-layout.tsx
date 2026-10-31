import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/sheet";
import { SIDEBAR_WIDTH_MOBILE, useSidebar } from "./sidebar-context";

/** Props for `Sidebar`. */
export type SidebarProps = React.ComponentProps<"div"> & {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
};

/**
 * Main collapsible navigation sidebar supporting floating, inset, desktop, and mobile sheet views.
 */
export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      side = "left",
      variant = "sidebar",
      collapsible = "offcanvas",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

    if (collapsible === "none") {
      return (
        <div
          className={cn("dl-sidebar dl-sidebar--static", className)}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      );
    }

    if (isMobile) {
      return (
        <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
          <SheetContent
            data-sidebar="sidebar"
            data-mobile="true"
            className="dl-sidebar-mobile [&>button]:hidden"
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
              } as React.CSSProperties
            }
            side={side}
          >
            <SheetHeader className="sr-only">
              <SheetTitle>Sidebar</SheetTitle>
              <SheetDescription>Displays the mobile sidebar.</SheetDescription>
            </SheetHeader>
            <div className="dl-sidebar-mobile-content">{children}</div>
          </SheetContent>
        </Sheet>
      );
    }

    return (
      <div
        ref={ref}
        className={cn("dl-sidebar", className)}
        data-state={state}
        data-collapsible={state === "collapsed" ? collapsible : ""}
        data-variant={variant}
        data-side={side}
      >
        <div className="dl-sidebar-desktop-spacer" />
        <div className="dl-sidebar-fixed" {...props}>
          <div data-sidebar="sidebar" className="dl-sidebar-inner">
            {children}
          </div>
        </div>
      </div>
    );
  },
);
Sidebar.displayName = "Sidebar";

/** Props for `SidebarRail`. */
export type SidebarRailProps = React.ComponentProps<"button">;

/** Hoverable/draggable rail divider on the edge of the sidebar for quick toggling. */
export const SidebarRail = React.forwardRef<
  HTMLButtonElement,
  SidebarRailProps
>(({ className, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();
  return (
    <button
      ref={ref}
      data-sidebar="rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn("dl-sidebar-rail", className)}
      {...props}
    />
  );
});
SidebarRail.displayName = "SidebarRail";

/** Props for `SidebarInset`. */
export type SidebarInsetProps = React.ComponentProps<"main">;

/** Main application container when paired with an inset or standard sidebar. */
export const SidebarInset = React.forwardRef<HTMLDivElement, SidebarInsetProps>(
  ({ className, ...props }, ref) => (
    <main ref={ref} className={cn("dl-sidebar-inset", className)} {...props} />
  ),
);
SidebarInset.displayName = "SidebarInset";

/** Props for `SidebarHeader`. */
export type SidebarHeaderProps = React.ComponentProps<"div">;

/** Header section at the top of a sidebar. */
export const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  SidebarHeaderProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="header"
    className={cn("dl-sidebar-header", className)}
    {...props}
  />
));
SidebarHeader.displayName = "SidebarHeader";

/** Props for `SidebarFooter`. */
export type SidebarFooterProps = React.ComponentProps<"div">;

/** Footer section pinned to the bottom of a sidebar. */
export const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  SidebarFooterProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="footer"
    className={cn("dl-sidebar-footer", className)}
    {...props}
  />
));
SidebarFooter.displayName = "SidebarFooter";

/** Props for `SidebarContent`. */
export type SidebarContentProps = React.ComponentProps<"div">;

/** Scrollable middle container holding sidebar navigation groups. */
export const SidebarContent = React.forwardRef<
  HTMLDivElement,
  SidebarContentProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="content"
    className={cn("dl-sidebar-content", className)}
    {...props}
  />
));
SidebarContent.displayName = "SidebarContent";
