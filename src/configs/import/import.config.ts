import type { ConfigItem } from "#/utils/type";
import type { OptionsImport } from "./import.type";
import { pluginAntfu, pluginImport } from "#/extends/plugin";

/**
 * Import and export related rules like sorting, no-duplicate and others.
 */
export function imports({ stylistic = true }: OptionsImport = {}): ConfigItem[] {
  const stylisticRules: ConfigItem["rules"] = {
    "import/newline-after-import": ["error", { considerComments: true, count: 1 }]
  };

  return [
    {
      name: "bluzzi:import",
      plugins: {
        antfu: pluginAntfu,
        import: pluginImport as unknown
      },
      rules: {
        /**
         * @see https://github.com/antfu/eslint-plugin-antfu/tree/main/src/rules
         */
        "antfu/import-dedupe": "error",
        "antfu/no-import-node-modules-by-path": "error",

        /**
         * @see https://github.com/un-es/eslint-plugin-i/tree/fork-release/docs/rules
         */
        "import/first": "error",
        "import/no-duplicates": "error",
        "import/no-mutable-exports": "error",
        "import/no-named-default": "error",
        "import/no-self-import": "error",
        "import/no-webpack-loader-syntax": "error",
        "import/order": [
          "error",
          {
            groups: [
              "type",
              "builtin",

              "external",

              "object",

              "internal",
              "index",
              "parent",
              "sibling"
            ],
            alphabetize: {
              order: "asc"
            }
          }
        ],

        ...(stylistic ? stylisticRules : {})
      }
    }
  ];
}