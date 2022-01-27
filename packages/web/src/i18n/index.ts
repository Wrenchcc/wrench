// @ts-nocheck
import NextI18Next from 'next-i18next'
import * as humanFormat from 'human-format'
import path from 'path'
import { locales, defaultLocale } from '@wrench/translations'

const NextI18NextInstance = new NextI18Next({
  defaultLanguage: defaultLocale,
  otherLanguages: locales,
  localePath: path.resolve('./public/locales'),
  debug: process.env.DEBUG_LOCALE,
  nonExplicitSupportedLngs: true,
  detection: {
    lookupQuerystring: 'hl',
    cookieMinutes: 24 * 60 * 365,
    cookieSecure: true,
    cookiePath: '/',
    cookieSameSite: 'strict',
    lookupCookie: 'preferred_language',
    order: ['querystring', 'cookie', 'navigator', 'header'],
  },
  react: {
    useSuspense: false,
    wait: true,
  },
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
