module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  plugins: [],
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:promise/recommended',
    'plugin:sonarjs/recommended',
    'plugin:unicorn/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/']
      },
      typescript: {
        alwaysTryTypes: true
      }
    },
    react: {
      pragma: 'React',
      version: 'detect'
    }
  },
  ignorePatterns: ['node_modules/', 'dist/', '*.tsbuildinfo', 'vite-env.d.ts', 'vite.config.ts'],
  rules: {
    // base
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': 'off',
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'react/react-in-jsx-scope': 'off',
    'react/no-unescaped-entities': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'unicorn/filename-case': 'off',
    'react/prop-types': 'off',
    // end

    // prettier
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    'prettier/prettier': [
      'error',
      {
        printWidth: 100,
        tabWidth: 2,
        useTabs: false,
        semi: true,
        singleQuote: true,
        jsxSingleQuote: true,
        trailingComma: 'none',
        bracketSpacing: true,
        bracketSameLine: false,
        arrowParens: 'always'
      }
    ]
    // end prettier
  }
};