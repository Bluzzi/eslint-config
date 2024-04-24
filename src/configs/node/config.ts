import type { TypedFlatConfigItem } from "#/types/type";
import { nodePlugin } from "#/utils/extension";
import { configName } from "#/utils/naming";

export function node(): TypedFlatConfigItem[] {
  return [{
    name: configName("node"),
    plugins: {
      node: nodePlugin,
    },
    rules: {
      "node/handle-callback-err": ["error", "^(err|error)$"],
      "node/no-deprecated-api": "error",
      "node/no-exports-assign": "error",
      "node/no-new-require": "error",
      "node/no-path-concat": "error",
      "node/prefer-global/buffer": ["error", "never"],
      "node/prefer-global/process": ["error", "never"],
      "node/process-exit-as-throw": "error",
    },
  }];
}
