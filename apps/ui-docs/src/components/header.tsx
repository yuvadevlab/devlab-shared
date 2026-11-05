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
import { HeaderSettingsPopover } from "@/components/header-settings-popover";
import { BRAND_OPTIONS } from "@/components/header-brand-options";
import uiPackage from "@yuva-devlab/ui/package.json";

/**
 * Renders the documentation navigation and responsive theme controls.
 *
 * @returns The global documentation header.
 */
export function Header() {
  const { brand, setBrand, mode, toggleMode, fullTheme, setFullTheme } =
    useTheme();

  return (
    <header className="dl-docs-header">
      {/* Brand Logo & Title */}
      <Flex align="center" gap={3} className="dl-docs-header__brand-wrap">
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
      <Flex align="center" gap={3} className="dl-docs-header__toolbar">
        <div className="dl-docs-header__mobile-settings">
          {/* Brand Switcher */}
          <Flex
            align="center"
            gap={2}
            className="dl-docs-header__brand-select-wrap"
          >
            <span className="dl-docs-header__brand-label">Brand:</span>
            <Select
              value={brand}
              onValueChange={(val) => setBrand(val as Brand)}
            >
              <SelectTrigger className="dl-docs-header__select-trigger">
                <SelectValue placeholder="Select Brand" />
              </SelectTrigger>
              <SelectContent>
                {BRAND_OPTIONS.map((item) => (
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
              <span className="dl-docs-header__theme-text-short">
                Full Theme
              </span>
            </label>
          </div>
        </div>

        <HeaderSettingsPopover
          brand={brand}
          fullTheme={fullTheme}
          onBrandChange={setBrand}
          onFullThemeChange={setFullTheme}
        />

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

        <div className="dl-docs-header__actions">
          <div className="dl-docs-header__search-mobile">
            <SearchTrigger
              variant="header"
              className="dl-docs-header__search-mobile-trigger"
            />
          </div>
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
        </div>
      </Flex>
    </header>
  );
}
