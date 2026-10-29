import type { TypedFlatConfigItem } from "#/types/type";
import { perfectionistPlugin } from "#/utils/extension";

export const perfectionist = (): TypedFlatConfigItem => {
  return {
    name: "bluzzi/perfectionist",
    plugins: {
      perfectionist: perfectionistPlugin,
    },
    rules: {
      "perfectionist/sort-imports": ["error", {
        type: "alphabetical",
        order: "asc",
        fallbackSort: { type: "line-length", order: "asc" },
        ignoreCase: false,
        specialCharacters: "keep",
        locales: "en-US",
        internalPattern: ["^~/.*", "^#/.*"],
        sortSideEffects: false,
        partitionByComment: true,
        partitionByNewLine: false,
        newlinesBetween: "ignore",
        groups: [
          ["type-external", "type-builtin", "type-internal", "type-parent", "type-sibling", "type-index"],
          ["index", "sibling", "parent", "internal", "external", "builtin", "unknown"],
          ["style"],
          ["side-effect-style"],
          ["side-effect"],
        ],
      }],
    },
  };
};
