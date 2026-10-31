import path from "node:path";

import chalk from "chalk";

import { ensureDirExists, writeFileIfNotExists } from "@/utils/fs";
import { primitiveTemplates } from "@/utils/templates";

export const scaffoldPrimitive = (
  uiRoot: string,
  kebab: string,
  pascal: string,
): void => {
  const primitiveDir = path.join(uiRoot, kebab);
  const templates = primitiveTemplates(pascal, kebab);
  ensureDirExists(primitiveDir);

  const primitiveFile = path.join(primitiveDir, `${kebab}.primitive.tsx`);
  const primitiveTypeFile = path.join(
    primitiveDir,
    `${kebab}.primitive.types.ts`,
  );
  const primitiveIndexFile = path.join(primitiveDir, "index.ts");

  writeFileIfNotExists(primitiveFile, templates.component);
  writeFileIfNotExists(primitiveTypeFile, templates.type);

  writeFileIfNotExists(primitiveIndexFile, templates.index);

  console.log(
    `✅ Created primitive ${chalk.cyan(
      `${pascal}Primitive`,
    )} in ${chalk.gray(`packages/primitives/src/${kebab}`)}`,
  );
};
