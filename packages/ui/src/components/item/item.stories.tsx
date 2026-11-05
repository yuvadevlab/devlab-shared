import type { Meta, StoryObj } from "@storybook/react";
import { Item } from "./item";
import { ItemContent } from "./item-content";
import { ItemDescription } from "./item-description";
import { ItemTitle } from "./item-title";

const meta: Meta<typeof Item> = {
  title: "Components/Item",
  component: Item,
};

export default meta;
type Story = StoryObj<typeof Item>;

/** Item with primary and supporting text. */
export const Default: Story = {
  render: () => (
    <Item className="dl-story-w-md">
      <ItemContent>
        <ItemTitle>Deployment completed</ItemTitle>
        <ItemDescription>Production · 2 minutes ago</ItemDescription>
      </ItemContent>
    </Item>
  ),
};
