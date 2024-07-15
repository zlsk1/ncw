/* eslint-env node */

module.exports = {
  root: true,
  extends: [
    'plugin:vue/recommended',
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'vue/max-attributes-per-line': ['error', {
      'singleline': {
        'max': 3
      },
      'multiline': {
        'max': 1
      }
    }],
    'vue/multi-word-component-names': ['error', {
      'ignores': ['index', 'Audio', 'Bar']
    }]
  }
}
