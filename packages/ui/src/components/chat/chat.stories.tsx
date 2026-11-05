import type { Meta, StoryObj } from "@storybook/react";
import { Chat } from "./chat";
import { ChatComposer } from "./chat-composer";
import { ChatMessages } from "./chat-messages";
import { Bubble } from "@/components/bubble";
import { Button } from "@/components/button";
import { Input } from "@/components/input";

const meta: Meta<typeof Chat> = {
  title: "AI Elements/Chat",
  component: Chat,
};

export default meta;
type Story = StoryObj<typeof Chat>;

/** Conversation shell with a message history and composer. */
export const Default: Story = {
  render: () => (
    <Chat className="dl-story-w-lg">
      <ChatMessages>
        <Bubble role="user">How do I fix this TypeScript error?</Bubble>
        <Bubble role="assistant">
          I can help. Share the diagnostic and the relevant code.
        </Bubble>
      </ChatMessages>
      <ChatComposer onSubmit={(event) => event.preventDefault()}>
        <Input aria-label="Message" placeholder="Ask a question..." />
        <Button type="submit">Send</Button>
      </ChatComposer>
    </Chat>
  ),
};
