import { existsSync } from "node:fs";
import { env } from "node:process";
import { isPackageExists } from "local-pkg";
import gitignore from "eslint-config-flat-gitignore";
import type { ConfigItem, OptionsConfig } from "#/types/type";
import { combine } from "#/utils/util";
import {
  javascript,
  node,
  stylistic,
  typescript,
} from "#/index";

const flatConfigProps: (keyof ConfigItem)[] = [
  "files",
  "ignores",
  "languageOptions",
  "linterOptions",
  "processor",
  "plugins",
  "rules",
  "settings"
];

/**
 * Construct an array of ESLint flat config items.
 */
export function eslintConfig(options: OptionsConfig & ConfigItem = {}, ...userConfigs: (ConfigItem | ConfigItem[])[]): ConfigItem[] {
  const {
    componentExts = [],
    gitignore: enableGitignore = true,
    isInEditor = !!((env.VSCODE_PID || env.JETBRAINS_IDE) && !env.CI),
    overrides = {},
    typescript: enableTypeScript = isPackageExists("typescript")
  } = options;

  const stylisticOptions = options.stylistic === false
    ? false
    : typeof options.stylistic === "object"
      ? options.stylistic
      : {};
  if (stylisticOptions && !("jsx" in stylisticOptions)) 
stylisticOptions.jsx = options.jsx ?? true;

  const configs: ConfigItem[][] = [];

  if (enableGitignore) {
    if (typeof enableGitignore !== "boolean") 
configs.push([gitignore(enableGitignore)]);
    else
      if (existsSync(".gitignore")) configs.push([gitignore()]);
  }

  // Base configs
  configs.push(
    ignore(),
    javascript({
      isInEditor,
      overrides: overrides.javascript
    }),
    node(),
    jsdoc({
      stylistic: stylisticOptions
    }),
    imports({
      // stylistic: stylisticOptions
    }),
    unicorn()
  );

  if (enableTypeScript) {
    configs.push(typescript({
      ...typeof enableTypeScript !== "boolean"
        ? enableTypeScript
        : {},
      componentExts,
      overrides: overrides.typescript
    }));
  }

  if (stylisticOptions) 
configs.push(stylistic(stylisticOptions));

  if (options.test ?? true) {
    configs.push(test({
      isInEditor,
      overrides: overrides.test
    }));
  }

  if (options.jsonc ?? true) {
    configs.push(
      jsonc({
        overrides: overrides.jsonc,
        stylistic: stylisticOptions
      }),
      sortPackageJson(),
      sortTsconfig()
    );
  }

  // User can optionally pass a flat config item to the first argument
  // We pick the known keys as ESLint would do schema validation
  const fusedConfig = flatConfigProps.reduce((acc, key) => {
    if (key in options) 
acc[key] = options[key] as any;
    return acc;
  }, {} as ConfigItem);
  if (Object.keys(fusedConfig).length) 
configs.push([fusedConfig]);

  const merged = combine(
    ...configs,
    ...userConfigs
  );

  return merged;
}