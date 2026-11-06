import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageActions,
} from "./message";

const meta: Meta<typeof Message> = {
  title: "AI Elements/Message",
  component: Message,
};

export default meta;
type Story = StoryObj<typeof Message>;

export const Thread: Story = {
  render: () => (
    <div className="dl-story-w-lg flex flex-col gap-3">
      {/* User message */}
      <Message role="user">
        <MessageAvatar role="user" fallback="YP" />
        <div className="dl-message__body">
          <MessageContent>
            Can you review the migration for the tenant audit table?
          </MessageContent>
        </div>
      </Message>

      {/* Assistant reply */}
      <Message role="assistant">
        <MessageAvatar role="assistant" />
        <div className="dl-message__body">
          <MessageContent>
            I inspected the schema. The primary key and index on tenant_id look
            solid, but adding a compound index on (tenant_id, created_at) will
            boost timestamp filtering.
          </MessageContent>
          <MessageActions
            copyText="I inspected the schema..."
            onRetry={() => alert("Retrying")}
            onThumbsUp={() => alert("Liked")}
            onThumbsDown={() => alert("Disliked")}
          />
        </div>
      </Message>
    </div>
  ),
};
