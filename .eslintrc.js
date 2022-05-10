module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'off' : 'warn',
    'no-async-promise-executor': 0,
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 'off' : 'warn',
    'no-useless-escape': 'off',
  },
}
