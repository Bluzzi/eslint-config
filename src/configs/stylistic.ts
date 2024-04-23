import type { OptionsOverrides, StylisticConfig, TypedFlatConfigItem } from '#/types/type'
import { plugins } from '#/utils/extension'

export const StylisticConfigDefaults: StylisticConfig = {
  indent: 2,
  jsx: true,
  quotes: 'single',
  semi: false,
}

export interface StylisticOptions extends StylisticConfig, OptionsOverrides {
  lessOpinionated?: boolean
}

export async function stylistic(
  options: StylisticOptions = {},
): Promise<TypedFlatConfigItem[]> {
  const {
    indent,
    jsx,
    lessOpinionated = false,
    overrides = {},
    quotes,
    semi,
  } = {
    ...StylisticConfigDefaults,
    ...options,
  }


  const config = plugins.stylistic.configs.customize({
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
        antfu: plugins.antfu,
        style: plugins.stylistic,
      },
      rules: {
        ...config.rules,

        'antfu/consistent-list-newline': 'error',

        ...(lessOpinionated
          ? {
              curly: ['error', 'all'],
            }
          : {
              'antfu/if-newline': 'error',
              'antfu/top-level-function': 'error',
              'curly': ['error', 'multi-or-nest', 'consistent'],
            }
        ),

        ...overrides,
      },
    },
  ]
}
