"use client";

import React from "react";
import Link from "next/link";
import {
  Sun,
  Moon,
  ExternalLink,
  BookOpen,
  Layers,
  Sparkles,
} from "lucide-react";
import { useTheme, type Brand } from "./theme-provider";
import {
  Button,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Switch,
} from "@yuva-devlab/ui";

interface BrandOption {
  value: Brand;
  label: string;
}

const BRANDS: readonly BrandOption[] = [
  {
    value: "orchestrai",
    label: "OrchestrAI",
  },
  {
    value: "finai",
    label: "FinAI",
  },
  {
    value: "portal",
    label: "Portal",
  },
  {
    value: "logs",
    label: "Logs",
  },
  {
    value: "vitalai",
    label: "VitalAI",
  },
] as const;

export function Header() {
  const { brand, setBrand, mode, toggleMode, fullTheme, setFullTheme } =
    useTheme();

  return (
    <header className="border-border bg-card/80 sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b px-6 backdrop-blur-md">
      {/* Brand Logo & Title */}
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-bold tracking-tight"
        >
          <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg shadow-sm">
            <Layers className="size-4" />
          </div>
          <span className="text-foreground text-base">DevLab UI</span>
          <span className="border-border text-muted-foreground rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
            v1.1.0
          </span>
        </Link>
      </div>

      {/* Center/Right Toolbar */}
      <div className="flex items-center gap-3">
        {/* Brand Switcher */}
        <div className="flex items-center gap-1.5 text-xs font-medium">
          <span className="text-muted-foreground hidden sm:inline">Brand:</span>
          <Select value={brand} onValueChange={(val) => setBrand(val as Brand)}>
            <SelectTrigger className="h-8 w-40 text-xs font-medium">
              <SelectValue placeholder="Select Brand" />
            </SelectTrigger>
            <SelectContent>
              {BRANDS.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Full Theme Experience Flag */}
        <div className="flex items-center gap-2 rounded-lg border border-border/80 bg-muted/40 px-2.5 py-1 text-xs">
          <Switch
            id="full-theme-toggle"
            checked={fullTheme}
            onCheckedChange={setFullTheme}
          />
          <label
            htmlFor="full-theme-toggle"
            className="cursor-pointer select-none font-medium flex items-center gap-1.5"
            title="When enabled, adopts the selected brand's complete typography, sizing, spacing and corner radii across the entire documentation app."
          >
            <Sparkles className="size-3.5 text-primary" />
            <span className="hidden lg:inline">Preview Full Theme</span>
            <span className="lg:hidden hidden sm:inline">Full Theme</span>
          </label>
        </div>

        {/* Storybook Link */}
        <Button
          asChild
          variant="outline"
          size="sm"
          className="hidden h-8 gap-1.5 text-xs md:inline-flex"
        >
          <a
            href="http://localhost:6006"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BookOpen className="size-3.5" />
            <span>Storybook</span>
            <ExternalLink className="size-3 opacity-60" />
          </a>
        </Button>

        {/* Dark/Light Mode Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMode}
          className="size-8 rounded-md"
          aria-label="Toggle dark/light mode"
        >
          {mode === "dark" ? (
            <Sun className="size-4 text-amber-400" />
          ) : (
            <Moon className="size-4" />
          )}
        </Button>
      </div>
    </header>
  );
}
