import type { ComponentMeta } from "@/config/meta-types";

export const AI_ELEMENTS_COMPONENTS: ComponentMeta[] = [
  {
    name: "Chain of Thought",
    slug: "chain-of-thought",
    href: "/components/chain-of-thought",
    category: "AI Elements",
    description:
      "Visual display for AI reasoning processes with duration timers and animated steps.",
    keywords: ["ai", "reasoning", "chain of thought", "thinking", "cot", "llm"],
  },
  {
    name: "Tool Call",
    slug: "tool-call",
    href: "/components/tool-call",
    category: "AI Elements",
    description:
      "Agent tool execution viewer with status badges, argument pills, and output payloads.",
    keywords: ["tool", "execution", "function calling", "agent", "tool-call"],
  },
  {
    name: "Trace",
    slug: "trace",
    href: "/components/trace",
    category: "AI Elements",
    description:
      "Hierarchical step execution spine with status icons and collapsible branches.",
    keywords: ["trace", "stepper", "steps", "timeline", "pipeline"],
  },
  {
    name: "Confirmation",
    slug: "confirmation",
    href: "/components/confirmation",
    category: "AI Elements",
    description:
      "Human-in-the-loop action approval card for sensitive or destructive agent operations.",
    keywords: [
      "confirm",
      "approval",
      "human in the loop",
      "guardrail",
      "action",
    ],
  },
  {
    name: "Checkpoint",
    slug: "checkpoint",
    href: "/components/checkpoint",
    category: "AI Elements",
    description:
      "Divider milestone marking key conversational turns with restore capabilities.",
    keywords: ["checkpoint", "restore", "snapshot", "history", "milestone"],
  },
  {
    name: "Code Block",
    slug: "code-block",
    href: "/components/code-block",
    category: "AI Elements",
    description:
      "Syntax-highlighted code container with line numbers and one-click copy.",
    keywords: ["code", "snippet", "syntax", "pre", "terminal", "copy"],
  },
  {
    name: "Prompt Input",
    slug: "prompt-input",
    href: "/components/prompt-input",
    category: "AI Elements",
    description:
      "Conversational textarea with multi-file attachments, model badges, and stop controls.",
    keywords: ["prompt", "input", "chat", "attachments", "llm", "textarea"],
  },
  {
    name: "Message",
    slug: "message",
    href: "/components/message",
    category: "AI Elements",
    description:
      "Conversation turn component for user, assistant, and system messages with avatar and actions.",
    keywords: ["message", "chat", "bubble", "turn", "feedback", "rating"],
  },
  {
    name: "Suggestion",
    slug: "suggestion",
    href: "/components/suggestion",
    category: "AI Elements",
    description: "Clickable starter prompt pills and follow-up inquiry chips.",
    keywords: ["suggestion", "pills", "quick prompts", "chips", "follow-up"],
  },
  {
    name: "Terminal",
    slug: "terminal",
    href: "/components/terminal",
    category: "AI Elements",
    description:
      "CLI container for displaying commands, streamed logs, and process outputs.",
    keywords: ["terminal", "console", "cli", "shell", "bash", "logs"],
  },
];
