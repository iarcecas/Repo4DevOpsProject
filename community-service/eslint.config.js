import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    files: ['**/*.js'],

    ignores: ['node_modules/**', 'coverage/**', '__tests__/**', 'dist/**', 'build/**', 'public/**', 'client/**', 'server/**'],

    languageOptions: {
      ecmaVersion: 'latest', 
      sourceType: 'module', 
      globals: {
        ...globals.node,
      },
    },

    rules: {
      ...js.configs.recommended.rules,
      'no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
      'no-console': 'off',
      'indent': ['warn', 2],
      'semi': ['warn', 'always'],
      'quotes': ['warn', 'single'], 
    },
  },
];