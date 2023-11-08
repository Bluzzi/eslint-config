/**
 * @see {@link https://github.com/antfu/eslint-config/blob/main/src/configs/test.ts}
 */

import type { ConfigItem, OptionsIsInEditor, OptionsOverrides } from '#/utils/type'
import { pluginNoOnlyTests, pluginVitest } from '#/utils/plugin'
import { GLOB_TESTS } from '#/utils/glob'

export function test(options: OptionsIsInEditor & OptionsOverrides = {}): ConfigItem[] {
  const {
    isInEditor = false,
    overrides = {},
  } = options

  return [
    {
      name: 'antfu:test:setup',
      plugins: {
        test: {
          ...pluginVitest,
          rules: {
            ...pluginVitest.rules,
            // extend `test/no-only-tests` rule
            ...pluginNoOnlyTests.rules,
          },
        },
      },
    },
    {
      files: GLOB_TESTS,
      name: 'antfu:test:rules',
      rules: {
        'test/consistent-test-it': ['error', { fn: 'it', withinDescribe: 'it' }],
        'test/no-identical-title': 'error',
        'test/no-only-tests': isInEditor ? 'off' : 'error',
        'test/prefer-hooks-in-order': 'error',
        'test/prefer-lowercase-title': 'error',

        ...overrides,
      },
    },
  ]
}
