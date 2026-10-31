import { resolve } from "path";

import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es"],
      fileName: () => "index.js",
    },
    target: "node18",
    outDir: "dist",
    sourcemap: true,
    emptyOutDir: true,
    minify: false,
    rollupOptions: {
      external: [
        // Add your external dependencies here
        // e.g., "fs", "path", "child_process" for Node.js built-ins
        /^node:.*/, // Excludes all node: protocol imports
      ],
      output: {
        banner: "#!/usr/bin/env node",
        format: "es",
        exports: "auto",
      },
      treeshake: true,
    },
    ssr: true, // Important for Node.js builds
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
    conditions: ["node"],
  },
});
