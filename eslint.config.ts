/* eslint-disable @typescript-eslint/naming-convention */

import stylistic from '@stylistic/eslint-plugin';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import eslint from 'eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import turboConfig from 'eslint-config-turbo/flat';
import checkFile from 'eslint-plugin-check-file';
import importPlugin from 'eslint-plugin-import';
import react from 'eslint-plugin-react';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { airbnbTypescript } from './rules';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const viteGlob = '**/vite{,st}.{config,workspace}*{,.d}.ts';
const checkFileIgnored = [viteGlob];

/** @type { import("eslint").Linter.Config[] } */
export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
  },
  {
    ignores: [
      '**/dev-scripts',
      '**/logs',
      '**/*.log',
      '**/npm-debug.log*',
      '**/yarn-debug.log*',
      '**/yarn-error.log*',
      '**/node_modules',
      '**/dist',
      '**/build',
      '**/.env',
      '**/.vscode',
      '**/.idea/',
      '**/coverage/',
      '**/.DS_Store',
      '**/Thumbs.db',
      'backend/prisma/prisma-client/*',
      'backend/prisma/zod/*',
      '**/seed/seed.js',
      '**/seed/custom_seeding/*',
      '**/*.ntvs*',
      '**/*.njsproj',
      '**/*.sln',
      '**/*.sw?',
    ],
  },
  stylistic.configs.recommended,
  ...airbnbTypescript,
  ...turboConfig,
  {
    plugins: {
      import: importPlugin,
      '@typescript-eslint': typescriptEslint,
      '@stylistic': stylistic,
      '@unused-imports': unusedImports,
      react,
      'check-file': checkFile,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: true,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/internal-regex': '^@hitchkick/',
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    rules: {
      '@stylistic/indent': ['off'],
      '@stylistic/block-spacing': ['error', 'always'],
      '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/comma-spacing': ['error'],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/no-extra-semi': ['off'],
      '@stylistic/quote-props': ['error', 'as-needed'],
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
      '@stylistic/operator-linebreak': ['off'],
      '@stylistic/indent-binary-ops': ['off'],
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/max-len': [
        'error',
        {
          code: 100,
          tabWidth: 2,
          ignoreComments: true,
          ignoreTrailingComments: true,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
        },
      ],
      '@stylistic/member-delimiter-style': [
        'error',
        { multiline: { delimiter: 'semi' } },
      ],
      '@stylistic/lines-between-class-members': [
        'error',
        {
          enforce: [
            { blankLine: 'always', prev: 'method', next: '*' },
            { blankLine: 'never', prev: 'field', next: 'field' },
            { blankLine: 'always', prev: 'field', next: 'method' },
          ],
        },
      ],
      '@stylistic/padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: '*',
          next: ['return', 'enum', 'interface', 'type'],
        },
        { blankLine: 'always', prev: '*', next: 'block-like' },
        {
          blankLine: 'always',
          prev: ['case', 'default', 'const', 'let', 'var'],
          next: '*',
        },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var'],
        },
        {
          blankLine: 'always',
          prev: ['import'],
          next: '*',
        },
        {
          blankLine: 'never',
          prev: ['import'],
          next: ['import'],
        },
        {
          blankLine: 'always',
          prev: '*',
          next: ['export'],
        },
        {
          blankLine: 'always',
          prev: ['export'],
          next: '*',
        },
        {
          blankLine: 'any',
          prev: ['export'],
          next: ['export'],
        },
        {
          blankLine: 'always',
          prev: 'block',
          next: '*',
        },
      ],
      'import/order': [
        'warn',
        {
          named: true,
          groups: [
            'builtin',
            'external',
            'internal',
            'index',
            ['parent', 'sibling'],
          ],
          pathGroups: [
            {
              pattern: 'backend/**',
              group: 'internal',
            },
            {
              pattern: 'assets/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '**',
              group: 'index',
            },
          ],
          pathGroupsExcludedImportTypes: [],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'operator-linebreak': ['off'],
      'implicit-arrow-linebreak': 'off',
      'max-len': 'off',
      'arrow-parens': ['off'],
      indent: 'off',
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'always'],
      'no-console': 'warn',
      'consistent-return': 'off',
      'function-paren-newline': 'off',
      'nonblock-statement-body-position': 'off',
      'no-extend-native': ['error', { exceptions: ['Object', 'BigInt'] }],
      'no-confusing-arrow': ['off'],
      'no-plusplus': 'off',
      'no-var': 'warn',
      'no-continue': 'off',
      'no-underscore-dangle': 'off',
      'no-restricted-imports': ['error', '@prisma/client'],
      curly: ['error', 'multi'],
      'object-curly-newline': 'off',
      'no-restricted-syntax': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/indent': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/lines-between-class-members': 'off',
      '@unused-imports/no-unused-vars': [
        'warn',
        {
          args: 'all',
          argsIgnorePattern: '^_.*|(re[qs]|next)$',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@unused-imports/no-unused-imports': 'warn',
      'import/extensions': 'off',
      'import/no-unresolved': 'off',
      'import/prefer-default-export': 'off',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          format: ['strictCamelCase'],
          filter: {
            regex: '.*[fF]ormContext$',
            match: true,
          },
        },
        {
          selector: 'variable',
          format: ['StrictPascalCase'],
          filter: {
            regex: '.*(?:Schema|Context)$',
            match: true,
          },
        },
        {
          selector: 'variable',
          format: ['strictCamelCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
          filter: {
            regex: '^(re[qs]|next)$',
            match: false,
          },
        },
        {
          selector: 'parameter',
          leadingUnderscore: 'allow',
          format: ['strictCamelCase'],
        },
        {
          selector: [
            'function',
            'class',
            'classMethod',
            'interface',
            'typeAlias',
            'enum',
          ],
          format: ['StrictPascalCase'],
        },
        {
          selector: 'classProperty',
          format: ['strictCamelCase'],
        },
        {
          selector: 'enumMember',
          format: ['snake_case', 'UPPER_CASE'],
        },
      ],
      // suppress errors for missing 'import React' in files
      'react/react-in-jsx-scope': 'off',
      // allow jsx syntax in js files (for next.js project)
      'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
      'react/jsx-props-no-spreading': 'off',
      'react/require-default-props': 'off',
      'react/function-component-definition': 'off',
      'import/no-cycle': 'off',
      'no-nested-ternary': 'off',
      'no-bitwise': 'off',
      // '@stylistic/ts/indent': ['error', 2],
    },
  },
  eslintConfigPrettier,
  {
    // Overwrite prettier disabled rules that may cause conflicts
    rules: {
      curly: ['error', 'multi'],
    },
  },
  {
    ignores: [
      ...checkFileIgnored,
      'frontend/src/components/pages/registration/steps/**',
    ],
    rules: {
      'check-file/no-index': 'off',
      'check-file/filename-blocklist': [
        'error',
        {
          '**/*-util.ts': '*-utils.ts',
          '**/*-fetch.ts': '*.fetch.ts',
          '**/*-fetch.test.ts': '*.fetch.test.ts',
          '**/*-test.ts': '*.test.ts',
        },
      ],
      'check-file/filename-naming-convention': [
        'error',
        {
          '**/*': 'KEBAB_CASE',
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],
      'check-file/folder-naming-convention': [
        'error',
        {
          '**/*': 'KEBAB_CASE',
        },
      ],
    },
  },
  {
    files: ['**/*.ts'],
    ignores: [viteGlob],
    rules: {
      'import/no-default-export': 'warn',
    },
  },
  {
    files: ['frontend/src/fetches/**/*.ts'],
    rules: {
      'no-useless-concat': 'off',
    },
  },
  {
    files: ['eslint.config.ts'],
    rules: {
      'import/no-default-export': 'off',
    },
  },
  {
    files: [viteGlob, '**/*.test.ts', '**/*.test.tsx'],
    rules: {
      'import/no-extraneous-dependencies': 'off',
      'no-console': 'off',
    },
  },
  {
    files: ['backend/prisma/**/*.ts'],
    ignores: ['backend/prisma/seed/**/*.ts'],
    rules: {
      'no-restricted-imports': ['error', 'types'],
    },
  },
] as eslint.Linter.Config[];
