module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  files: [
    "**/*.ts"
  ],
  env: {
    node: true,
    es6: true,
  },
};