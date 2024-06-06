// @ts-check
import tailwind from 'eslint-plugin-tailwindcss'

import { nextTsEslint } from '@santi020k/eslint-config-santi020k'

export default [...tailwind.configs['flat/recommended'], ...nextTsEslint]
