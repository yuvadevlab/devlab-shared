"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@yuva-devlab/ui";
import { COMPONENTS_LIST, ALL_CATEGORIES } from "@/config/components-meta";
import { SearchTrigger } from "@/components/search-trigger";

const gettingStartedLinks = [
  { name: "Overview", href: "/" },
  { name: "Installation", href: "/docs/installation" },
  { name: "Design Tokens", href: "/docs/tokens" },
];

/**
 * Sidebar navigation showing the single search bar trigger and full categorized component index.
 */
export function Sidebar() {
  const pathname = usePathname();
  const activeRef = React.useRef<HTMLAnchorElement>(null);

  React.useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest" });
  }, [pathname]);

  return (
    <aside className="border-border bg-card/40 hidden h-full w-68 shrink-0 flex-col overflow-y-auto border-r p-4 md:flex scrollbar-thin">
      {/* Single Unified Search Bar Trigger */}
      <div className="mb-4">
        <SearchTrigger variant="sidebar" />
      </div>

      <div className="space-y-6">
        {/* Getting Started */}
        <div className="space-y-1.5">
          <h4 className="text-muted-foreground px-2.5 text-xs font-semibold tracking-wider uppercase">
            Getting Started
          </h4>
          <div className="flex flex-col gap-1">
            {gettingStartedLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  scroll={false}
                  ref={isActive ? activeRef : undefined}
                  className={cn(
                    "flex items-center rounded-md px-3 py-1.5 text-xs font-medium transition",
                    isActive
                      ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                      : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Component Categories */}
        {ALL_CATEGORIES.map((category) => {
          const items = COMPONENTS_LIST.filter((c) => c.category === category);
          if (items.length === 0) return null;

          return (
            <div key={category} className="space-y-1.5">
              <div className="flex items-center justify-between px-2.5 text-xs font-semibold tracking-wider uppercase text-muted-foreground">
                <h4>{category}</h4>
                <span className="text-[10px] font-mono opacity-60">
                  {items.length}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                {items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      scroll={false}
                      ref={isActive ? activeRef : undefined}
                      className={cn(
                        "flex items-center justify-between rounded-md px-3 py-1.5 text-xs font-medium transition",
                        isActive
                          ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                          : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                      )}
                    >
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
