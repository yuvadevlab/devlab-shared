import fs from "node:fs";
import path from "node:path";

import chalk from "chalk";
import { Command } from "commander";
import prompts from "prompts";

import { findRepoRoot } from "@/utils/fs";
import { scaffoldPrimitive, scaffoldStyledComponent } from "@/utils/helpers";
import { toKebabCase, toPascalCase } from "@/utils/strings";

interface CreateComponentOptions {
  kind?: "component" | "primitive";
}

export const registerCreateComponentCommand = (program: Command): void => {
  program
    .command("component")
    .description("Generate a new UI component in packages/ui")
    .argument("[name]", "Component name (e.g. Button, complex-widget)")
    .option(
      "-k, --kind <kind>",
      "Kind of artifact: component | primitive",
      "component",
    )
    .action(
      async (nameArg: string | undefined, options: CreateComponentOptions) => {
        try {
          const answers = await prompts([
            {
              type: nameArg ? null : "text",
              name: "name",
              message: "Component name (e.g. Button, complex-widget):",
              validate: (value) =>
                value && value.trim().length > 0 ? true : "Name is required",
            },
            {
              type: options.kind ? null : "select",
              name: "kind",
              message: "What do you want to generate?",
              choices: [
                { title: "Styled UI Component", value: "component" },
                { title: "Headless Primitive", value: "primitive" },
              ],
              initial: 0,
            },
          ]);

          const name = nameArg || answers.name;
          const kind = (options.kind || answers.kind) as
            "component" | "primitive";

          if (!name) {
            console.error(chalk.red("Component name is required."));
            process.exit(1);
          }

          const kebab = toKebabCase(name);
          const pascal = toPascalCase(name);

          const root = findRepoRoot();
          const uiRoot =
            kind === "component"
              ? path.join(root, "packages", "ui", "src")
              : path.join(root, "packages", "primitives", "src");

          if (!fs.existsSync(uiRoot)) {
            console.error(
              chalk.red(
                `Could not find UI source at ${uiRoot}. Are you in the right repo?`,
              ),
            );
            process.exit(1);
          }

          if (kind === "component") {
            scaffoldStyledComponent(uiRoot, kebab, pascal);
          } else {
            scaffoldPrimitive(uiRoot, kebab, pascal);
          }
        } catch (err) {
          console.error(chalk.red((err as Error).message));
          process.exit(1);
        }
      },
    );
};
