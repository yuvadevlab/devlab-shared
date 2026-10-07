import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = "dark" | "light" | "system" | string;
export type ThemeMode = "light" | "dark" | "system";
export type Brand = "finai" | "orchestrai" | string;

export interface ThemeProviderProps {
  children: React.ReactNode;
  brand?: Brand;
  defaultTheme?: Theme;
  storageKey?: string;
  brandStorageKey?: string;
  attribute?: string;
  brandAttribute?: string;
  enableSystem?: boolean;
}

export interface ThemeProviderState {
  theme: Theme;
  brand: Brand;
  setTheme: (theme: Theme) => void;
  setBrand: (brand: Brand) => void;
  resolvedTheme: "dark" | "light";
}

const initialState: ThemeProviderState = {
  theme: "system",
  brand: "finai",
  setTheme: () => null,
  setBrand: () => null,
  resolvedTheme: "dark",
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

/**
 * Universal theme & brand provider for Yuva DevLab applications (FinAI, OrchestrAI).
 * Handles HTML class manipulation, data-theme and data-brand attributes,
 * system preferences, and localStorage persistence.
 */
export function ThemeProvider({
  children,
  brand: initialBrand = "finai",
  defaultTheme = "system",
  storageKey = "yd-theme",
  brandStorageKey = "yd-brand",
  attribute = "data-theme",
  brandAttribute = "data-brand",
  enableSystem = true,
  ...props
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(storageKey);
      if (stored) return stored;
    }
    return defaultTheme;
  });

  const [brand, setBrandState] = useState<Brand>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(brandStorageKey);
      if (stored) return stored;
    }
    return initialBrand;
  });

  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const root = window.document.documentElement;

    // Remove legacy theme classes
    root.classList.remove("light", "dark");

    let activeTheme = theme;
    if (theme === "system" && enableSystem) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      activeTheme = systemTheme;
    }

    const isDark =
      activeTheme.includes("dark") ||
      activeTheme === "orchestrai" ||
      (brand === "orchestrai" && activeTheme !== "light");

    const resolved = isDark ? "dark" : "light";
    setResolvedTheme(resolved);

    root.classList.add(resolved);

    // Apply data-brand attribute
    if (brandAttribute && brand) {
      root.setAttribute(brandAttribute, brand);
    }

    // Apply data-theme attribute
    if (attribute) {
      const combinedTheme =
        theme === "system"
          ? `${brand}-${resolved}`
          : theme.startsWith(brand)
            ? theme
            : `${brand}-${theme}`;
      root.setAttribute(attribute, combinedTheme);
    }
  }, [theme, brand, enableSystem, attribute, brandAttribute]);

  const value: ThemeProviderState = {
    theme,
    brand,
    setTheme: (newTheme: Theme) => {
      if (typeof window !== "undefined") {
        localStorage.setItem(storageKey, newTheme);
      }
      setThemeState(newTheme);
    },
    setBrand: (newBrand: Brand) => {
      if (typeof window !== "undefined") {
        localStorage.setItem(brandStorageKey, newBrand);
      }
      setBrandState(newBrand);
    },
    resolvedTheme,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

/**
 * Hook to access current theme & brand state and mutate the theme/brand.
 */
export const useTheme = (): ThemeProviderState => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

/**
 * ConfigProvider: Brand and Theme Configuration Provider for Yuva DevLab applications.
 */
export const ConfigProvider = ThemeProvider;
export type ConfigProviderProps = ThemeProviderProps;
export const useConfig = useTheme;
