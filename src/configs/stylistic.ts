// NEED REVIEW

import { pluginAntfu, pluginStylistic } from "#/extends/plugin";
import type { ConfigItem, StylisticConfig } from "#/utils/type";

type Tgm<T> = T;
type Foo = Tgm<{    members:  string }  >;

export function stylistic(options: StylisticConfig = {}): ConfigItem[] {
  const {
    indent = 2,
    jsx = true,
    quotes = "double"
    // TODO: add semi option
  } = options;

  return [
    {
      name: "bluzzi:stylistic",
      plugins: {
        antfu: pluginAntfu,
        style: pluginStylistic
      },
      rules: {
        "antfu/consistent-list-newline": "error",
        "antfu/if-newline": "error",
        "antfu/top-level-function": "error",

        "curly": ["error", "multi-or-nest", "consistent"],

        "camelcase": ["error"],

        "style/max-len": ["error", { code: 150 }], // ok
        "style/implicit-arrow-linebreak": ["error", "beside"], // ok
        "style/array-bracket-spacing": ["error", "never"], // ok
        "style/arrow-parens": ["error", "as-needed", { requireForBlockBody: true }],
        "style/arrow-spacing": ["error", { after: true, before: true }], // ok
        "style/block-spacing": ["error", "always"], // ok
        "style/brace-style": ["error", "1tbs"], // ok
        "style/comma-dangle": ["error", "never"], // ok
        "style/comma-spacing": ["error", { after: true, before: false }], // ok
        "style/comma-style": ["error", "last"], // ok
        "style/computed-property-spacing": ["error", "never", { enforceForClassMembers: true }], // ok
        "style/dot-location": ["error", "property"], // ok
        "eol-last": ["error", "never"], // ok
        "style/func-call-spacing": ["error", "never"],
        "style/indent": ["error", indent, { // ok
          ArrayExpression: 1,
          CallExpression: { arguments: 1 },
          flatTernaryExpressions: false,
          FunctionDeclaration: { body: 1, parameters: 1 },
          FunctionExpression: { body: 1, parameters: 1 },
          ignoreComments: false,
          ignoredNodes: [
            "TemplateLiteral *",
            "JSXElement",
            "JSXElement > *",
            "JSXAttribute",
            "JSXIdentifier",
            "JSXNamespacedName",
            "JSXMemberExpression",
            "JSXSpreadAttribute",
            "JSXExpressionContainer",
            "JSXOpeningElement",
            "JSXClosingElement",
            "JSXFragment",
            "JSXOpeningFragment",
            "JSXClosingFragment",
            "JSXText",
            "JSXEmptyExpression",
            "JSXSpreadChild",
            "TSTypeParameterInstantiation",
            "FunctionExpression > .params[decorators.length > 0]",
            "FunctionExpression > .params > :matches(Decorator, :not(:first-child))",
            "ClassBody.body > PropertyDefinition[decorators.length > 0] > .key"
          ],
          ImportDeclaration: 1,
          MemberExpression: 1,
          ObjectExpression: 1,
          offsetTernaryExpressions: true,
          outerIIFEBody: 1,
          SwitchCase: 1,
          VariableDeclarator: 1
        }],
        "style/key-spacing": ["error", { afterColon: true, beforeColon: false, mode: "strict" }],
        "style/keyword-spacing": ["error", { after: true, before: true }], // ok
        "style/lines-between-class-members": ["error", "always"], // ok
        "style/max-statements-per-line": ["error", { max: 1 }],
        "style/multiline-ternary": ["error", "always-multiline"],
        "style/new-parens": "error", // ok
        "style/no-extra-parens": ["error", "functions"],
        "style/no-floating-decimal": "error",
        "style/no-mixed-operators": ["error", {
          allowSamePrecedence: true,
          groups: [
            ["==", "!=", "===", "!==", ">", ">=", "<", "<="],
            ["&&", "||"],
            ["in", "instanceof"]
          ]
        }],
        "style/no-mixed-spaces-and-tabs": "error",
        "style/no-multi-spaces": "error",
        "style/no-multiple-empty-lines": ["error", { max: 1, maxBOF: 0, maxEOF: 0 }], // ok
        "style/no-tabs": indent === "tab" ? "off" : "error", // ok
        "style/no-trailing-spaces": "error", // ok
        "style/no-whitespace-before-property": "error", // ok
        "style/object-curly-spacing": ["error", "always"], // ok
        "style/operator-linebreak": ["error", "before"], // ok
        "style/padded-blocks": ["error", { blocks: "never", classes: "always", switches: "never" }], // ok
        "style/quote-props": ["error", "consistent-as-needed"],
        "style/quotes": ["error", quotes, { allowTemplateLiterals: true, avoidEscape: false }], // ok
        "style/function-paren-newline": ["error", "consistent"], // ok
        "style/function-call-argument-newline": ["error", "consistent"], // ok
        "style/rest-spread-spacing": ["error", "never"], // ok
        "style/semi": ["error", "always"], // ok
        "style/semi-spacing": ["error", { after: true, before: false }], // ok
        "style/semi-style": ["error", "last"], // ok
        "style/space-before-blocks": ["error", "always"], // ok
        "style/space-before-function-paren": ["error", "never"], // ok
        "style/space-in-parens": ["error", "never"], // ok
        "style/space-infix-ops": "error", // ok
        "style/space-unary-ops": ["error", { nonwords: false, words: true }], // ok
        "style/spaced-comment": ["error", "always", {
          block: {
            balanced: true,
            exceptions: ["*"],
            markers: ["!"]
          },
          line: {
            exceptions: ["/", "#"],
            markers: ["/"]
          }
        }],
        "style/template-curly-spacing": "error", // ok
        "style/template-tag-spacing": ["error"], // ok
        "style/type-annotation-spacing": ["error"], // ok
        "style/wrap-iife": ["error", "any", { functionPrototypeMethods: true }],
        "style/wrap-regex": "error", // ok
        "style/yield-star-spacing": ["error", "both"],
        "style/nonblock-statement-body-position": ["error", "beside"], // ok

        "style/member-delimiter-style": [ // ok
          "error",
          {
            multiline: {
              delimiter: "semi",
              requireLast: true
            },
            singleline: {
              delimiter: "semi",
              requireLast: false
            }
          }
        ],

        ...jsx
          ? {
              "style/jsx-closing-bracket-location": "error",
              "style/jsx-closing-tag-location": "error",
              "style/jsx-curly-brace-presence": ["error", { propElementValues: "always" }],
              "style/jsx-curly-newline": "error",
              "style/jsx-curly-spacing": ["error", "never"],
              "style/jsx-equals-spacing": "error",
              "style/jsx-first-prop-new-line": "error",
              "style/jsx-indent": ["error", indent, { checkAttributes: true, indentLogicalExpressions: true }],
              "style/jsx-indent-props": ["error", indent],
              "style/jsx-max-props-per-line": ["error", { maximum: 1, when: "multiline" }],
              "style/jsx-one-expression-per-line": ["error", { allow: "single-child" }],
              "style/jsx-quotes": "error",
              "style/jsx-tag-spacing": [
                "error",
                {
                  afterOpening: "never",
                  beforeClosing: "never",
                  beforeSelfClosing: "always",
                  closingSlash: "never"
                }
              ],
              "style/jsx-wrap-multilines": [
                "error",
                {
                  arrow: "parens-new-line",
                  assignment: "parens-new-line",
                  condition: "parens-new-line",
                  declaration: "parens-new-line",
                  logical: "parens-new-line",
                  prop: "parens-new-line",
                  return: "parens-new-line"
                }
              ]
            }
          : {}
      }
    }
  ];
}