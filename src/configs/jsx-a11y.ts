import type { TypedFlatConfigItem } from "#/types/type";
import { jsxA11yPlugin } from "#/utils/extension";

export const jsxA11y = (): TypedFlatConfigItem => {
  const strict = jsxA11yPlugin.flatConfigs.strict;

  return {
    name: "bluzzi/jsx-a11y",
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "jsx-a11y": jsxA11yPlugin,
    },
    rules: {
      ...strict.rules,
    },
  };
};
