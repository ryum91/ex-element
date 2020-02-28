module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['naver', 'plugin:@typescript-eslint/recommended', 'prettier'],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  rules: {
    'class-methods-use-this': 'off',
    'import/prefer-default-export': 'off',
    'no-throw-literal': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'spaced-comment': 0
  }
};
