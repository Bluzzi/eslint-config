/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Awaitable, ConfigNames, OptionsConfig, TypedFlatConfigItem } from "#/types/type";
import type { Linter } from "eslint";
import { ignore } from "#/configs/ignore";
import { javascript } from "#/configs/javascript/config";
import { nextjs } from "#/configs/nextjs";
import { node } from "#/configs/node";
import { perfectionist } from "#/configs/perfectionist";
import { react } from "#/configs/react";
import { stylistic } from "#/configs/stylistic/config";
import { typescript } from "#/configs/typescript/config";
import { logger } from "#/utils/logger";
import { FlatConfigComposer } from "eslint-flat-config-utils";
import { isPackageExists } from "local-pkg";

export const eslintConfig = async (
  options: OptionsConfig = {},
  ...userConfigs: Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[] | FlatConfigComposer<any, any> | Linter.Config[]>[]
): Promise<FlatConfigComposer<TypedFlatConfigItem, ConfigNames>> => {
  const configs: TypedFlatConfigItem[] = [];

  const enabled = {
    typescript: isPackageExists("typescript"),
    react: isPackageExists("react"),
    nextjs: isPackageExists("next"),
  };

  // Ignore:
  logger.info("ignore - config enabled");
  configs.push(ignore());

  // JS:
  logger.info("javascript - config enabled");
  configs.push(javascript());

  // TS: // TODO: v10
  // if (enabled.typescript) {
  //   logger.info("typescript - config enabled (typescript package found)");
  //   configs.push(typescript(options.typescript));
  // }

  // Node:
  logger.info("node - config enabled");
  configs.push(node());

  // Stylistic:
  logger.info("stylistic - config enabled");
  configs.push(stylistic({ ...options.stylistic, jsx: enabled.react }));

  // React:
  if (enabled.react) {
    logger.info("react - config enabled");
    configs.push(react());
  }

  // NextJS:
  if (enabled.nextjs) {
    logger.info("nextjs - config enabled");
    configs.push(nextjs());
  }

  // Perfectionist: // TODO: v10
  // logger.info("perfectionist - config enabled");
  // configs.push(perfectionist({ tsconfigPath: options.typescript?.tsconfigPath }));

  // Compose:
  const composer = new FlatConfigComposer<TypedFlatConfigItem, ConfigNames>();
  await composer.append(...configs, ...userConfigs as any);

  return composer;
};
