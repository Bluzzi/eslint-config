// @ts-check
import { eslintConfig } from "./dist/index.js";

export default eslintConfig(
  {
    vue: true,
    react: true,
    solid: true,
    svelte: true,
    astro: true,
    typescript: true,
    formatters: true,
  }
);