module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-restricted-globals': ['error', 'event'],
    'no-console': 'off',
    'no-loop-func': 'off',
    'no-plusplus': 'off',
    'no-restricted-syntax': 'off',
    'no-underscore-dangle': 'off',
    camelcase: 'off',
  },
};
