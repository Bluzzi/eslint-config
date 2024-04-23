import type { OptionsOverrides, StylisticConfig, TypedFlatConfigItem } from '#/types/type'
import { antfuPlugin, stylisticPlugin } from '#/utils/extension'

export const StylisticConfigDefaults: StylisticConfig = {
  indent: 2,
  jsx: true,
  quotes: 'single',
  semi: false,
}

export async function stylistic(
  options: StylisticConfig | OptionsOverrides = {},
): Promise<TypedFlatConfigItem[]> {
  const {
    indent,
    jsx,
    overrides = {},
    quotes,
    semi,
  } = {
    ...StylisticConfigDefaults,
    ...options,
  }

  const config = stylisticPlugin.configs.customize({
    flat: true,
    indent,
    jsx,
    pluginName: 'style',
    quotes,
    semi,
  })

  return [
    {
      name: 'antfu/stylistic/rules',
      plugins: {
        antfu: antfuPlugin,
        style: stylisticPlugin,
      },
      rules: {
        ...config.rules,

        'antfu/consistent-list-newline': 'error',

        'curly': ['error', 'multi-or-nest', 'consistent'],
        'antfu/if-newline': 'error',
        'antfu/top-level-function': 'error',

        ...overrides,
      },
    },
  ]
}
