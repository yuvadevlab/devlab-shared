"use client";

import React from "react";
import {
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@yuva-devlab/ui";
import { THEME_CONFIGS } from "@yuva-devlab/tokens";
import { useTheme } from "../../../components/theme-provider";
import { Type, Sparkles, MoveHorizontal, Maximize2 } from "lucide-react";
import { SEMANTIC_COLORS, RADII } from "./tokens-data";

export default function TokensPage() {
  const { brand, fullTheme } = useTheme();
  const activeConfig = THEME_CONFIGS[brand] || THEME_CONFIGS.orchestrai;

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="border-border space-y-2 border-b pb-6">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            Design Tokens
          </Badge>
          <Badge variant="outline" className="text-xs">
            OKLCH Space
          </Badge>
          {fullTheme ? (
            <Badge className="bg-primary/20 text-primary border-primary/40 gap-1 text-xs">
              <Sparkles className="size-3" />
              <span>Full Theme Active</span>
            </Badge>
          ) : (
            <Badge variant="outline" className="text-muted-foreground text-xs">
              Color-Only Mode
            </Badge>
          )}
        </div>
        <h1 className="text-foreground text-3xl font-extrabold tracking-tight">
          Design Tokens & Palette
        </h1>
        <p className="text-muted-foreground max-w-2xl text-sm">
          DevLab UI design tokens are defined in{" "}
          <code className="text-primary font-mono text-xs">
            @yuva-devlab/tokens
          </code>
          . When <strong>Preview Full Theme</strong> is checked, fonts, control
          sizes, spacings, and corner radii dynamically reshape to match{" "}
          <strong>{activeConfig.label}</strong>.
        </p>
      </div>

      {/* Active Brand Metrics Pillar */}
      <section className="space-y-4">
        <h2 className="text-foreground flex items-center gap-2 text-xl font-bold tracking-tight">
          <Type className="text-primary size-5" />
          <span>Active Brand Typography & Density Specs</span>
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold">
                  Display Heading Font
                </CardTitle>
                <Badge variant="secondary" className="text-[10px]">
                  --font-display
                </Badge>
              </div>
              <p className="text-primary font-display mt-1 text-lg font-bold">
                {fullTheme
                  ? activeConfig.fontDisplay
                  : "System UI (Color-Only Mode)"}
              </p>
              <CardDescription className="mt-1 text-xs">
                {fullTheme
                  ? "Used for headings (h1, h2, h3) and high-impact hero titles."
                  : "Standard neutral typography. Enable 'Preview Full Theme' to view brand font."}
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold">
                  Body Sans & Mono Fonts
                </CardTitle>
                <Badge variant="secondary" className="text-[10px]">
                  --font-sans
                </Badge>
              </div>
              <p className="text-foreground mt-1 text-sm font-medium">
                {fullTheme ? activeConfig.fontSans : "System Sans-Serif"}
              </p>
              <code className="text-primary mt-1 block font-mono text-xs">
                {fullTheme ? activeConfig.fontMono : "ui-monospace, monospace"}
              </code>
              <CardDescription className="mt-1 text-xs">
                Body text, controls, tables, and terminal code elements.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold">
                  Density & Corner Radius
                </CardTitle>
                <Badge variant="secondary" className="text-[10px] uppercase">
                  {fullTheme ? activeConfig.density : "Standard"}
                </Badge>
              </div>
              <div className="mt-2 flex items-center gap-4">
                <div>
                  <span className="text-muted-foreground block text-xs">
                    Base Radius
                  </span>
                  <span className="text-primary text-lg font-bold">
                    {fullTheme ? activeConfig.radius : "0.5rem (Default)"}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-xs">
                    Control Height
                  </span>
                  <span className="text-foreground text-lg font-bold">
                    {fullTheme
                      ? activeConfig.density === "high"
                        ? "2.125rem"
                        : activeConfig.density === "spacious"
                          ? "2.625rem"
                          : "2.25rem"
                      : "2.25rem (Default)"}
                  </span>
                </div>
              </div>
              <CardDescription className="mt-1 text-xs">
                {fullTheme
                  ? "Brand responsive scale adapts touch targets and table rows."
                  : "Standard neutral density. Enable 'Preview Full Theme' to adapt."}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Semantic Color Swatches */}
      <section className="space-y-4">
        <h2 className="text-foreground flex items-center gap-2 text-xl font-bold tracking-tight">
          <Maximize2 className="text-primary size-5" />
          <span>Semantic Color Palette</span>
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
          {SEMANTIC_COLORS.map((color) => (
            <div
              key={color.name}
              className="border-border bg-card shadow-xs flex items-center gap-3 rounded-lg border p-3"
            >
              <div
                className="border-border/60 size-10 shrink-0 rounded-md border shadow-inner"
                style={{ backgroundColor: `var(${color.name})` }}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-foreground truncate text-xs font-bold">
                    {color.role}
                  </span>
                  <code className="text-primary font-mono text-[11px]">
                    {color.name}
                  </code>
                </div>
                <p className="text-muted-foreground mt-0.5 line-clamp-1 text-[11px]">
                  {color.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Radii Scale */}
      <section className="space-y-4">
        <h2 className="text-foreground flex items-center gap-2 text-xl font-bold tracking-tight">
          <MoveHorizontal className="text-primary size-5" />
          <span>Corner Radii Scale</span>
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {RADII.map((r) => (
            <div
              key={r.token}
              className="border-border bg-card shadow-xs flex flex-col items-center gap-3 rounded-lg border p-4 text-center"
            >
              <div
                className="border-primary bg-primary/10 shadow-xs size-14 border-2"
                style={{ borderRadius: `var(${r.token})` }}
              />
              <div>
                <code className="text-foreground font-mono text-xs font-semibold">
                  {r.token}
                </code>
                <span className="text-muted-foreground mt-0.5 block text-[11px]">
                  {r.example}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
