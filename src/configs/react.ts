import type { TypedFlatConfigItem } from "#/types/type";
import { reactHooksPlugin, reactPlugin } from "#/utils/extension";

export const react = (): TypedFlatConfigItem => {
  const recommended = reactPlugin.configs.recommended;

  return {
    name: "bluzzi/react",
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      ...recommended.plugins,
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
    settings: recommended.settings,
    rules: {
      ...recommended.rules,
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
    },
  };
};
