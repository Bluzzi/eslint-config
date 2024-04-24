import type { ParamsStylistic } from "./type";
import type { TypedFlatConfigItem } from "#/types/type";
import { antfuPlugin, stylisticPlugin } from "#/utils/extension";
import { configName } from "#/utils/naming";

export function stylistic({ indent = 2, quotes = "double", semi = true }: ParamsStylistic = {}): TypedFlatConfigItem[] {
  const config = stylisticPlugin.configs.customize({ pluginName: "style", indent, quotes, semi });

  return [{
    name: configName("stylistic", "rules"),
    plugins: {
      antfu: antfuPlugin,
      style: stylisticPlugin,
    },
    rules: {
      ...config.rules,

      "antfu/consistent-list-newline": "error",

      "curly": ["error", "multi-or-nest", "consistent"],
      "antfu/if-newline": "error",
      "antfu/top-level-function": "error",
    },
  }];
}
