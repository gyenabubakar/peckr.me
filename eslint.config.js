import { tanstackConfig } from '@tanstack/eslint-config';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

export default defineConfig([
  ...tanstackConfig,
  react.configs.flat['jsx-runtime'],
  jsxA11y.flatConfigs.recommended,
  {
    ignores: ['convex/_generated/*', 'src/_shadcn/*', 'lint-staged.config.js'],
  },
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
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
      // React Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',

      // JSX & Component Rules
      'react/jsx-no-leaked-render': ['error', { validStrategies: ['ternary', 'coerce'] }],
      'react/jsx-key': 'error',
      'react/no-array-index-key': 'warn',
      'react/self-closing-comp': 'error',
      'react/jsx-no-useless-fragment': 'error',
      'react/jsx-pascal-case': 'error',
      'react/no-unstable-nested-components': 'error',

      // Prop & Type Safety
      'react/jsx-no-target-blank': 'error',
      'react/no-children-prop': 'error',
      'react/void-dom-elements-no-children': 'error',

      // Performance & Best Practices
      'react/jsx-no-bind': [
        'warn',
        {
          allowArrowFunctions: true,
          ignoreDOMComponents: true,
        },
      ],

      // Code Style
      'react/jsx-curly-brace-presence': [
        'warn',
        {
          props: 'never',
          children: 'never',
        },
      ],
      'react/jsx-boolean-value': ['warn', 'never'],
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
