import { eslintConfig } from "./dist/index.js";

export default eslintConfig({}, {
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
  },
});
