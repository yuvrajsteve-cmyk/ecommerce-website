import js from '@eslint/js'
import globals from 'globals'

export default [
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.jest,
        require: 'readonly',
        module: 'readonly',
        __dirname: 'readonly',
        process: 'readonly'
      }
    },
    rules: {
      'indent': ['error', 2],
      'linebreak-style': 0,
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { 'before': true, 'after': true }],
      'no-console': 0,
      'no-unused-vars': ['error', { 'argsIgnorePattern': '^req|^res|^next' }]
    }
  }
]
