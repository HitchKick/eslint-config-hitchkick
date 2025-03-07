import stylistic from '@stylistic/eslint-plugin';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import eslint from 'eslint';
import { bestPracticesJs } from './best-practices';
import { errorsJs } from './errors';
import { es6Js } from './es6';
import { importsJs } from './imports';
import { jsxA11yJs } from './jsx-a11y';
import { nodeJs } from './node';
import { reactJs } from './react';
import { reactHooksJs } from './react-hooks';
import { stylesJs } from './styles';
import { variablesJs } from './variables';

const baseStyleRules = stylesJs.rules as any;
const baseErrorsRules = errorsJs.rules!;
const baseVariablesRules = variablesJs.rules!;
const baseEs6Rules = es6Js.rules!;
const baseImportsRules = importsJs.rules as any;
const baseBestPracticesRules = bestPracticesJs.rules!;

export const airbnbTypescript: eslint.Linter.Config[] = [
  nodeJs,
  es6Js,
  importsJs,
  variablesJs,
  bestPracticesJs,
  stylesJs,
  errorsJs,
  jsxA11yJs,
  reactJs,
  reactHooksJs,
  {
    plugins: {
      '@typescript-eslint': typescriptEslint as any,
      '@stylistic': stylistic,
    },
    languageOptions: {
      parser: tsParser,
    },
    settings: {
      // Apply special parsing for TypeScript files
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts'],
      },
      // Append 'ts' extensions to Airbnb 'import/resolver' setting
      // Prepend 'mjs' to match shared config
      // Original: ['.js', '.jsx', '.json']
      'import/resolver': {
        node: {
          extensions: ['.mjs', '.js', '.jsx', '.json', '.ts', '.tsx', '.d.ts'],
        },
      },

      // Append 'ts' extensions to Airbnb 'import/extensions' setting
      // Original: ['.js', '.mjs', '.jsx']
      'import/extensions': ['.js', '.mjs', '.jsx', '.ts', '.tsx', '.d.ts'],

      // Resolve type definition packages
      'import/external-module-folders': ['node_modules', 'node_modules/@types'],
    },
    rules: {
      // Append 'tsx' to Airbnb 'react/jsx-filename-extension' rule
      // Original: ['.jsx']
      'react/jsx-filename-extension': [
        'error',
        { extensions: ['.jsx', '.tsx'] },
      ],

      'brace-style': 'off',
      '@stylistic/brace-style': baseStyleRules['brace-style'],

      camelcase: 'off',
      // The `@typescript-eslint/naming-convention` rule allows `leadingUnderscore` and `trailingUnderscore` settings. However, the existing `no-underscore-dangle` rule already takes care of this.
      '@typescript-eslint/naming-convention': [
        'error',
        // Allow camelCase variables (23.2), PascalCase variables (23.8), and UPPER_CASE variables (23.10)
        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        },
        // Allow camelCase functions (23.2), and PascalCase functions (23.8)
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
        // Airbnb recommends PascalCase for classes (23.3), and although Airbnb does not make TypeScript recommendations, we are assuming this rule would similarly apply to anything "type like", including interfaces, type aliases, and enums
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
      ],

      // The TypeScript version also adds 3 new options, all of which should be
      // set to the same value as the base config
      'comma-dangle': 'off',
      '@stylistic/comma-dangle': [
        baseStyleRules['comma-dangle'][0],
        {
          ...baseStyleRules['comma-dangle'][1],
          enums: baseStyleRules['comma-dangle'][1].arrays,
          generics: baseStyleRules['comma-dangle'][1].arrays,
          tuples: baseStyleRules['comma-dangle'][1].arrays,
        },
      ],

      'comma-spacing': 'off',
      '@stylistic/comma-spacing': baseStyleRules['comma-spacing'],

      'default-param-last': 'off',
      '@typescript-eslint/default-param-last':
        baseBestPracticesRules['default-param-last'],

      'dot-notation': 'off',
      '@typescript-eslint/dot-notation': baseBestPracticesRules['dot-notation'],

      'array-bracket-spacing': 'off',
      '@stylistic/array-bracket-spacing':
        baseStyleRules['array-bracket-spacing'],

      'func-call-spacing': 'off',
      '@stylistic/func-call-spacing': baseStyleRules['func-call-spacing'],

      indent: 'off',
      '@stylistic/indent': baseStyleRules.indent,

      'keyword-spacing': 'off',
      '@stylistic/keyword-spacing': baseStyleRules['keyword-spacing'],

      'lines-between-class-members': 'off',
      '@stylistic/lines-between-class-members':
        baseStyleRules['lines-between-class-members'],

      'no-array-constructor': 'off',
      '@typescript-eslint/no-array-constructor':
        baseStyleRules['no-array-constructor'],

      'no-empty-function': 'off',
      '@typescript-eslint/no-empty-function':
        baseBestPracticesRules['no-empty-function'],

      'no-extra-parens': 'off',
      '@stylistic/no-extra-parens': baseErrorsRules['no-extra-parens'],

      'no-extra-semi': 'off',
      '@stylistic/no-extra-semi': baseErrorsRules['no-extra-semi'],

      'no-implied-eval': 'off',
      'no-new-func': 'off',
      '@typescript-eslint/no-implied-eval':
        baseBestPracticesRules['no-implied-eval'],

      'no-loop-func': 'off',
      '@typescript-eslint/no-loop-func': baseBestPracticesRules['no-loop-func'],

      'no-magic-numbers': 'off',
      '@typescript-eslint/no-magic-numbers':
        baseBestPracticesRules['no-magic-numbers'],

      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': baseVariablesRules['no-shadow'],

      'space-before-blocks': 'off',
      '@stylistic/space-before-blocks': baseStyleRules['space-before-blocks'],

      'no-throw-literal': 'off',
      '@typescript-eslint/only-throw-error':
        baseBestPracticesRules['no-throw-literal'],

      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions':
        baseBestPracticesRules['no-unused-expressions'],

      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': baseVariablesRules['no-unused-vars'],

      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define':
        baseVariablesRules['no-use-before-define'],

      'no-useless-constructor': 'off',
      '@typescript-eslint/no-useless-constructor':
        baseEs6Rules['no-useless-constructor'],

      quotes: 'off',
      '@stylistic/quotes': baseStyleRules.quotes,

      semi: 'off',
      '@stylistic/semi': baseStyleRules.semi,

      'space-before-function-paren': 'off',
      '@stylistic/space-before-function-paren':
        baseStyleRules['space-before-function-paren'],

      'require-await': 'off',
      '@typescript-eslint/require-await':
        baseBestPracticesRules['require-await'],

      'no-return-await': 'off',
      '@typescript-eslint/return-await': [
        baseBestPracticesRules['no-return-await'] as any,
        'in-try-catch',
      ],

      'space-infix-ops': 'off',
      '@stylistic/space-infix-ops': baseStyleRules['space-infix-ops'],

      'object-curly-spacing': 'off',
      '@stylistic/object-curly-spacing': baseStyleRules['object-curly-spacing'],

      // The base rule works fine with Typescript, but the Typescript version has
      // additional options for our users.
      'class-methods-use-this': 'off',
      '@typescript-eslint/class-methods-use-this': [
        (baseBestPracticesRules['class-methods-use-this'] as any)[0],
        {
          ...(baseBestPracticesRules['class-methods-use-this'] as any)[1],
        },
      ],

      // Append 'ts' and 'tsx' to Airbnb 'import/extensions' rule
      // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
      'import/extensions': [
        baseImportsRules['import/extensions'][0],
        baseImportsRules['import/extensions'][1],
        {
          ...baseImportsRules['import/extensions'][2],
          ts: 'never',
          tsx: 'never',
        },
      ],

      // Append 'ts' and 'tsx' extensions to Airbnb 'import/no-extraneous-dependencies' rule
      // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
      'import/no-extraneous-dependencies': [
        baseImportsRules['import/no-extraneous-dependencies'][0],
        {
          ...baseImportsRules['import/no-extraneous-dependencies'][1],
          devDependencies: baseImportsRules[
            'import/no-extraneous-dependencies'
          ][1].devDependencies.reduce(
            /**
             * @param {string[]} result
             * @param {string} devDep
             */
            (result: string[], devDep: string) => {
              const toAppend = [devDep];
              const devDepWithTs = devDep.replace(/\bjs(x?)\b/g, 'ts$1');

              if (devDepWithTs !== devDep) toAppend.push(devDepWithTs);

              return [...result, ...toAppend];
            },
            [],
          ),
        },
      ],
    },
  },
  {
    files: ['*.ts', '*.tsx'],
    rules: {
      // The following rules are enabled in Airbnb config, but are already checked (more thoroughly) by the TypeScript compiler
      // Some of the rules also fail in TypeScript files, for example: https://github.com/typescript-eslint/typescript-eslint/issues/662#issuecomment-507081586
      // Rules are inspired by: https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/eslint-recommended.ts
      'constructor-super': 'off',
      'getter-return': 'off',
      'no-const-assign': 'off',
      'no-dupe-args': 'off',
      'no-dupe-class-members': 'off',
      'no-dupe-keys': 'off',
      'no-func-assign': 'off',
      'no-import-assign': 'off',
      'no-new-symbol': 'off',
      'no-obj-calls': 'off',
      'no-redeclare': 'off',
      'no-setter-return': 'off',
      'no-this-before-super': 'off',
      'no-undef': 'off',
      'no-unsafe-negation': 'off',
      'valid-typeof': 'off',
      // The following rules are enabled in Airbnb config, but are recommended to be disabled within TypeScript projects
      // See: https://github.com/typescript-eslint/typescript-eslint/blob/13583e65f5973da2a7ae8384493c5e00014db51b/docs/linting/TROUBLESHOOTING.md#eslint-plugin-import
      'import/named': 'off',
      'import/no-named-as-default-member': 'off',
      // Disable `import/no-unresolved`, see README.md for details
      'import/no-unresolved': 'off',
    },
  },
];
