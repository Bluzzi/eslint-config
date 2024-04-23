import type { Awaitable, ConfigNames, OptionsConfig, TypedFlatConfigItem } from '../types/type'
import type { Linter } from 'eslint'
import { isPackageExists } from 'local-pkg'
import { FlatConfigComposer } from 'eslint-flat-config-utils'
import { javascript } from '#/configs/javascript/config'
import { typescript } from '#/configs/typescript/config'
import { node } from '#/configs/node'
import { stylistic } from '#/configs/stylistic/config'

const flatConfigProps: (keyof TypedFlatConfigItem)[] = [
  'name',
  'files',
  'ignores',
  'languageOptions',
  'linterOptions',
  'processor',
  'plugins',
  'rules',
  'settings',
]

export const defaultPluginRenaming = {
  '@eslint-react': 'react',
  '@eslint-react/dom': 'react-dom',
  '@eslint-react/hooks-extra': 'react-hooks-extra',
  '@eslint-react/naming-convention': 'react-naming-convention',

  '@stylistic': 'style',
  '@typescript-eslint': 'ts',
  'import-x': 'import',
  'n': 'node',
  'vitest': 'test',
  'yml': 'yaml',
}

/**
 * Construct an array of ESLint flat config items.
 *
 * @param {OptionsConfig & TypedFlatConfigItem} options
 *  The options for generating the ESLint configurations.
 * @param {Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[]>[]} userConfigs
 *  The user configurations to be merged with the generated configurations.
 * @returns {Promise<TypedFlatConfigItem[]>}
 *  The merged ESLint configurations.
 */
export function eslintConfig(
  options: OptionsConfig = {},
  ...userConfigs: Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[] | FlatConfigComposer<any, any> | Linter.FlatConfig[]>[]
): FlatConfigComposer<TypedFlatConfigItem, ConfigNames> {
  const {
    typescript: enableTypeScript = isPackageExists('typescript'),
  } = options

  const stylisticOptions = options.stylistic === false
    ? false
    : typeof options.stylistic === 'object'
      ? options.stylistic
      : {}

  const configs: Awaitable<TypedFlatConfigItem[]>[] = []

  // Base configs
  configs.push(
    javascript({
      overrides: getOverrides(options, 'javascript'),
    }),
    node(),
  )

  if (enableTypeScript) {
    configs.push(typescript({
      ...resolveSubOptions(options, 'typescript'),
      overrides: getOverrides(options, 'typescript'),
    }))
  }

  if (stylisticOptions) {
    configs.push(stylistic({
      ...stylisticOptions,
      overrides: getOverrides(options, 'stylistic'),
    }))
  }

  const composer = new FlatConfigComposer<TypedFlatConfigItem, ConfigNames>()
    .append(...configs, ...userConfigs as any)
    .renamePlugins(defaultPluginRenaming)

  return composer
}

export type ResolvedOptions<T> = T extends boolean
  ? never
  : NonNullable<T>

export function resolveSubOptions<K extends keyof OptionsConfig>(
  options: OptionsConfig,
  key: K,
): ResolvedOptions<OptionsConfig[K]> {
  return typeof options[key] === 'boolean'
    ? {} as any
    : options[key] || {}
}

export function getOverrides<K extends keyof OptionsConfig>(
  options: OptionsConfig,
  key: K,
) {
  const sub = resolveSubOptions(options, key)
  return {
    ...'overrides' in sub
      ? sub.overrides
      : {},
  }
}
