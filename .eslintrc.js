module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  // root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react/recommended',
    // "plugin:unicorn/recommended",
    // "airbnb",
    // "airbnb-typescript",
    // "prettier",
  ],
  // ignorePatterns: ['.eslintrc.js'],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      plugins: ['@typescript-eslint'],
      rules: {
        // '@typescript-eslint/no-use-before-define': ['error'],
        'no-use-before-define': 'off',
        // 'unicorn/require-post-message-target-origin': 'off',
      },
    },
    {
      files: '**/*.tsx',
      rules: {
        'global-require': 'off',
        'prefer-destructuring': 'off',
        // 'unicorn/prefer-module': 'off',
      },
    },
    {
      files: '**/*.{test,spec}.{ts,tsx}',
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: true,
          },
        ],
        'react/jsx-props-no-spreading': 'off',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    tsconfigRootDir: __dirname,
    project: './tsconfig.eslint.json',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    // "prettier",
    'import',
    // "unicorn",
    'simple-import-sort',
    // 'sort-keys-fix',
    'unused-imports',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    'eol-last': ['error', 'always'],
    'import/extensions': 'off',
    'import/no-default-export': 'off',
    'import/prefer-default-export': 'off',
    'no-unused-vars': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react/destructuring-assignment': 'off',
    'react/function-component-definition': 'off',
    // 'react/jsx-sort-props': [
    //   'error',
    //   {
    //     ignoreCase: true,
    //   },
    // ],

    // allow importing using @/ as an alias
    'import/no-unresolved': [
      'error',
      {
        ignore: ['^@/'],
      },
    ],

    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'react/style-prop-object': 'off',
    // 'simple-import-sort/exports': 'warn',
    // 'simple-import-sort/imports': 'warn',
    // prevent eslint to complain about the "styles" variable being used before it was defined
    'no-use-before-define': [
      'error',
      { variables: false, functions: false, classes: false },
    ],
    // 'sort-keys-fix/sort-keys-fix': 'warn',
    // 'unicorn/filename-case': [
    //   'error',
    //   {
    //     cases: {
    //       kebabCase: true,
    //     },
    //   },
    // ],
    // 'unicorn/no-null': 'off',
    // 'unicorn/prevent-abbreviations': [
    //   'error',
    //   {
    //     replacements: {
    //       args: false,
    //       params: false,
    //       props: false,
    //       ref: false,
    //     },
    //   },
    // ],
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        args: 'after-used',
        argsIgnorePattern: '^_',
        vars: 'all',
        varsIgnorePattern: '^_',
      },
    ],
  },
  settings: {
    'import/ignore': ['react-native'],
    react: {
      createClass: 'createReactClass',
      fragment: 'Fragment',
      pragma: 'React',
      version: 'detect',
    },
  },
};
