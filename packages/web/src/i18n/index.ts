// @ts-nocheck
import NextI18Next from 'next-i18next'
import path from 'path'

export const SUPPORTED_LOCALS = ['en', 'sv']

const NextI18NextInstance = new NextI18Next({
  defaultLanguage: 'en',
  otherLanguages: SUPPORTED_LOCALS,
  localePath: path.resolve('./public/static/locales'),
})

export default NextI18NextInstance

 
export const {
  appWithTranslation,
  useTranslation,
} = NextI18NextInstance 