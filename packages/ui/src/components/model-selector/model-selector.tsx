import * as React from "react";
import { Sparkles, ChevronDown, Check, Search, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
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
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useImperativeHandle(
      ref,
      () => containerRef.current as HTMLDivElement,
    );

    const activeId = isControlled ? propValue : selectedId;
    const currentModel = models.find((m) => m.id === activeId);

    const handleSelect = (modelId: string) => {
      if (!isControlled) setSelectedId(modelId);
      onValueChange?.(modelId);
      setIsOpen(false);
      setQuery("");
    };

    // Close on outside click
    React.useEffect(() => {
      const handleOutsideClick = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false);
        }
      };
      if (isOpen) {
        document.addEventListener("mousedown", handleOutsideClick);
      }
      return () =>
        document.removeEventListener("mousedown", handleOutsideClick);
    }, [isOpen]);

    const filteredModels = React.useMemo(() => {
      if (!query.trim()) return models;
      const lower = query.toLowerCase();
      return models.filter(
        (m) =>
          m.name.toLowerCase().includes(lower) ||
          m.provider.toLowerCase().includes(lower) ||
          m.tags?.some((t) => t.toLowerCase().includes(lower)),
      );
    }, [models, query]);

    return (
      <div
        ref={containerRef}
        className={cn("dl-model-selector", className)}
        {...props}
      >
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen((prev) => !prev)}
          className={cn(
            "dl-model-selector__trigger",
            size === "sm" && "dl-model-selector__trigger--sm",
          )}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <div className="dl-model-selector__trigger-label">
            {currentModel?.icon ?? (
              <Bot
                style={{
                  width: "0.875rem",
                  height: "0.875rem",
                  color: "var(--primary)",
                }}
              />
            )}
            <span style={{ fontWeight: 600, color: "var(--foreground)" }}>
              {currentModel ? currentModel.name : placeholder}
            </span>
          </div>
          <ChevronDown
            className={cn(
              "dl-model-selector__chevron",
              isOpen && "dl-model-selector__chevron--open",
            )}
          />
        </button>

        {isOpen && (
          <div className="dl-model-selector__content" role="listbox">
            {models.length > 3 && (
              <div className="dl-model-selector__search-wrapper">
                <Search className="dl-model-selector__search-icon" />
                <input
                  type="text"
                  placeholder="Filter models..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="dl-model-selector__search"
                  style={{ width: "100%", paddingLeft: "1.75rem" }}
                  autoFocus
                />
              </div>
            )}

            <div className="dl-model-selector__list">
              {filteredModels.length === 0 ? (
                <div className="dl-model-selector__empty">
                  No matching models found
                </div>
              ) : (
                filteredModels.map((model) => {
                  const isSelected = model.id === activeId;
                  return (
                    <div
                      key={model.id}
                      role="option"
                      aria-selected={isSelected}
                      data-disabled={model.disabled}
                      onClick={() => !model.disabled && handleSelect(model.id)}
                      className={cn(
                        "dl-model-selector__item",
                        isSelected && "dl-model-selector__item--active",
                        model.disabled && "dl-cursor-not-allowed",
                      )}
                      style={model.disabled ? { opacity: 0.5 } : undefined}
                    >
                      <div className="dl-model-selector__item-info">
                        <div className="dl-model-selector__item-title">
                          {model.icon ?? (
                            <Sparkles
                              style={{
                                width: "0.75rem",
                                height: "0.75rem",
                                color: "var(--primary)",
                              }}
                            />
                          )}
                          <span>{model.name}</span>
                          <span className="dl-model-selector__provider">
                            ({model.provider})
                          </span>
                        </div>
                        {model.description && (
                          <div className="dl-model-selector__item-desc">
                            {model.description}
                          </div>
                        )}
                        {model.tags && model.tags.length > 0 && (
                          <div className="dl-model-selector__item-tags">
                            {model.tags.map((tag) => (
                              <span
                                key={tag}
                                className="dl-model-selector__tag"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      {isSelected && (
                        <Check className="size-4 text-primary shrink-0 mt-0.5" />
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    );
  },
);
ModelSelector.displayName = "ModelSelector";
