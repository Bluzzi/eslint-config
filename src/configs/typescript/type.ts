import type { OptionsOverrides } from '#/types/type'
import type { ParserOptions } from '@typescript-eslint/parser'

export type OptionsTypeScript = (OptionsTypeScriptWithTypes & OptionsOverrides) | (OptionsTypeScriptParserOptions & OptionsOverrides)

export interface OptionsTypeScriptParserOptions {
  /**
   * Additional parser options for TypeScript.
   */
  parserOptions?: Partial<ParserOptions>

  /**
   * Glob patterns for files that should be type aware.
   * @default ['**\/*.{ts,tsx}']
   */
  filesTypeAware?: string[]
}

export interface OptionsTypeScriptWithTypes {
  /**
   * When this options is provided, type aware rules will be enabled.
   * @see https://typescript-eslint.io/linting/typed-linting/
   */
  tsconfigPath?: string | string[]
}

export interface OptionsHasTypeScript {
  typescript?: boolean
}
