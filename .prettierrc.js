module.exports = {
  trailingComma: 'all',
  useTabs: false,
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  bracketSpacing: true,
  printWidth: 140,
  endOfLine: 'lf',
  overrides: [
    {
      "files": "*.njk",
      options: {
        parser: "xhtml"
      }
    }
  ]
};
