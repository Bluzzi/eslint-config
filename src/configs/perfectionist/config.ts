import type { ParamsPerfectionist } from "./type";
import type { TypedFlatConfigItem } from "#/types/type";
import { perfectionistPlugin } from "#/utils/extension";

export const perfectionist = ({ tsconfigPath }: ParamsPerfectionist = {}): TypedFlatConfigItem => {
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
        partitionByComment: false,
        partitionByNewLine: false,
        newlinesBetween: "never",
        tsconfigRootDir: tsconfigPath,
        groups: [
          ["external-type", "builtin-type", "internal-type", "parent-type", "sibling-type", "index-type"],
          ["object", "index", "sibling", "parent", "internal", "external", "builtin", "unknown"],
          ["style"],
          ["side-effect-style"],
          ["side-effect"],
        ],
      }],
    },
  };
};
