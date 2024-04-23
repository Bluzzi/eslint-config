import type { Linter } from 'eslint'
import type { ConfigNames, RuleOptions } from './gen'
import type { OptionsTypeScript } from '#/configs/typescript'
import type { StylisticConfig } from '#/configs/stylistic'
import type { ParamsJS } from '#/configs/javascript'

export type Awaitable<T> = T | Promise<T>

export type Rules = RuleOptions

export type { ConfigNames }

export type TypedFlatConfigItem = Omit<Linter.FlatConfig<Linter.RulesRecord & Rules>, 'plugins'> & {
  /**
   * An object containing a name-value mapping of plugin names to plugin objects.
   * When `files` is specified, these plugins are only available to the matching files.
   *
   * [NOTE] Relax plugins type limitation, as most of the plugins did not have correct type info yet.
   *
   * @see [Using plugins in your configuration](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#using-plugins-in-your-configuration)
   */
  plugins?: Record<string, any>
}

export interface OptionsOverrides {
  overrides?: TypedFlatConfigItem['rules']
}

export interface OptionsConfig {
  /**
   * Core rules. Can't be disabled.
   */
  javascript?: ParamsJS

  /**
   * Enable TypeScript support.
   *
   * Passing an object to enable TypeScript Language Server support.
   *
   * @default auto-detect based on the dependencies
   */
  typescript?: boolean | OptionsTypeScript

  /**
   * Enable stylistic rules.
   *
   * @default true
   */
  stylistic?: boolean | (StylisticConfig & OptionsOverrides)
}
