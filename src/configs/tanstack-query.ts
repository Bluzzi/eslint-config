import type { TypedFlatConfigItem } from "#/types/type";
import { queryPlugin } from "#/utils/extension";

export const tanstackQuery = (): TypedFlatConfigItem => {
  const [recommended] = queryPlugin.configs["flat/recommended"];

  return {
    name: "bluzzi/query",
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@tanstack/query": queryPlugin,
    },
    rules: {
      ...recommended!.rules,
    },
  };
};
