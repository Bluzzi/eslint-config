import type { ConfigItem, OptionsStylistic } from '#/utils/type'
import { pluginAntfu, pluginImport } from '#/utils/plugin'

export function imports(options: OptionsStylistic = {}): ConfigItem[] {
  const {
    stylistic = true,
  } = options

  return [
    {
      name: 'bluzzi:imports',
      plugins: {
        antfu: pluginAntfu,
        import: pluginImport,
      },
      // eslint-disable-next-line ts/ban-ts-comment
      // @ts-expect-error
      rules: {
        'antfu/import-dedupe': 'error',
        'antfu/no-import-node-modules-by-path': 'error',

        'import/first': 'error',
        'import/no-duplicates': 'error',
        'import/no-mutable-exports': 'error',
        'import/no-named-default': 'error',
        'import/no-self-import': 'error',
        'import/no-webpack-loader-syntax': 'error',
        'import/order': 'error',

        ...stylistic
          ? {
              'import/newline-after-import': ['error', { considerComments: true, count: 1 }],
            }
          : {},
      },
    },
  ]
}
