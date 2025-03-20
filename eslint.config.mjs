import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
})

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'prettier',
  ),
  ...compat.plugins('simple-import-sort', 'prettier', '@typescript-eslint', 'unused-imports'),
  ...compat.config({
    overrides: [
      {
        files: ['**/*.ts?(x)'],
        parser: '@typescript-eslint/parser',
        extends: ['plugin:@typescript-eslint/recommended', 'plugin:import/typescript'],
      },
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      tsconfigRootDir: '.',
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    rules: {
      'prettier/prettier': ['error', {}, { usePrettierrc: true }],
      'arrow-parens': 0,
      'no-debugger': 1,
      'no-warning-comments': [
        1,
        {
          terms: ['hardcoded'],
          location: 'anywhere',
        },
      ],
      'no-return-await': 0,
      'object-curly-spacing': ['error', 'always'],
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
      'unused-imports/no-unused-imports': 'warn',
      'no-var': 'error',
      'comma-dangle': [1, 'always-multiline'],
      'linebreak-style': ['error', 'unix'],
      'max-len': [
        1,
        {
          code: 100,
          comments: 100,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
        },
      ],
      'no-console': [1, { allow: ['warn', 'error'] }],
      'react/jsx-curly-brace-presence': ['warn', 'never'],
    },
  }),
]

export default eslintConfig
