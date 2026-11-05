"use client";

import {
  Bubble,
  Button,
  Chat,
  ChatComposer,
  ChatMessages,
  Input,
} from "@yuva-devlab/ui";
import { ComponentView } from "@/components/component-view";
import { createExampleSource } from "@/lib/create-example-source";

/**
 * Interactive documentation for Chat.
 */
export default function ChatDoc() {
  return (
    <ComponentView
      title="Chat"
      category="AI Elements"
      description="Conversation surface with a message history and composer."
      preview={
        <Chat className="dl-story-w-lg">
          <ChatMessages>
            <Bubble role="user">How do I fix this TypeScript error?</Bubble>
            <Bubble role="assistant">
              Share the diagnostic and I can help.
            </Bubble>
          </ChatMessages>
          <ChatComposer onSubmit={(event) => event.preventDefault()}>
            <Input aria-label="Message" placeholder="Ask a question..." />
            <Button type="submit">Send</Button>
          </ChatComposer>
        </Chat>
      }
      codeSnippet={createExampleSource({
        imports: [
          "Bubble",
          "Button",
          "Chat",
          "ChatComposer",
          "ChatMessages",
          "Input",
        ],
        body: `<Chat className="mx-auto max-w-2xl">
  <ChatMessages>
    <Bubble role="user">How do I fix this TypeScript error?</Bubble>
    <Bubble role="assistant">Share the diagnostic and I can help.</Bubble>
  </ChatMessages>
  <ChatComposer onSubmit={(event) => event.preventDefault()}>
    <Input aria-label="Message" placeholder="Ask a question..." />
    <Button type="submit">Send</Button>
  </ChatComposer>
</Chat>`,
      })}
      propsList={[
        {
          name: "Chat",
          type: "HTMLAttributes<HTMLElement>",
          default: "—",
          description: "Accessible conversation surface.",
        },
        {
          name: "ChatMessages",
          type: "HTMLAttributes<HTMLDivElement>",
          default: "—",
          description: "Scrollable message history.",
        },
        {
          name: "ChatComposer",
          type: "FormHTMLAttributes<HTMLFormElement>",
          default: "—",
          description: "Message submission form.",
        },
      ]}
    />
  );
}
