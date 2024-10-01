/* eslint-disable ts/no-unsafe-assignment */

import type { TypedFlatConfigItem } from "#/types/type";
import { nextjsPlugin } from "#/utils/extension";
import { configName } from "#/utils/naming";

// TODO: https://github.com/antfu/eslint-config/blob/main/src/configs/react.ts
// TODO: https://github.com/we-use/eslint-config/issues/13

export const react = (): TypedFlatConfigItem[] => {
  return [
    {
      name: configName("nextjs", "rules"),
      files: ["**/*.ts", "**/*.tsx"],
      plugins: {
        node: nextjsPlugin,
      },
      rules: {
      },
    },
  ];
};
