const { readdirSync, readFileSync, writeFileSync, unlinkSync, existsSync } = require('fs')

const LOCALES_PATH = 'src/locales'

const getDirectories = (source) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)

const dirs = getDirectories(LOCALES_PATH)

dirs.map((locale) => {
  let translations = {}

  const filePath = `${LOCALES_PATH}/${locale}`
  const localeFile = `${filePath}/${locale}.json`

  if (existsSync(localeFile)) {
    unlinkSync(localeFile)
  }

  readdirSync(filePath).forEach((file) => {
    if (file.includes('_old')) {
      return null
    }

    const namespace = file.replace('.json', '')
    const data = JSON.parse(readFileSync(`${filePath}/${file}`, 'utf8'))

    translations = { ...translations, [namespace]: data }
  })

  writeFileSync(localeFile, JSON.stringify(translations, null, 2), 'utf8')
})
