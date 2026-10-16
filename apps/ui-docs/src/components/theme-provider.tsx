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
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [brand, setBrand] = useState<Brand>("orchestrai");
  const [mode, setMode] = useState<Mode>("dark");

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-brand", brand);
    root.setAttribute("data-theme", brand);
  }, [brand]);

  useEffect(() => {
    const root = document.documentElement;
    if (mode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [mode]);

  const toggleMode = () => setMode((m) => (m === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider
      value={{ brand, setBrand, mode, setMode, toggleMode }}
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
