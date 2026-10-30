---
name: Add ESLint config
description: Guide for adding a new ESLint config (plugin) to the @bluzzi/eslint-config preset
---

# Add a new ESLint config (plugin)

## 1. Analyze the plugin presets

Check the plugin's official documentation for its flat config presets (`recommended`, `strict`, `flat/recommended`, ...). Compare them (list the rules, their severity, and what each one does) and agree with the user on which one to use before writing code.

Beware:

- Some plugins expose presets as an **array** of configs (e.g. `@tanstack/eslint-plugin-query` → `plugin.configs["flat/recommended"][0]!.rules`), others as a single object. Check the actual plugin source before spreading.
- Preset rule keys may or may not already be prefixed with the plugin namespace. Never re-prefix or de-prefix them; use the keys as they are.

## 2. Add the dependency

```sh
pnpm install <plugin-package>
```

Runtime dependency (the plugin is bundled with the preset), like the other plugins in `package.json > dependencies`. The plugin does NOT need to require the library it lints (e.g. `@tanstack/eslint-plugin-query` doesn't need TanStack Query here) — auto-enable detection in step 4 handles that.

## 3. Export the plugin

In `src/utils/extension.ts`, add a named export with a short, consistent alias:

```ts
export { default as queryPlugin } from "@tanstack/eslint-plugin-query";
```

## 4. Create the config file

Create `src/configs/<name>.ts` following the existing pattern:

```ts
import type { TypedFlatConfigItem } from "#/types/type";
import { queryPlugin } from "#/utils/extension";

export const query = (): TypedFlatConfigItem => {
  const [recommended] = queryPlugin.configs["flat/recommended"];

  return {
    name: "bluzzi/query", // MUST be `bluzzi/<name>` (enforced by TypedFlatConfigItem)
    files: ["**/*.ts", "**/*.tsx"], // narrow to the file types the plugin applies to
    plugins: {
      "@tanstack/query": queryPlugin,
    },
    rules: {
      ...recommended!.rules,
    },
  };
};
```

Conventions:

- Config name: `bluzzi/<name>`, lowercase, matching the file name and the export name.
- Base the `rules` on the plugin's shared preset (spread it first), then add/override specific rules below the spread with a comment explaining the intent when non-obvious.
- If a rule needs options coming from user choices, add them to `OptionsConfig` (`src/types/type.ts`) and pass them in the factory, like `stylistic` does with `ParamsStylistic`.

## 5. Auto-enable detection

In `src/utils/factory.ts`:

1. Add the config to the `enabled` object, detecting the library it targets via `isPackageExists` (so the config only applies when the user's project actually uses it):
   ```ts
   query: ["@tanstack/react-query", "@tanstack/vue-query", "@tanstack/solid-query", "@tanstack/svelte-query"].some((p) => isPackageExists(p)),
   ```
2. Add the push block **after** the framework configs it depends on (react → nextjs → query, ...), with a log line in the same style:
   ```ts
   // Query:
   if (enabled.query) {
     logger.info("query - config enabled (@tanstack/*-query package found)");
     configs.push(query());
   }
   ```
3. Keep the imports sorted consistently with the existing ones.

Configs that are not tied to a specific library (like `ignore`, `javascript`, `node`, `stylistic`, `perfectionist`) are pushed unconditionally.

## 6. Register in the type generator

`scripts/typegen.ts` builds `src/types/gen.d.ts` (typed `RuleOptions` + `ConfigNames`). Add the new config to the `combine(...)` list, in the same order as the factory:

```ts
  react(),
  nextjs(),
  query(),
  perfectionist(),
```

## 7. Document

- Add the plugin keyword to `package.json > keywords` (e.g. `"tanstack-query"`).
- If the feature is user-visible (new options, new auto-detection), update `README.md` accordingly.
