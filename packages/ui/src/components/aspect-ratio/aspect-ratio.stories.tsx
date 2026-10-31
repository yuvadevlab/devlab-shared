import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AspectRatio } from "./aspect-ratio";

const meta: Meta<typeof AspectRatio> = {
  title: "Components/AspectRatio",
  component: AspectRatio,
};

export default meta;
type Story = StoryObj<typeof AspectRatio>;

export const Default: Story = {
  render: () => (
    <div className="dl-story-w-md">
      <AspectRatio ratio={16 / 9} className="dl-card dl-overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80"
          alt="Abstract Neon"
          className="dl-full"
        />
      </AspectRatio>
    </div>
  ),
};

export const Square: Story = {
  render: () => (
    <div className="dl-story-w-xs">
      <AspectRatio ratio={1 / 1} className="dl-card dl-overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80"
          alt="Cyber Grid"
          className="dl-full"
        />
      </AspectRatio>
    </div>
  ),
};
