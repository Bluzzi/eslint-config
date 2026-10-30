import type { TypedFlatConfigItem } from "#/types/type";
import { antfuPlugin, stylisticPlugin } from "#/utils/extension";

export type ParamsStylistic = {
  /**
   * Indentation level
   * Similar to the `tabWidth` and `useTabs` options in Prettier
   *
   * @default 2
   */
  indent?: number | "tab";

  /**
   * Quote style
   * Similar to `singleQuote` option in Prettier
   *
   * @default 'double'
   */
  quotes?: "single" | "double";

  /**
   * Whether to enable semicolons
   * Similar to `semi` option in Prettier
   *
   * @default true
   */
  semi?: boolean;

  /**
   * Whether to enable JSX
   *
   * @default false - enabled if "react" package is found
   */
  jsx?: boolean;
};

export const stylistic = ({ indent = 2, quotes = "double", semi = true, jsx = false }: ParamsStylistic = {}): TypedFlatConfigItem => {
  const config = stylisticPlugin.configs.customize({ indent, quotes, semi, jsx });

  return {
    name: "bluzzi/stylistic",
    plugins: {
      "antfu": antfuPlugin,
      "@stylistic": stylisticPlugin,
    },
    rules: {
      ...config.rules,

      "@stylistic/semi-style": "error",
      "@stylistic/no-extra-semi": "error",
      "@stylistic/function-call-spacing": "error",
      "@stylistic/generator-star-spacing": ["error", { before: false, after: true }],
      "@stylistic/implicit-arrow-linebreak": ["error", "beside"],
      "@stylistic/wrap-regex": "error",
      "@stylistic/nonblock-statement-body-position": "error",
      "@stylistic/arrow-parens": ["error", "always", { requireForBlockBody: false }],

      "@stylistic/jsx-self-closing-comp": ["error", { component: true, html: true }],
      "@stylistic/jsx-curly-brace-presence": ["error", { props: "never", children: "never" }],

      "@stylistic/multiline-ternary": ["error", "never"],

      "antfu/consistent-list-newline": "error",
    },
  };
};
