import type { TypedFlatConfigItem } from "#/types/type";
import { reactHooksPlugin, reactPlugin } from "#/utils/extension";

export const react = (): TypedFlatConfigItem => {
  return {
    name: "bluzzi/react",
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      ...reactPlugin.configs.recommended.plugins,
      "react-hooks": reactHooksPlugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      sourceType: "module",
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
    },
  };
};
