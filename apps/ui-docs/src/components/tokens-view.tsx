import React from "react";
import { Badge } from "@yuva-devlab/ui";
import type {
  SemanticColorToken,
  RadiusToken,
  TypographyToken,
} from "../services/tokens-service";

export interface TokensViewProps {
  semanticColors: SemanticColorToken[];
  radii: RadiusToken[];
  typography: TypographyToken[];
}

/**
 * Pure React Server Component rendering design system tokens:
 * OKLCH color palettes, corner radii scales, and typography hierarchies.
 */
export function TokensView({
  semanticColors,
  radii,
  typography,
}: TokensViewProps): React.JSX.Element {
  return (
    <div className="space-y-12 pb-16">
      {/* Header */}
      <div className="space-y-2 border-b border-border pb-6">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            Design Tokens
          </Badge>
          <Badge variant="outline" className="text-xs">
            OKLCH Space
          </Badge>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          Design Tokens & Palette
        </h1>
        <p className="text-muted-foreground text-sm max-w-2xl">
          DevLab UI design tokens are defined in{" "}
          <code className="text-primary font-mono text-xs">
            @yuva-devlab/tokens
          </code>
          . Colors adapt dynamically when switching brands (OrchestrAI vs FinAI)
          or modes (Light vs Dark).
        </p>
      </div>

      {/* Semantic Color Swatches */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Semantic Color Palette
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {semanticColors.map((color) => (
            <div
              key={color.name}
              className="border border-border rounded-lg p-3 bg-card flex items-center gap-3 shadow-xs"
            >
              <div
                className="size-10 rounded-md border border-border/60 shrink-0 shadow-inner"
                style={{ backgroundColor: `var(${color.name})` }}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground truncate">
                    {color.role}
                  </span>
                  <code className="text-[11px] font-mono text-primary">
                    {color.name}
                  </code>
                </div>
                <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                  {color.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Corner Radii Scale */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Corner Radii Scale
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {radii.map((r) => (
            <div
              key={r.token}
              className="border border-border rounded-lg p-4 bg-card flex flex-col items-center gap-3 text-center"
            >
              <div
                className="size-14 border-2 border-primary bg-primary/10 shadow-xs"
                style={{ borderRadius: `var(${r.token})` }}
              />
              <div>
                <code className="text-xs font-mono font-semibold text-foreground">
                  {r.token}
                </code>
                <span className="block text-[11px] text-muted-foreground mt-0.5">
                  {r.example}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Typography Scale */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Typography Stacks
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {typography.map((t) => (
            <div
              key={t.token}
              className="border border-border rounded-lg p-4 bg-card space-y-1.5 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-foreground">
                  {t.role}
                </span>
                <code className="text-[11px] font-mono text-primary">
                  {t.token}
                </code>
              </div>
              <p className="text-xs text-muted-foreground font-mono">
                {t.value}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
