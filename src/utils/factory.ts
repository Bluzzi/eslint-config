import type { Awaitable, ConfigNames, OptionsConfig, TypedFlatConfigItem } from "#/types/type";
import type { Linter } from "eslint";
import { isPackageExists } from "local-pkg";
import { FlatConfigComposer } from "eslint-flat-config-utils";
import { javascript } from "#/configs/javascript/config";
import { typescript } from "#/configs/typescript/config";
import { stylistic } from "#/configs/stylistic/config";
import { node } from "#/configs/node";
import { logger } from "#/utils/logger";

export function eslintConfig(
  options: OptionsConfig = {},
  ...userConfigs: Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[] | FlatConfigComposer<any, any> | Linter.FlatConfig[]>[]
): FlatConfigComposer<TypedFlatConfigItem, ConfigNames> {
  const configs: Awaitable<TypedFlatConfigItem[]>[] = [];

  const enabled = {
    typescript: isPackageExists("typescript"),
  };

  // JS:
  logger.info("javascript - config enabled");
  configs.push(javascript());

  // TS:
  if (enabled.typescript) {
    logger.info("typescript - config enabled (typescript package found)");
    configs.push(typescript(options.typescript));
  }

  // Node:
  logger.info("node - config enabled");
  configs.push(node());

  // Stylistic:
  logger.info("stylistic - config enabled");
  configs.push(stylistic(options.stylistic));

  // Compose:
  const composer = new FlatConfigComposer<TypedFlatConfigItem, ConfigNames>();

  // eslint-disable-next-line ts/no-unsafe-argument
  void composer.append(...configs, ...userConfigs as any);
  void composer.renamePlugins({
    "@stylistic": "style",
    "@typescript-eslint": "ts",
    "n": "node",
  });

  return composer;
}
