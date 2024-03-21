module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@babel'],
  rules: {
    // Other rules...
  },
};
