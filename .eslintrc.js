// 使用 https://github.com/AlloyTeam/eslint-config-alloy
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'eslint-config-alloy/react',
    'plugin:prettier/recommended',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    env: { es6: true },
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  globals: {
    React: false,
    jQuery: false,
    $: false,
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  plugins: ['react', 'import', 'jsx-a11y', 'react-hooks'],
  rules: {
    'no-undef': 'off',
    'no-tabs': 'off',
    'no-console': 'warn',
    'no-unused-vars': 'warn',
    'no-useless-escape': 'warn',
    'no-mixed-spaces-and-tabs': 'off',
    'no-param-reassign': 'off',
    radix: 'off',
    // 回调函数嵌套禁止超过 3 层，多了请用 async await 替代
    'max-nested-callbacks': ['error', 6],
    'no-multi-spaces': 'warn',
    semi: 'warn',
    'no-new-func': 'off',
    'no-multiple-empty-lines': 'off',
    'no-cond-assign': 'warn',
    eqeqeq: 'off',
    'jsx-a11y/click-events-have-key-events': ['off'],
    'no-multi-assign': ['off'],
    'class-methods-use-this': ['off'],
    'react-hooks/rules-of-hooks': 'error', // 检查 Hook 的规则
    'react-hooks/exhaustive-deps': 'warn', // 检查 effect 的依赖
  },
};
