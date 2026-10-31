"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { ThemeName } from "@yuva-devlab/tokens";

export type Brand = ThemeName;
export type Mode = "light" | "dark";

interface ThemeContextType {
  brand: Brand;
  setBrand: (brand: Brand) => void;
  mode: Mode;
  setMode: (mode: Mode) => void;
  toggleMode: () => void;
  fullTheme: boolean;
  setFullTheme: (enabled: boolean) => void;
  toggleFullTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [brand, setBrand] = useState<Brand>("orchestrai");
  const [mode, setMode] = useState<Mode>("dark");
  const [fullTheme, setFullTheme] = useState<boolean>(false);

  // Restore saved preferences on client mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedBrand = localStorage.getItem("yd-docs-brand") as Brand | null;
      if (savedBrand) setBrand(savedBrand);

      const savedMode = localStorage.getItem("yd-docs-mode") as Mode | null;
      if (savedMode) setMode(savedMode);

      const savedFull = localStorage.getItem("yd-docs-full-theme");
      if (savedFull !== null) setFullTheme(savedFull === "true");
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-brand", brand);
    root.setAttribute("data-theme", brand);
    if (typeof window !== "undefined") {
      localStorage.setItem("yd-docs-brand", brand);
    }
  }, [brand]);

  useEffect(() => {
    const root = document.documentElement;
    if (mode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("yd-docs-mode", mode);
    }
  }, [mode]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-full-theme", fullTheme ? "true" : "false");
    if (fullTheme) {
      root.classList.add("full-theme-active");
    } else {
      root.classList.remove("full-theme-active");
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("yd-docs-full-theme", fullTheme ? "true" : "false");
    }
  }, [fullTheme]);

  const toggleMode = () => setMode((m) => (m === "dark" ? "light" : "dark"));
  const toggleFullTheme = () => setFullTheme((prev) => !prev);

  return (
    <ThemeContext.Provider
      value={{
        brand,
        setBrand,
        mode,
        setMode,
        toggleMode,
        fullTheme,
        setFullTheme,
        toggleFullTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
