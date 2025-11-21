// @ts-check

/** @type {import('prettier').Config} */
const config = {
  arrowParens: 'always',
  bracketSpacing: true,
  jsxSingleQuote: false,
  quoteProps: 'as-needed',
  singleQuote: true,
  semi: true,
  printWidth: 100,
  useTabs: false,
  tabWidth: 2,
  trailingComma: 'all',
  plugins: ['prettier-plugin-tailwindcss', '@ianvs/prettier-plugin-sort-imports'],
  importOrder: [
    '^react$',
    '^@tanstack',
    '<THIRD_PARTY_MODULES>',
    '<TYPES>^react$',
    '<TYPES>^@tanstack',
    '<TYPES><THIRD_PARTY_MODULES>',
    '<TYPES>',
    '^~/features/?',
    '^~/?',
    '^[.]',
    '<TYPES>^~/features/?',
    '<TYPES>^~/?',
    '<TYPES>^[.]',
    '',
  ],
};

export default config;
