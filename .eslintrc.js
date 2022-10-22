module.exports = {
  env: {
    node: true,
    jest: true,
  },
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
    createDefaultProgram: true,
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'standard-with-typescript',
  ],
  rules: {
    semi: 0,
    'comma-dangle': [2, 'always-multiline'],
  },
  ignorePatterns: [
    'dist',
    'data',
  ],
};
