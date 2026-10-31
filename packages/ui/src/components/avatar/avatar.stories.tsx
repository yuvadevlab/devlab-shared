import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  render: () => (
    <div className="dl-story-row">
      <Avatar>
        <AvatarImage
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
          alt="Sarah Connor"
        />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>YP</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>AI</AvatarFallback>
      </Avatar>
    </div>
  ),
};
