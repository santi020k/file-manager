// @ts-check
import { fixupConfigRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import eslint from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import reactRecommended from 'eslint-plugin-react/configs/recommended.js'
import vitest from 'eslint-plugin-vitest'
import globals from 'globals'
import path from 'path'
import tsEslint from 'typescript-eslint'
import { fileURLToPath } from 'url'

// Mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const oldConfig = {
  ignorePatterns: ['*.md'],
  extends: [
    'standard',
    'plugin:tailwindcss/recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    'simple-import-sort',
    'jsx-a11y',
    'unused-imports'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  }
}
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: {}
})

export default [
  stylistic.configs['all-flat'],
  eslint.configs.recommended,
  vitest.configs.recommended,
  ...tsEslint.configs.strict,
  ...tsEslint.configs.stylistic,
  // @ts-expect-error During the migration to eslint 9, there are things that are not well typed and problems with libraries, this is a temporary solution
  ...fixupConfigRules(compat.extends('plugin:@next/next/core-web-vitals')),
  // @ts-expect-error During the migration to eslint 9, there are things that are not well typed and problems with libraries, this is a temporary solution
  ...fixupConfigRules(compat.extends('plugin:testing-library/react')),
  ...fixupConfigRules(reactRecommended),
  ...compat.config(oldConfig),
  {
    plugins: {
      '@stylistic': stylistic,
      '@typescript-eslint': typescriptEslint
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser
      }
    },
    rules: {
      'react/react-in-jsx-scope': 0,
      'react/jsx-max-depth': [
        'warn',
        { max: 7 }
      ],
      'react/prop-types': 0,
      'unused-imports/no-unused-imports': 'error',
      'testing-library/prefer-screen-queries': 0,
      'testing-library/no-manual-cleanup': 0,
      indent: 0,
      'react-hooks/exhaustive-deps': 0,
      '@stylistic/indent': [
        'error',
        2
      ],
      '@stylistic/quote-props': [
        'error',
        'as-needed'
      ],
      '@stylistic/quotes': [
        'error',
        'single'
      ],
      '@stylistic/semi': [
        'error',
        'never'
      ],
      '@stylistic/object-curly-spacing': [
        'error',
        'always'
      ],
      '@stylistic/padded-blocks': [
        'error',
        'never'
      ],
      '@stylistic/arrow-parens': [
        'error',
        'as-needed'
      ],
      '@stylistic/dot-location': [
        'error',
        'property'
      ],
      '@stylistic/function-call-argument-newline': [
        'error',
        'never'
      ],
      '@stylistic/object-property-newline': [
        'error',
        { allowAllPropertiesOnSameLine: true }
      ],
      '@stylistic/multiline-ternary': [
        'error',
        'always-multiline'
      ],
      '@stylistic/member-delimiter-style': 'off',
      '@stylistic/no-extra-parens': 'off',
      '@stylistic/max-len': [
        'error', {
          code: 120,
          tabWidth: 2,
          comments: 200,
          ignoreStrings: true
        }
      ],
      '@stylistic/max-statements-per-line': ['error', { max: 1 }],
      '@stylistic/array-element-newline': ['error', 'consistent'],
      '@stylistic/no-extra-semi': 0,
      '@stylistic/no-multi-spaces': 0,
      '@stylistic/padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: '*' },
        { blankLine: 'any', prev: 'import', next: 'import' },
        { blankLine: 'never', prev: 'const', next: 'const' },
        { blankLine: 'never', prev: 'let', next: 'let' },
        { blankLine: 'always', prev: 'block-like', next: 'const' },
        { blankLine: 'always', prev: 'const', next: 'block-like' }
      ],
      '@stylistic/function-paren-newline': ['error', 'consistent'],
      'arrow-body-style': ['error', 'as-needed'],
      'prefer-arrow-callback': [
        'error',
        { allowNamedFunctions: true }
      ],
      'func-style': [
        'error',
        'expression',
        { allowArrowFunctions: true }
      ],
      '@typescript-eslint/indent': 0,
      'no-unused-vars': 0,
      '@typescript-eslint/no-unused-vars': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
          // Packages `react` related packages come first.
            ['^react'],
            ['^next'],
            // Themes
            ['^(@/themes)'],
            // Internal packages.
            ['^(@/atoms)(/.*|$)'],
            ['^(@/molecules)(/.*|$)'],
            ['^(@/organisms)(/.*|$)'],
            ['^(@/layouts)(/.*|$)'],
            ['^(@/lib)(/.*|$)'],
            ['^(@/store)(/.*|$)'],
            ['^(@/hooks)(/.*|$)'],
            ['^(@/models)(/.*|$)'],
            ['^(@/utils)(/.*|$)'],
            ['^(@/mocks)(/.*|$)'],
            // Side effect imports.
            ['^\\u0000'],
            // Parent imports. Put `..` last.
            [
              '^\\.\\.(?!/?$)',
              '^\\.\\./?$'
            ],
            // Other relative imports. Put same-folder imports and `.` last.
            [
              '^\\./(?=.*/)(?!/?$)',
              '^\\.(?!/?$)',
              '^\\./?$'
            ],
            // Style imports.
            ['^.+\\.?(css)$']
          ]
        }
      ]
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  }
]
