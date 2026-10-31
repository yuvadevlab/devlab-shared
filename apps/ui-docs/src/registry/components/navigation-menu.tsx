"use client";

import React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  Flex,
  Stack,
  Grid,
} from "@yuva-devlab/ui";
import { ComponentView, ComponentVariant } from "@/components/component-view";

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
        <Flex align="center" justify="center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <Stack gap={2}>
                    <h4 className="dl-demo-heading">DevLab Architecture</h4>
                    <p className="dl-demo-desc">
                      Enterprise scoped CSS design system built on Radix UI
                      primitives.
                    </p>
                    <Stack
                      gap={1}
                      className="dl-demo-desc dl-demo-box--collapsible-header"
                    >
                      <a href="/components/button" className="dl-demo-code">
                        Button Component →
                      </a>
                      <a href="/components/select" className="dl-demo-desc">
                        Select & Filters →
                      </a>
                    </Stack>
                  </Stack>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <Grid columns={2} gap={2} className="dl-demo-desc">
                    <a
                      href="/components/button"
                      className="dl-demo-sidebar-btn"
                    >
                      Button
                    </a>
                    <a
                      href="/components/date-picker"
                      className="dl-demo-sidebar-btn"
                    >
                      Date Picker
                    </a>
                    <a
                      href="/components/dialog"
                      className="dl-demo-sidebar-btn"
                    >
                      Dialog
                    </a>
                    <a href="/components/table" className="dl-demo-sidebar-btn">
                      Table
                    </a>
                  </Grid>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </Flex>
      ),
      codeSnippet: `<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
      <NavigationMenuContent>
        <Stack gap="2">
          <h4>DevLab Architecture</h4>
          <p>Enterprise scoped CSS design system.</p>
        </Stack>
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
        <Flex align="center" justify="center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>API Reference</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <Stack gap={1} className="dl-demo-desc">
                    <span className="dl-demo-heading">Core Packages</span>
                    <a href="#primitives" className="dl-demo-desc">
                      @yuva-devlab/ui
                    </a>
                    <a href="#resilience" className="dl-demo-desc">
                      @yuva-devlab/resilience
                    </a>
                  </Stack>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <a href="#docs" className="dl-demo-sidebar-btn">
                  Documentation
                </a>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <a href="#changelog" className="dl-demo-sidebar-btn">
                  Changelog
                </a>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </Flex>
      ),
      codeSnippet: `<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>API Reference</NavigationMenuTrigger>
      <NavigationMenuContent>
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
