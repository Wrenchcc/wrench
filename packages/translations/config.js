const { locales } = require('@wrench/translations')

module.exports = {
  defaultNamespace: 'common',
  defaultValue: '',
  indentation: 4,
  // createOldCatalogs: true,
  lexers: {
    js: ['JavascriptLexer'],
    ts: ['JsxLexer'],
    tsx: ['JsxLexer'],
    default: ['JsxLexer'],
  },
  lineEnding: 'auto',
  locales,
  namespaceSeparator: ':',
  output: 'src/locales/$LOCALE/$NAMESPACE.json',
  input: undefined,
  reactNamespace: false,
  sort: true,
  useKeysAsDefaultValue: false,
  verbose: false,
}
