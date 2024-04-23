import type { TypedFlatConfigItem } from '#/types/type'
import { plugins } from '..'

export async function node(): Promise<TypedFlatConfigItem[]> {
  return [
    {
      name: 'antfu/node/rules',
      plugins: {
        node: plugins.node,
      },
      rules: {
        'node/handle-callback-err': ['error', '^(err|error)$'],
        'node/no-deprecated-api': 'error',
        'node/no-exports-assign': 'error',
        'node/no-new-require': 'error',
        'node/no-path-concat': 'error',
        'node/prefer-global/buffer': ['error', 'never'],
        'node/prefer-global/process': ['error', 'never'],
        'node/process-exit-as-throw': 'error',
      },
    },
  ]
}
