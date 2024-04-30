import type { TypedFlatConfigItem } from "#/types/type";
import { nodePlugin } from "#/utils/extension";
import { configName } from "#/utils/naming";

export const node = (): TypedFlatConfigItem[] => {
  return [
    {
      name: configName("node", "rules"),
      plugins: {
        node: nodePlugin,
      },
      rules: {
        "node/no-deprecated-api": "error",
        "node/no-new-require": "error",
        "node/no-path-concat": "error",
      },
    },
  ];
};
