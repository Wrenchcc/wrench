import NextI18Next from 'next-i18next'
import * as humanFormat from 'human-format'
import path from 'path'

export const SUPPORTED_LOCALS = ['en', 'sv']

const NextI18NextInstance = new NextI18Next({
  defaultLanguage: 'en',
  otherLanguages: SUPPORTED_LOCALS,
  localePath: path.resolve('./public/locales'),
  interpolation: {
    escapeValue: false,
    format(value, format) {
      if (format === 'humanFormat') {
        return humanFormat(value, {
          separator: '',
          decimals: 1,
        })
      }

      return value
    },
  },
})

export default NextI18NextInstance

export const i18n = NextI18NextInstance.i18n

export const { appWithTranslation, useTranslation } = NextI18NextInstance
