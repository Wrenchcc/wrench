import NextI18Next from 'next-i18next'
import * as humanFormat from 'human-format'
import path from 'path'
import fs from 'fs'

export const SUPPORTED_LOCALS = ['en', 'sv']

console.log('heeloo')
console.log(path.resolve("./public/locales/en/Blog.json'"))

fs.readdir('.', (err, files) => {
  files.forEach(file => {
    console.log(file)
  })
})

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
