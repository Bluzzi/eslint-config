import type { ParamsTS } from "./type";
import type { TypedFlatConfigItem } from "#/types/type";
import { GLOB_SRC, GLOB_TS, GLOB_TSX } from "#/utils/glob";
import { renameRules } from "#/utils/util";
import { antfuPlugin, typescriptParser, typescriptPlugin } from "../..";
import { configName } from "#/utils/naming";
import process from "node:process";

export async function typescript({ parserOptions, tsconfigPath }: ParamsTS = {}): Promise<TypedFlatConfigItem[]> {
  const files = [GLOB_SRC];

  const filesTypeAware = [GLOB_TS, GLOB_TSX];
  const isTypeAware = !!tsconfigPath;

  const typeAwareRules: TypedFlatConfigItem["rules"] = {
    "dot-notation": "off",
    "no-implied-eval": "off",
    "no-throw-literal": "off",
    "ts/await-thenable": "error",
    "ts/dot-notation": ["error", { allowKeywords: true }],
    "ts/no-floating-promises": "error",
    "ts/no-for-in-array": "error",
    "ts/no-implied-eval": "error",
    "ts/no-misused-promises": "error",
    "ts/no-throw-literal": "error",
    "ts/no-unnecessary-type-assertion": "error",
    "ts/no-unsafe-argument": "error",
    "ts/no-unsafe-assignment": "error",
    "ts/no-unsafe-call": "error",
    "ts/no-unsafe-member-access": "error",
    "ts/no-unsafe-return": "error",
    "ts/restrict-plus-operands": "error",
    "ts/restrict-template-expressions": "error",
    "ts/unbound-method": "error",
  };

  function makeParser(typeAware: boolean, files: string[], ignores?: string[]): TypedFlatConfigItem {
    return {
      files,
      ...ignores ? { ignores } : {},
      languageOptions: {
        parser: typescriptParser,
        parserOptions: {
          sourceType: "module",
          ...typeAware
            ? {
                project: tsconfigPath,
                tsconfigRootDir: process.cwd(),
              }
            : {},
          ...parserOptions as any,
        },
      },
      name: `antfu/typescript/${typeAware ? "type-aware-parser" : "parser"}`,
    };
  }

  return [
    {
      name: configName("typescript-setup"),
      plugins: {
        antfu: antfuPlugin,
        ts: typescriptPlugin,
      },
    },
    // assign type-aware parser for type-aware files and type-unaware parser for the rest
    ...isTypeAware
      ? [
          makeParser(true, filesTypeAware),
          makeParser(false, files, filesTypeAware),
        ]
      : [makeParser(false, files)],
    {
      files,
      name: "antfu/typescript/rules",
      rules: {
        ...renameRules(
          typescriptPlugin.configs["eslint-recommended"]!.overrides![0]!.rules!,
          { "@typescript-eslint": "ts" },
        ),
        ...renameRules(
          typescriptPlugin.configs.strict!.rules!,
          { "@typescript-eslint": "ts" },
        ),
        "no-dupe-class-members": "off",
        "no-loss-of-precision": "off",
        "no-redeclare": "off",
        "no-use-before-define": "off",
        "no-useless-constructor": "off",
        "ts/ban-ts-comment": ["error", { "ts-ignore": "allow-with-description" }],
        "ts/ban-types": ["error", { types: { Function: false } }],
        "ts/consistent-type-definitions": ["error", "interface"],
        "ts/consistent-type-imports": ["error", { disallowTypeAnnotations: false, prefer: "type-imports" }],
        "ts/method-signature-style": ["error", "property"], // https://www.totaltypescript.com/method-shorthand-syntax-considered-harmful
        "ts/no-dupe-class-members": "error",
        "ts/no-dynamic-delete": "off",
        "ts/no-explicit-any": "off",
        "ts/no-extraneous-class": "off",
        "ts/no-import-type-side-effects": "error",
        "ts/no-invalid-void-type": "off",
        "ts/no-loss-of-precision": "error",
        "ts/no-non-null-assertion": "off",
        "ts/no-redeclare": "error",
        "ts/no-require-imports": "error",
        "ts/no-unused-vars": "off",
        "ts/no-use-before-define": ["error", { classes: false, functions: false, variables: true }],
        "ts/no-useless-constructor": "off",
        "ts/prefer-ts-expect-error": "error",
        "ts/triple-slash-reference": "off",
        "ts/unified-signatures": "off",
      },
    },
    ...isTypeAware
      ? [{
          files: filesTypeAware,
          name: "antfu/typescript/rules-type-aware",
          rules: {
            ...tsconfigPath ? typeAwareRules : {},
          },
        }]
      : [],
    {
      files: ["**/*.d.ts"],
      name: "antfu/typescript/disables/dts",
      rules: {
        "eslint-comments/no-unlimited-disable": "off",
        "import/no-duplicates": "off",
        "no-restricted-syntax": "off",
        "unused-imports/no-unused-vars": "off",
      },
    },
    {
      files: ["**/*.{test,spec}.ts?(x)"],
      name: "antfu/typescript/disables/test",
      rules: {
        "no-unused-expressions": "off",
      },
    },
    {
      files: ["**/*.js", "**/*.cjs"],
      name: "antfu/typescript/disables/cjs",
      rules: {
        "ts/no-require-imports": "off",
        "ts/no-var-requires": "off",
      },
    },
  ];
}
