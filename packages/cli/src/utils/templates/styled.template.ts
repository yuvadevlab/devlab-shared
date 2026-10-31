import { styledIndexTemplate } from "./index.template";

const styledComponentTemplate = (pascal: string, kebab: string): string => {
  const variantVar = `${kebab.replace(/-/g, "")}Variants`;
  return `
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const ${variantVar} = cva(
  "dl-${kebab}",
  {
    variants: {
      variant: {
        default: "dl-${kebab}--default",
      },
      size: {
        default: "dl-${kebab}--md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ${pascal}Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ${variantVar}> {
  asChild?: boolean;
}

const ${pascal} = React.forwardRef<HTMLDivElement, ${pascal}Props>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        className={cn(${variantVar}({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
${pascal}.displayName = "${pascal}";

export { ${pascal}, ${variantVar} };
`;
};

const styledTypesTemplate = (pascal: string): string => {
  return `
export interface ${pascal}CustomProps {
  // Add custom props here
}
`;
};

const styledStylesTemplate = (): string => {
  return `
// Scoped component classes are used directly with class-variance-authority.
`;
};

export const styledTestTemplate = (pascal: string, kebab: string): string => {
  return `
import React from "react";
import { render } from "@testing-library/react";
import { ${pascal} } from "@/utils/${kebab}";

describe("${pascal}", () => {
  it("renders without crashing", () => {
    render(<${pascal}>Hello World</${pascal}>);
  });
});
`;
};

export const styledTemplates = (
  pascal: string,
  kebab: string,
): Record<string, string> => {
  return {
    component: styledComponentTemplate(pascal, kebab),
    types: styledTypesTemplate(pascal),
    styles: styledStylesTemplate(),
    test: styledTestTemplate(pascal, kebab),
    index: styledIndexTemplate(kebab),
  };
};
