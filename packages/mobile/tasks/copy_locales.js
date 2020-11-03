const { readdirSync } = require('fs')
const { copySync } = require('fs-extra')

const LOCALES_PATH = '../translations/src/locales'
const DESTINATION_PATH = './android/app/src/main/assets/translations'

const getDirectories = (source) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)

const locales = getDirectories(LOCALES_PATH)

console.log('Copy locale files')

locales.map((locale) => {
  copySync(`${LOCALES_PATH}/${locale}/${locale}.json`, `${DESTINATION_PATH}/${locale}.json`)
})
