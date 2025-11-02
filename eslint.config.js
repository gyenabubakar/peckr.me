import { tanstackConfig } from '@tanstack/eslint-config';
import react from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

export default defineConfig([
  ...tanstackConfig,
  {
    ignores: ['convex/_generated/*', 'src/_shadcn/*', 'lint-staged.config.js'],
  },
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    plugins: {
      react,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/jsx-no-leaked-render': ['error', { validStrategies: ['ternary', 'coerce'] }],
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',

      // Enforce function declarations for standalone functions
      'func-style': ['error', 'declaration'],

      // Detect usage of deprecated APIs (requires type information)
      '@typescript-eslint/no-deprecated': 'error',

      '@typescript-eslint/array-type': 'off',

      'sort-imports': 'off',
      'import/order': 'off',
    },
  },
]);
