import eslint from 'eslint';
import reactHooks from 'eslint-plugin-react-hooks';

export const reactHooksJs: eslint.Linter.Config = {
  // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb/rules/react-hooks.js

  plugins: { 'react-hooks': reactHooks },

  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },

  rules: {
    // Enforce Rules of Hooks
    // https://github.com/facebook/react/blob/c11015ff4f610ac2924d1fc6d569a17657a404fd/packages/eslint-plugin-react-hooks/src/RulesOfHooks.js
    'react-hooks/rules-of-hooks': 'error',

    // Verify the list of the dependencies for Hooks like useEffect and similar
    // https://github.com/facebook/react/blob/1204c789776cb01fbaf3e9f032e7e2ba85a44137/packages/eslint-plugin-react-hooks/src/ExhaustiveDeps.js
    'react-hooks/exhaustive-deps': 'error',
  },
};
