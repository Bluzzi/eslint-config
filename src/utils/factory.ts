import type { Awaitable, ConfigNames, OptionsConfig, TypedFlatConfigItem } from "#/types/type";
import type { Linter } from "eslint";
import { ignore } from "#/configs/ignore";
import { javascript } from "#/configs/javascript";
import { jsxA11y } from "#/configs/jsx-a11y";
import { nextjs } from "#/configs/nextjs";
import { node } from "#/configs/node";
import { perfectionist } from "#/configs/perfectionist";
import { react } from "#/configs/react";
import { stylistic } from "#/configs/stylistic";
import { tanstackQuery } from "#/configs/tanstack-query";
import { typescript } from "#/configs/typescript";
import { logger } from "#/utils/logger";
import { FlatConfigComposer } from "eslint-flat-config-utils";
import { isPackageExists } from "local-pkg";

export const eslintConfig = async (
  options: OptionsConfig = {},
  ...userConfigs: Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[] | FlatConfigComposer<any, any> | Linter.Config[]>[]
): Promise<FlatConfigComposer<TypedFlatConfigItem, ConfigNames>> => {
  const configs: TypedFlatConfigItem[] = [];
  const enabledConfigs: string[] = [];

  const enabled = {
    typescript: isPackageExists("typescript"),
    react: isPackageExists("react"),
    nextjs: isPackageExists("next"),
    jsxA11y: isPackageExists("react"),
    query: ["@tanstack/react-query", "@tanstack/vue-query", "@tanstack/solid-query", "@tanstack/svelte-query"].some((p) => isPackageExists(p)),
  };

  // Ignore:
  enabledConfigs.push("ignore");
  configs.push(ignore());

  // JS:
  enabledConfigs.push("javascript");
  configs.push(javascript());

  // TS:
  if (enabled.typescript) {
    enabledConfigs.push("typescript");
    configs.push(typescript());
  }

  // Node:
  enabledConfigs.push("node");
  configs.push(node());

  // Stylistic:
  enabledConfigs.push("stylistic");
  configs.push(stylistic({ ...options.stylistic, jsx: enabled.react }));

  // React:
  if (enabled.react) {
    enabledConfigs.push("react");
    configs.push(react());
  }

  // NextJS:
  if (enabled.nextjs) {
    enabledConfigs.push("nextjs");
    configs.push(nextjs());
  }

  // JSX a11y:
  if (enabled.jsxA11y) {
    enabledConfigs.push("jsx-a11y");
    configs.push(jsxA11y());
  }

  // Query:
  if (enabled.query) {
    enabledConfigs.push("tanstack-query");
    configs.push(tanstackQuery());
  }

  // Perfectionist:
  enabledConfigs.push("perfectionist");
  configs.push(perfectionist());

  // Log enabled configs:
  logger.info(`configs enabled: ${enabledConfigs.join(", ")}`);

  // Compose:
  const composer = new FlatConfigComposer<TypedFlatConfigItem, ConfigNames>();
  await composer.append(...configs, ...userConfigs as any as []);

  return composer;
};
