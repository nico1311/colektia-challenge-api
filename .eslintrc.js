module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: [
    'airbnb-base'
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    'consistent-return': ['off'],
    'max-len': ['error', 125, 2, {
      ignoreUrls: true,
      ignoreComments: true,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }]
  }
};
