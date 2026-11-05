import * as React from "react";
import { Sparkles, Check, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu";
import { AIModel, ModelSelectorProps } from "./model-selector-types";

export type { AIModel, ModelSelectorProps };

export const DEFAULT_AI_MODELS: AIModel[] = [
  {
    id: "claude-3-5-sonnet",
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    description:
      "State-of-the-art coding, agentic reasoning, and complex planning.",
    tags: ["Reasoning", "200k context"],
  },
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    description: "High-speed multimodal intelligence with structured outputs.",
    tags: ["Multimodal", "Fast"],
  },
  {
    id: "gemini-2-0-flash",
    name: "Gemini 2.0 Flash",
    provider: "Google",
    description:
      "Next-gen multimodal speed with massive 1M token context window.",
    tags: ["1M context", "Realtime"],
  },
  {
    id: "deepseek-r1",
    name: "DeepSeek R1",
    provider: "DeepSeek",
    description:
      "Open-weights reasoning model with verifiable chain of thought.",
    tags: ["Reasoning", "Open"],
  },
];

/**
 * Model picker dropdown for LLMs and agent backends.
 * Features search filtering, capability tags, provider metadata, and custom trigger slots.
 *
 * @example
 * ```tsx
 * <ModelSelector
 *   value={model}
 *   onValueChange={setModel}
 * />
 * ```
 */
export const ModelSelector = React.forwardRef<
  HTMLDivElement,
  ModelSelectorProps
>(
  (
    {
      className,
      models = DEFAULT_AI_MODELS,
      value: propValue,
      defaultValue = models[0]?.id,
      onValueChange,
      placeholder = "Select model...",
      size = "md",
      disabled = false,
      ...props
    },
    ref,
  ) => {
    const isControlled = propValue !== undefined;
    const [selectedId, setSelectedId] = React.useState<string>(
      isControlled ? propValue : defaultValue || "",
    );
    const [isOpen, setIsOpen] = React.useState(false);
    const [query, setQuery] = React.useState("");

    const activeId = isControlled ? propValue : selectedId;
    const currentModel = models.find((m) => m.id === activeId);

    const handleSelect = (modelId: string) => {
      if (!isControlled) setSelectedId(modelId);
      onValueChange?.(modelId);
      setIsOpen(false);
      setQuery("");
    };

    return (
      <div ref={ref} className={cn("dl-model-selector", className)} {...props}>
        <DropdownMenu
          open={isOpen}
          onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) setQuery("");
          }}
        >
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size={size === "sm" ? "sm" : "default"}
              disabled={disabled}
            >
              <span className="flex min-w-0 items-center gap-2">
                {currentModel?.icon ?? <Bot className="size-4 shrink-0" />}
                <span className="truncate">
                  {currentModel ? currentModel.name : placeholder}
                </span>
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-72 p-0">
            <Command>
              {models.length > 3 && (
                <CommandInput
                  placeholder="Filter models..."
                  value={query}
                  onValueChange={setQuery}
                />
              )}
              <CommandList>
                <CommandEmpty>No matching models found.</CommandEmpty>
                <CommandGroup>
                  {models.map((model) => {
                    const isSelected = model.id === activeId;
                    const searchValue = [
                      model.name,
                      model.provider,
                      ...(model.tags ?? []),
                    ].join(" ");
                    return (
                      <CommandItem
                        key={model.id}
                        value={searchValue}
                        disabled={model.disabled}
                        onSelect={() => handleSelect(model.id)}
                        className="items-start"
                      >
                        {model.icon ?? <Sparkles className="mt-0.5 size-4" />}
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-1">
                            <span>{model.name}</span>
                            <span className="text-xs text-muted-foreground">
                              ({model.provider})
                            </span>
                          </span>
                          {model.description && (
                            <span className="block text-xs text-muted-foreground">
                              {model.description}
                            </span>
                          )}
                          {model.tags && model.tags.length > 0 && (
                            <span className="block text-xs text-muted-foreground">
                              {model.tags.join(" · ")}
                            </span>
                          )}
                        </span>
                        {isSelected && (
                          <Check
                            className="ml-auto size-4 shrink-0"
                            aria-hidden="true"
                          />
                        )}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  },
);
ModelSelector.displayName = "ModelSelector";
