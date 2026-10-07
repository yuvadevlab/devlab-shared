import React, { useEffect, useState } from "react";
import { Toaster as Sonner, toast } from "sonner";
import type { ThemeMode } from "../../theme-provider";

export type ToasterProps = React.ComponentProps<typeof Sonner>;
export type ToastTheme = ThemeMode;

/**
 * Toast notification viewport container configured with `@yuva-devlab/ui` design tokens.
 * Automatically synchronizes Sonner theme with root document dark/light mode
 * when not explicitly provided.
 *
 * @example
 * ```tsx
 * // In your root layout:
 * <Toaster />
 *
 * // In any component:
 * toast.success("Configuration saved successfully!");
 * toast.error("Failed to execute agent workflow.");
 * ```
 */
const Toaster = ({ theme: propTheme, ...props }: ToasterProps) => {
  const [resolvedTheme, setResolvedTheme] = useState<ThemeMode>("system");

  useEffect(() => {
    if (propTheme) return;
    const root = document.documentElement;
    const detect = () => {
      const isDark =
        root.classList.contains("dark") ||
        (root.getAttribute("data-theme")?.includes("dark") ?? false);
      const isLight =
        root.classList.contains("light") ||
        (root.getAttribute("data-theme")?.includes("light") ?? false);
      if (isDark) {
        setResolvedTheme("dark");
      } else if (isLight) {
        setResolvedTheme("light");
      } else {
        setResolvedTheme("system");
      }
    };

    detect();
    const observer = new MutationObserver(detect);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });
    return () => observer.disconnect();
  }, [propTheme]);

  return (
    <Sonner
      theme={propTheme ?? resolvedTheme}
      className="dl-toaster"
      toastOptions={{
        classNames: {
          toast: "dl-toast",
          description: "dl-toast__desc",
          actionButton: "dl-toast__action",
          cancelButton: "dl-toast__cancel",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
