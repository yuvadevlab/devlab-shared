"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, Stack, Flex } from "@yuva-devlab/ui";
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
    <aside className="dl-docs-sidebar">
      {/* Single Unified Search Bar Trigger */}
      <div className="dl-docs-sidebar__search-wrap">
        <SearchTrigger variant="sidebar" />
      </div>

      <Stack gap={6}>
        {/* Getting Started */}
        <Stack gap={2}>
          <h4 className="dl-docs-sidebar__group-title">Getting Started</h4>
          <Stack gap={1}>
            {gettingStartedLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  scroll={false}
                  ref={isActive ? activeRef : undefined}
                  className={cn(
                    "dl-docs-sidebar__link",
                    isActive && "dl-docs-sidebar__link--active",
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </Stack>
        </Stack>

        {/* Component Categories */}
        {ALL_CATEGORIES.map((category) => {
          const items = COMPONENTS_LIST.filter((c) => c.category === category);
          if (items.length === 0) return null;

          return (
            <Stack key={category} gap={2}>
              <Flex
                align="center"
                justify="between"
                className="dl-docs-sidebar__group-header"
              >
                <h4 className="dl-docs-sidebar__group-title">{category}</h4>
                <span className="dl-docs-sidebar__count">{items.length}</span>
              </Flex>
              <Stack gap={1}>
                {items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      scroll={false}
                      ref={isActive ? activeRef : undefined}
                      className={cn(
                        "dl-docs-sidebar__link",
                        isActive && "dl-docs-sidebar__link--active",
                      )}
                    >
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </Stack>
            </Stack>
          );
        })}
      </Stack>
    </aside>
  );
}
