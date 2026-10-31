import React, { useEffect } from "react";
import type { Preview } from "@storybook/react";

// Import design tokens and scoped component styles
import "@yuva-devlab/tokens/styles.css";
import "@yuva-devlab/ui/styles.css";
import "./preview.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: true, // Controlled by our global theme toolbar
    },
    layout: "centered",
  },
  globalTypes: {
    brand: {
      name: "Brand",
      description: "Global brand theme for components",
      defaultValue: "orchestrai",
      toolbar: {
        icon: "paintbrush",
        items: [
          {
            value: "orchestrai",
            title: "OrchestrAI (Cyber Cyan)",
            right: "🤖",
          },
          {
            value: "finai",
            title: "FinAI (Emerald Green)",
            right: "📊",
          },
          {
            value: "portal",
            title: "DevLab Portal (Mint Obsidian)",
            right: "🛡️",
          },
          {
            value: "logs",
            title: "DevLab Logs (Matrix Amber)",
            right: "💻",
          },
          {
            value: "vitalai",
            title: "VitalAI (Volt Kinetic)",
            right: "💪",
          },
        ],
        dynamicTitle: true,
      },
    },

    themeMode: {
      name: "Theme Mode",
      description: "Light or Dark mode appearance",
      defaultValue: "light",
      toolbar: {
        icon: "mirror",
        items: [
          { value: "light", title: "Light Mode", icon: "sun" },
          { value: "dark", title: "Dark Mode", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const brand = context.globals.brand || "orchestrai";
      const themeMode = context.globals.themeMode || "light";

      useEffect(() => {
        const root = document.documentElement;
        root.setAttribute("data-brand", brand);
        root.setAttribute("data-theme", brand);
        if (themeMode === "dark") {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
      }, [brand, themeMode]);

      return (
        <div
          data-brand={brand}
          data-theme={brand}
          className={`dl-storybook-stage ${themeMode === "dark" ? "dark" : ""}`}
        >
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
