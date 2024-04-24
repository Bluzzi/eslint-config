import type { ParamsTS } from "./type";
import type { TypedFlatConfigItem } from "#/types/type";
import { renameRules } from "#/utils/util";
import { antfuPlugin, typescriptParser, typescriptPlugin } from "../..";
import { configName } from "#/utils/naming";
import { cwd } from "node:process";

export function typescript({ parserOptions, tsconfigPath }: ParamsTS = {}): TypedFlatConfigItem[] {
  const isTypeChecked = Boolean(tsconfigPath);

  const parserOptionsObject = {
    ...isTypeChecked ? { project: tsconfigPath, tsconfigRootDir: cwd() } : {},
    ...parserOptions as any,
  };

  const recommendedRules = renameRules(typescriptPlugin.configs.strict!.rules!, { "@typescript-eslint": "ts" });
  const recommendedTypeCheckedRules = renameRules(typescriptPlugin.configs["strict-type-checked"]!.rules!, { "@typescript-eslint": "ts" });

  return [
    {
      name: configName("typescript", "plugins"),
      plugins: {
        antfu: antfuPlugin,
        ts: typescriptPlugin,
      },
    },
    {
      name: configName("typescript", "parsers"),
      languageOptions: {
        parser: typescriptParser,
        parserOptions: parserOptionsObject,
      },
    },
    {
      name: configName("typescript", "rules"),
      files: ["**/*.?([cm])[jt]s?(x)"],
      rules: {
        ...(isTypeChecked ? recommendedTypeCheckedRules : recommendedRules),
        "ts/ban-ts-comment": ["error", { "ts-expect-error": "allow-with-description" }],
        "ts/consistent-type-definitions": ["error", "type"],
        "ts/method-signature-style": ["error", "property"], // https://www.totaltypescript.com/method-shorthand-syntax-considered-harmful
        "ts/consistent-type-imports": ["error", { disallowTypeAnnotations: false, prefer: "type-imports", fixStyle: "separate-type-imports" }],
        "ts/no-import-type-side-effects": "error",
        "ts/no-require-imports": "error",
        "ts/no-invalid-void-type": "off", // for undefined generics types
        "no-loss-of-precision": "off",
        "ts/no-loss-of-precision": "error",
        "ts/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" }],
        "no-use-before-define": "off",
        "ts/no-use-before-define": ["error", { classes: false, functions: false, variables: true }],
      },
    },
    {
      name: configName("typescript-cjs", "rules"),
      files: ["**/*.js", "**/*.cjs"],
      rules: {
        "ts/no-require-imports": "off",
        "ts/no-var-requires": "off",
      },
    },
  ];
}
