module.exports = {
  rules: {
    "template-curly-spacing": "error",
    "template-tag-spacing": "error",
    "keyword-spacing": ["error", { before: true, after: true }],

    "space-infix-ops": "error",
    "space-unary-ops": "error",

    "space-before-blocks": "error",
    "space-before-function-paren": ["error", "never"],

    "new-parens": "error",
    "space-in-parens": ["error", "never"],

    "function-paren-newline": ["error", "consistent"],
    "function-call-argument-newline": ["error", "consistent"],

    "comma-dangle": ["error", "never"],

    "dot-location": ["error", "property"],

    "eol-last": ["error", "never"],

    "lines-between-class-members": ["error", "always"],

    "max-len": ["error", { code: 150 }],

    "no-multiple-empty-lines": "error",
    "no-tabs": "error",
    "no-trailing-spaces": "error",
    "no-whitespace-before-property": "error",

    "nonblock-statement-body-position": ["error", "beside"],

    "wrap-regex": "error",

    "camelcase": "error",

    "@typescript-eslint/explicit-function-return-type": ["error", { allowExpressions: true }],

    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],

    "@typescript-eslint/member-delimiter-style": [
      "error",
      {
        multiline: {
          delimiter: "semi",
          requireLast: true,
        },
        singleline: {
          delimiter: "semi",
          requireLast: false,
        },
      },
    ],

    "@typescript-eslint/consistent-type-exports": "error",
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        fixStyle: "separate-type-imports",
      },
    ],

    "@typescript-eslint/consistent-type-assertions": ["error", { assertionStyle: "as" }],
  },
};
