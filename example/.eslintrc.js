module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    '@jetrockets/base',
    '@jetrockets/react',
    '@jetrockets/typescript',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier'],
  settings: {
    'import/ignore': ['node_modules/react-native/index\\.js$'],
  },
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_^' }],
    curly: 0, // @react-native-community disable curly
    'react/jsx-first-prop-new-line': [2, 'multiline'],
    'react/jsx-max-props-per-line': [2, { maximum: 1, when: 'multiline' }],
    'react/jsx-indent-props': [2, 2],
    'react/jsx-closing-bracket-location': [2, 'tag-aligned'],
    'prettier/prettier': 0,

    'import/no-unresolved': 0,
  },
};
