import type { ConfigItem } from "#/utils/type";

/**
 * List of files to be ignored for linting.
 */
export function ignore(): ConfigItem[] {
  return [{
    name: "bluzzi:ignore",
    ignores: [
      "**/node_modules",
      "**/dist",
      "**/package-lock.json",
      "**/yarn.lock",
      "**/pnpm-lock.yaml",
      "**/bun.lockb",

      "**/output",
      "**/coverage",
      "**/temp",
      "**/.vitepress/cache",
      "**/.nuxt",
      "**/.next",
      "**/.vercel",
      "**/.changeset",
      "**/.idea",
      "**/.cache",
      "**/.output",
      "**/.vite-inspect",

      "**/CHANGELOG*.md",
      "**/*.min.*",
      "**/LICENSE*",
      "**/__snapshots__",
      "**/auto-import?(s).d.ts",
      "**/components.d.ts"
    ]
  }];
}