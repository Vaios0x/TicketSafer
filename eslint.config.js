import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist', 'node_modules', '**/*.d.ts'] },
  // Configuración para archivos React/Frontend
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.es2022,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { 
        varsIgnorePattern: '^[A-Z_]|^motion$|^activeTab$|^setActiveTab$|^searchRef$|^eventsData$|^onSearch$|^onFilterChange$|^showSuggestions$|^recentSearches$|^darkTheme$',
        argsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_'
      }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  // Configuración específica para archivos Node.js
  {
    files: ['vite.config.js', 'scripts/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.node,
        __dirname: 'readonly',
        process: 'readonly',
        require: 'readonly',
        module: 'readonly',
        exports: 'readonly',
      },
      sourceType: 'module',
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-undef': 'off',
      'no-unused-vars': ['error', { 
        varsIgnorePattern: '^[A-Z_]|^id$',
        argsIgnorePattern: '^_',
      }],
    },
  },
  // Configuración específica para main.jsx con globals de desarrollo
  {
    files: ['src/main.jsx'],
    languageOptions: {
      globals: {
        ...globals.browser,
        __DEV__: 'readonly',
        __PROD__: 'readonly',
      },
    },
  },
]
