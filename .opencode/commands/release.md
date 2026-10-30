---
description: Prepare the next release (version bump + user-facing release notes)
---

# Prepare a release

Goal: prepare the next release of `@bluzzi/eslint-config` by bumping the version in `package.json` and drafting the user-facing release notes. Nothing is committed or published without explicit user confirmation.

## 1. Ask the release type

Release type passed as arguments: `$ARGUMENTS`

If this contains `major` or `minor` (case-insensitive), use it as the release type. Otherwise, ask the user to choose between a MAJOR and a MINOR release, and wait for the answer before doing anything else.

## 2. Bump the version

Read the current `version` in `package.json` and increment it following semver (patch always resets to 0):

- MAJOR: `2.3.0` → `3.0.0`
- MINOR: `2.3.0` → `2.4.0`

Edit only the `version` field, leave everything else untouched. Leave the change uncommitted for now.

## 3. Collect the merged pull requests

The latest tag (see the context at the end of this prompt) marks the last release. List the pull requests merged since it, and read the full description of each one:

```sh
gh pr list --state all --limit 50 --json number,title,body,mergedAt,url
```

Keep only PRs whose `mergedAt` is after the latest tag date. The PR bodies are the source of truth: they contain the clear summaries, the rationale behind each change, and the consumer impact.

## 4. Write the release notes

Follow these rules strictly:

- A single flat Markdown bullet list: no headings, no sections, no intro sentence.
- One short line per change, written as a full sentence. Never use an em dash (`—`) and never the "term — description" log style.
- Language: English.
- Link every rule or plugin name to its official online documentation:
  - ESLint core rules: `https://eslint.org/docs/latest/rules/<rule>`
  - typescript-eslint rules: `https://typescript-eslint.io/rules/<rule>/`
  - ESLint Stylistic rules: `https://eslint.style/rules/<rule>`
  - Other plugins: their documentation site or GitHub repository.
- After the link, briefly state what changed and why, with the consumer impact in mind: new errors to expect, auto-fixable or not, required tsconfig option (e.g. `strictNullChecks`), exemptions kept for React, peer-dependency warnings, upstream bug that previously kept the rule off.
- End each line with the PR reference, e.g. `(#27)`.
- Order: new configs first, then JavaScript rules, then TypeScript rules, then stylistic rules, then plugin/dependency upgrades.

Selection: only changes that impact users of the preset.

- Include: new configs and their auto-detection, new/enabled/re-enabled rules, changed rule options, plugin dependency upgrades that change linting behavior.
- Exclude: internal refactors, CI/Docker/Dependabot, log output changes, docs-only changes, dev-only dependency updates.

## 5. Present and wait

Output the final list in a Markdown code block in the conversation, then stop and wait for the user's feedback. Do not commit, push, publish to npm, or create any GitHub release unless explicitly asked.

If the user validates and asks to finalize:

1. Commit `package.json` with the message `release v<new version>`.
2. Push the commit so the tag can point to it.
3. Write the validated notes to a temporary file, then create a **draft** release:

   ```sh
   gh release create v<new version> --draft --target <commit sha> --title "v<new version>" --notes-file <file>
   ```

Never publish the release (no `--draft` omission, no `--publish`): the user reviews and publishes the draft on GitHub themselves. Never publish to npm.

## Context

The 3 latest releases, as a structure and syntax reference:

!`gh api repos/Bluzzi/eslint-config/releases -q '.[0:3][] | "## " + (.name // "untitled") + " (tag " + .tag_name + ")\n\n" + (.body // "empty body") + "\n"'`

The commits since the latest tag:

!`git fetch origin --tags && git log --oneline "$(git describe --tags --abbrev=0)..HEAD"`
