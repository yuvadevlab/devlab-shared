import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "./navigation-menu";

const meta: Meta<typeof NavigationMenu> = {
  title: "Components/NavigationMenu",
  component: NavigationMenu,
};

export default meta;
type Story = StoryObj<typeof NavigationMenu>;

export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Documentation</NavigationMenuTrigger>
          <NavigationMenuContent className="dl-p-4 dl-story-w-sm">
            <h4>Platform Architecture</h4>
            <p className="dl-text-sm dl-text-muted-foreground">
              Deep dive into Cascade Layers and dynamic token sizing.
            </p>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className="dl-p-2 dl-cursor-pointer">
            API Specs
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};
