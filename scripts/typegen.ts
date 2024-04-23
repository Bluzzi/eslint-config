import type { Awaitable, TypedFlatConfigItem } from '#/types/type'
import { flatConfigsToRulesDTS } from 'eslint-typegen/core'
import { builtinRules } from 'eslint/use-at-your-own-risk'
import { javascript, node, stylistic, typescript } from '../src'
import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { cwd } from 'node:process'

/**
 * Combine array and non-array configs into a single array.
 */
export const combine = async(...configs: Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[]>[]): Promise<TypedFlatConfigItem[]> => {
  const resolved = await Promise.all(configs)
  return resolved.flat()
}

const configs = await combine(
  { plugins: { '': { rules: Object.fromEntries(builtinRules.entries()) } } },
  javascript(),
  node(),
  stylistic(),
  typescript(),
)

const configNames = configs.map(i => i.name).filter(Boolean) as string[]

let dts = await flatConfigsToRulesDTS(configs, { includeAugmentation: false })

dts += `
// Names of all the configs
export type ConfigNames = ${configNames.map(i => `'${i}'`).join(' | ')}
`

await writeFile(join(cwd(), 'src/types/gen.d.ts'), dts)