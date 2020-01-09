module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['prettier', 'prettier/react', 'plugin:@typescript-eslint/recommended', 'prettier/@typescript-eslint'],
  plugins: ['prettier', '@typescript-eslint/eslint-plugin'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'prettier/prettier': ['warn'],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_|^req|^next' }],
    '@typescript-eslint/camelcase': ['error', { properties: 'never' }],
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    'react/prop-types': 0,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
