import type { Meta, StoryObj } from "@storybook/react";
import { Bubble } from "@/components/bubble";
import { MessageScroller } from "./message-scroller";

const meta: Meta<typeof MessageScroller> = {
  title: "AI Elements/Message Scroller",
  component: MessageScroller,
};

export default meta;
type Story = StoryObj<typeof MessageScroller>;

/** Appends new turns while keeping the viewport at the latest message. */
export const Default: Story = {
  render: () => (
    <MessageScroller className="dl-story-w-lg">
      <Bubble role="user">Summarize this pull request.</Bubble>
      <Bubble role="assistant">It updates the auth flow and adds tests.</Bubble>
    </MessageScroller>
  ),
};
