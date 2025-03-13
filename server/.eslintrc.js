module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  rules: {
    'import/no-absolute-path': 'error', // 禁止绝对路径导入
  },
  settings: {
    'import/resolver': {
      typescript: {}, // 使 ESLint 解析 TypeScript
    },
  },
}
