const { locales } = require('./src/index')

module.exports = {
  defaultNamespace: 'common',
  defaultValue: '',
  indentation: 4,
  lexers: {
    js: ['JavascriptLexer'],
    ts: ['JsxLexer'],
    tsx: ['JsxLexer'],
    default: ['JavascriptLexer'],
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
