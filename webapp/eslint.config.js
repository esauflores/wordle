import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import prettierConfig from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['**/*.test.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      prettierConfig,
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
    ],
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
        node: true,
      },
    },
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Enforce using `import type` for type imports
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      // Disallow unused variables, but allow underscore-prefixed params as placeholders
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      // Require explicit return types on functions (except short expressions)
      '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
      // Disallow unhandled promise rejections
      '@typescript-eslint/no-floating-promises': 'error',
      // Require explicit boolean conditions (no implicit truthiness)
      '@typescript-eslint/strict-boolean-expressions': 'error',
      // Enforce organized imports with alphabetical ordering and grouped types
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      // Disallow unresolved imports (with exception for absolute paths)
      'import/no-unresolved': ['error', { ignore: ['^/'] }],
      // Prevent duplicate imports from the same module
      'import/no-duplicates': 'error',
      // Warn on console usage (should be removed before production)
      'no-console': 'warn',
      // Require const for variables that never change
      'prefer-const': 'error',
    },
  },
  // Relaxed rules for shadcn/generated components
  {
    files: ['src/components/**/*.{ts,tsx}'],
    rules: {
      // Allow implicit return types (shadcn components use inference)
      '@typescript-eslint/explicit-function-return-type': 'off',
      // Allow implicit boolean coercion (common in JSX conditionals)
      '@typescript-eslint/strict-boolean-expressions': 'off',
      // Allow unhandled promises (event handlers often return void)
      '@typescript-eslint/no-floating-promises': 'off',
      // Allow empty object types (common in component prop extensions)
      '@typescript-eslint/no-empty-object-type': 'off',
      // Allow || over ?? (shadcn style preference)
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      // Allow optional chaining on non-nullish values (defensive coding)
      '@typescript-eslint/no-unnecessary-condition': 'off',
      // Allow void returns in arrow functions (event handlers)
      '@typescript-eslint/no-confusing-void-expression': 'off',
      // Allow explicit boolean comparisons (readability preference)
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off',
      // Allow any assignments (third-party type gaps)
      '@typescript-eslint/no-unsafe-assignment': 'off',
      // Allow flexible import ordering (generated code)
      'import/order': 'off',
      // Allow non-component exports (constants, utilities)
      'react-refresh/only-export-components': 'off',
    },
  },
])
