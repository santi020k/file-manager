// @ts-check
import { ConfigOptions, eslintConfig, OptionalOptions } from '@santi020k/eslint-config-santi020k'

export default [
  ...eslintConfig({ config: [ConfigOptions.Ts, ConfigOptions.Next], optionals: [OptionalOptions.Tailwind] }),
  {
    ignores: ['.yalc/*']
  }
]
