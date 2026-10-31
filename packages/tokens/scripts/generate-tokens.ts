/**
 * @file scripts/generate-tokens.ts
 * @description Generates all CSS stylesheets, VS Code custom data, and TypeScript constants from TS sources.
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import * as prettier from "prettier";
import { ALL_BRANDS } from "../src/brands";
import { BASE_TYPOGRAPHY_SCALE } from "../src/core/typography";
import { generateCssDataJson, generateTsConstants } from "./data-generator";
import {
  generatePresetCss,
  generateRootCss,
  generateStylesCss,
  generateUtilitiesCss,
} from "./root-generator";
import { generateBrandCss } from "./theme-generator";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "../../..");
const TOKENS_DIR = path.resolve(__dirname, "..");
const STYLES_DIR = path.join(TOKENS_DIR, "styles");
const THEMES_DIR = path.join(STYLES_DIR, "themes");
const GENERATED_DIR = path.join(TOKENS_DIR, "src/generated");

/**
 * Writes a file with automatic Prettier formatting applied.
 */
async function writeFormatted(
  filePath: string,
  content: string,
  parser: "typescript" | "css" | "json",
): Promise<void> {
  const config = await prettier.resolveConfig(filePath);
  const formatted = await prettier.format(content, { ...config, parser });
  fs.writeFileSync(filePath, formatted, "utf-8");
}

/**
 * Generates the W3C Cascade Layer typography utility class definitions.
 */
function generateTypographyCss(): string {
  const classMap: Record<string, string> = {
    display: ".dl-display",
    h1: ".dl-h1",
    h2: ".dl-h2",
    h3: ".dl-h3",
    h4: ".dl-h4",
    h5: ".dl-h5",
    h6: ".dl-h6",
    bodyLg: ".dl-body-lg",
    body: ".dl-body",
    bodySm: ".dl-body-sm",
    caption: ".dl-caption",
    code: ".dl-code",
    metric: ".dl-metric",
  };

  const rules: string[] = [];
  for (const [key, selector] of Object.entries(classMap)) {
    const token =
      BASE_TYPOGRAPHY_SCALE[key as keyof typeof BASE_TYPOGRAPHY_SCALE];
    if (!token) continue;
    rules.push(`${selector} {
  font-family: ${token.fontFamily};
  font-size: ${token.fontSize};
  font-weight: ${token.fontWeight};
  line-height: ${token.lineHeight};
  letter-spacing: ${token.letterSpacing};${token.tabularNums ? "\n  font-variant-numeric: tabular-nums;" : ""}
}`);
  }

  return `/**
 * @file styles/typography.css
 * @description Standard typography utility classes governed by W3C Cascade Layers.
 */

@layer dl-components {
${rules.join("\n\n")}
}
`;
}

/**
 * Master generator execution entry point.
 */
async function main(): Promise<void> {
  fs.mkdirSync(THEMES_DIR, { recursive: true });
  fs.mkdirSync(GENERATED_DIR, { recursive: true });

  // 1. Core Stylesheets formatted with Prettier
  await writeFormatted(
    path.join(STYLES_DIR, "root.css"),
    generateRootCss(),
    "css",
  );
  await writeFormatted(
    path.join(STYLES_DIR, "typography.css"),
    generateTypographyCss(),
    "css",
  );
  await writeFormatted(
    path.join(STYLES_DIR, "utilities.css"),
    generateUtilitiesCss(),
    "css",
  );
  await writeFormatted(
    path.join(STYLES_DIR, "styles.css"),
    generateStylesCss(ALL_BRANDS.map((b) => b.name)),
    "css",
  );
  await writeFormatted(
    path.join(STYLES_DIR, "preset.css"),
    generatePresetCss(),
    "css",
  );

  // 2. Brand Themes CSS formatted with Prettier
  for (const brand of ALL_BRANDS) {
    await writeFormatted(
      path.join(THEMES_DIR, `${brand.name}.css`),
      generateBrandCss(brand),
      "css",
    );
  }

  // 3. IDE Custom Data formatted with Prettier
  const cssData = { version: 1.1, ...generateCssDataJson() };
  await writeFormatted(
    path.join(ROOT_DIR, ".vscode/css-data.json"),
    JSON.stringify(cssData),
    "json",
  );
  await writeFormatted(
    path.join(TOKENS_DIR, "css-data.json"),
    JSON.stringify(cssData),
    "json",
  );

  // 4. TS Constants formatted with Prettier (respecting ESLint/Prettier rules)
  await writeFormatted(
    path.join(GENERATED_DIR, "index.ts"),
    generateTsConstants(),
    "typescript",
  );

  // eslint-disable-next-line no-console
  console.log(
    "Tokens and all CSS stylesheets generated and formatted successfully.",
  );
}

void main();
