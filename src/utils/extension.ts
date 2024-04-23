import { Awaitable } from 'eslint-flat-config-utils'

const interopDefault = async<T>(importStatement: Awaitable<T>): Promise<T extends { default: infer U } ? U : T> => {
  const resolved = await importStatement
  return (resolved as any).default || resolved
}

export const plugins = {
   antfu: await interopDefault(import('eslint-plugin-antfu')), 
   node: await interopDefault(import('eslint-plugin-n')), 
   stylistic: await interopDefault(import('@stylistic/eslint-plugin')),
   typescript: await interopDefault(import('@typescript-eslint/eslint-plugin')),
}

export const parsers = {
  typescript: await interopDefault(import('@typescript-eslint/parser')),
}