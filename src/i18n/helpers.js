import I18n from 'react-native-i18n'

// Output: en
export function getUsedLocale() {
  const usedLocale = I18n.locales.default().find(l => l in Object.keys(I18n.translations))
  return usedLocale || I18n.defaultLocale
}

// Output: ['en-US', 'en'], looks for keys in combined translations.json
export const getSupportedLocales = () => Object.keys(I18n.translations)
