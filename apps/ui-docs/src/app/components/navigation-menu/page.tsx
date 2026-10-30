"use client";

import React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@yuva-devlab/ui";
import {
  ComponentView,
  ComponentVariant,
} from "../../../components/component-view";

/**
 * Documentation page for NavigationMenu showcasing rich multi-column menus and simple links.
 */
export default function NavigationMenuDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "rich",
      title: "Rich Flyout Menus",
      description:
        "Multi-column navigation flyout cards with subtitles, links, and design system categories.",
      preview: (
        <div className="flex items-center justify-center p-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
                <NavigationMenuContent className="p-4 md:w-80">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground text-sm">
                      DevLab Architecture
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Enterprise scoped CSS design system built on Radix UI
                      primitives.
                    </p>
                    <div className="pt-2 border-t border-border flex flex-col gap-1 text-xs">
                      <a
                        href="/components/button"
                        className="text-primary hover:underline"
                      >
                        Button Component →
                      </a>
                      <a
                        href="/components/select"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        Select & Filters →
                      </a>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                <NavigationMenuContent className="p-4 md:w-80">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <a
                      href="/components/button"
                      className="p-2 rounded hover:bg-muted font-medium text-foreground"
                    >
                      Button
                    </a>
                    <a
                      href="/components/date-picker"
                      className="p-2 rounded hover:bg-muted font-medium text-foreground"
                    >
                      Date Picker
                    </a>
                    <a
                      href="/components/dialog"
                      className="p-2 rounded hover:bg-muted font-medium text-foreground"
                    >
                      Dialog
                    </a>
                    <a
                      href="/components/table"
                      className="p-2 rounded hover:bg-muted font-medium text-foreground"
                    >
                      Table
                    </a>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      ),
      codeSnippet: `<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
      <NavigationMenuContent className="p-4 md:w-80">
        <h4>DevLab Architecture</h4>
        <p>Enterprise scoped CSS design system.</p>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`,
    },
    {
      id: "simple",
      title: "Category Navigation Bar",
      description:
        "Top-level header layout combining hover-activated flyouts with direct navigation triggers.",
      preview: (
        <div className="flex items-center justify-center p-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>API Reference</NavigationMenuTrigger>
                <NavigationMenuContent className="p-3 w-56">
                  <div className="flex flex-col gap-1.5 text-xs">
                    <span className="font-semibold text-foreground">
                      Core Packages
                    </span>
                    <a
                      href="#primitives"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      @yuva-devlab/ui
                    </a>
                    <a
                      href="#resilience"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      @yuva-devlab/resilience
                    </a>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <a
                  href="#docs"
                  className="px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground"
                >
                  Documentation
                </a>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <a
                  href="#changelog"
                  className="px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground"
                >
                  Changelog
                </a>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      ),
      codeSnippet: `<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>API Reference</NavigationMenuTrigger>
      <NavigationMenuContent className="p-3 w-56">
        <span>Core Packages</span>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <a href="#docs">Documentation</a>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`,
    },
  ];

  const propsList = [
    {
      name: "NavigationMenu",
      type: "React.Component",
      default: "—",
      description: "Root navigation container orchestrating open flyouts.",
    },
    {
      name: "NavigationMenuTrigger",
      type: "React.Component",
      default: "—",
      description: "Trigger button that reveals the associated content card.",
    },
    {
      name: "NavigationMenuContent",
      type: "React.Component",
      default: "—",
      description: "Animated panel holding navigation links and content cards.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-navigation-menu",
      description: "Horizontal container for the navigation list.",
    },
    {
      name: ".dl-navigation-content",
      description: "Positioned flyout surface card.",
    },
  ];

  return (
    <ComponentView
      title="Navigation Menu"
      description="A collection of navigation links for website headers, with smooth dropdown panels inspired by Ant Design's Menu navigation."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
