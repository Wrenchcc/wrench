const fs = require('fs')
const glob = require('glob')
const path = require('path')
const { mergeAll } = require('ramda')

const input = process.argv[2]
const output = path.resolve(process.argv[3])

const swapComponentWithLang = file => {
  const [root] = Object.keys(file)
  const translations = file[root]

  return Object.keys(translations).reduce(
    (acc, lang) => ({
      ...acc,
      ...{
        [lang]: {
          [root]: translations[lang],
        },
      },
    }),
    {}
  )
}

const getTranslations = glob
  .sync(input)
  .map(f => swapComponentWithLang(JSON.parse(fs.readFileSync(f, 'utf8'))))

const getSupportedLangs = f => f.reduce(
  (acc, item) => [...acc, ...Object.keys(item).filter(lang => acc.indexOf(lang) === -1)],
  []
)

const generateTranslationFile = translations => getSupportedLangs(translations).reduce((list, lang) => {
  if (!list[lang]) {
    list[lang] = {}
  }

  list[lang] = mergeAll(translations.map(file => file[lang]))

  return list
}, {})

fs.writeFileSync(output, JSON.stringify(generateTranslationFile(getTranslations), null, 2), 'utf8')
