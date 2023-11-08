module.exports = {
  rules: {
    // https://eslint.style/rules/js/wrap-regex
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
