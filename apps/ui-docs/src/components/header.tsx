"use client";

import React from "react";
import Link from "next/link";
import {
  Layers,
  Moon,
  Sun,
  Sparkles,
  BookOpen,
  ExternalLink,
} from "lucide-react";
import {
  Button,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Switch,
  Flex,
} from "@yuva-devlab/ui";
import { useTheme, type Brand } from "@/components/theme-provider";
import { SearchTrigger } from "@/components/search-trigger";
import uiPackage from "@yuva-devlab/ui/package.json";

const BRANDS = [
  {
    value: "orchestrai",
    label: "⚡ OrchestrAI (Emerald Precision)",
  },
  {
    value: "finai",
    label: "💎 FinAI (Cyberpunk Neon)",
  },
  {
    value: "portal",
    label: "🔮 DevLab Portal (Deep Indigo)",
  },
  {
    value: "logs",
    label: "📊 DevLab Logs (Matrix Phosphor)",
  },
  {
    value: "vitalai",
    label: "💪 VitalAI (Volt Kinetic)",
  },
] as const;

export function Header() {
  const { brand, setBrand, mode, toggleMode, fullTheme, setFullTheme } =
    useTheme();

  return (
    <header className="dl-docs-header">
      {/* Brand Logo & Title */}
      <Flex align="center" gap={3}>
        <Link href="/" className="dl-docs-header__brand-link">
          <div className="dl-docs-header__logo">
            <Layers className="dl-docs-header__logo-icon" />
          </div>
          <span className="dl-docs-header__brand-name">DevLab UI</span>
          <span className="dl-docs-header__version-pill">
            v{uiPackage.version}
          </span>
        </Link>
      </Flex>

      {/* Global Search Bar (Ant Design Inspired) */}
      <div className="dl-docs-header__search-center">
        <SearchTrigger
          variant="header"
          className="dl-docs-header__search-trigger"
        />
      </div>

      {/* Center/Right Toolbar */}
      <Flex align="center" gap={3}>
        {/* Mobile Search Button */}
        <div className="dl-docs-header__search-mobile">
          <SearchTrigger variant="header" />
        </div>

        {/* Brand Switcher */}
        <Flex
          align="center"
          gap={2}
          className="dl-docs-header__brand-select-wrap"
        >
          <span className="dl-docs-header__brand-label">Brand:</span>
          <Select value={brand} onValueChange={(val) => setBrand(val as Brand)}>
            <SelectTrigger className="dl-docs-header__select-trigger">
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
        </Flex>

        {/* Full Theme Experience Flag */}
        <div className="dl-docs-header__theme-toggle">
          <Switch
            id="full-theme-toggle"
            checked={fullTheme}
            onCheckedChange={setFullTheme}
          />
          <label
            htmlFor="full-theme-toggle"
            className="dl-docs-header__theme-label"
            title="When enabled, adopts the selected brand's complete typography, sizing, spacing and corner radii across the entire documentation app."
          >
            <Sparkles className="dl-docs-header__sparkles" />
            <span className="dl-docs-header__theme-text-full">
              Preview Full Theme
            </span>
            <span className="dl-docs-header__theme-text-short">Full Theme</span>
          </label>
        </div>

        {/* Storybook Link */}
        <Button
          asChild
          variant="outline"
          size="sm"
          className="dl-docs-header__storybook-btn"
        >
          <a
            href="http://localhost:6006"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BookOpen className="dl-docs-header__icon-sm" />
            <span>Storybook</span>
            <ExternalLink className="dl-docs-header__icon-xs" />
          </a>
        </Button>

        {/* Dark/Light Mode Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMode}
          className="dl-docs-header__mode-btn"
          aria-label="Toggle dark/light mode"
        >
          {mode === "dark" ? (
            <Sun className="dl-docs-header__sun-icon" />
          ) : (
            <Moon className="dl-docs-header__icon-sm" />
          )}
        </Button>
      </Flex>
    </header>
  );
}
