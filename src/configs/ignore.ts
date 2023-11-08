/**
 * @see {@link https://github.com/antfu/eslint-config/blob/main/src/configs/ignores.ts#L7}
 */

import type { ConfigItem } from '#/utils/type'
import { GLOB_EXCLUDE } from '#/utils/glob'

export function ignores(): ConfigItem[] {
  return [
    {
      ignores: GLOB_EXCLUDE,
    },
  ]
}
