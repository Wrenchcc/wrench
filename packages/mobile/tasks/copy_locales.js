const { readdirSync, readFileSync, writeFileSync } = require('fs')
const { copySync } = require('fs-extra')

const LOCALES_PATH = '../translations/src/locales'
const DESTINATION_PATH = 'src/translations'

const getDirectories = (source) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)

const dirs = getDirectories(LOCALES_PATH)

dirs.map((dir) => {
  const localePath = `${LOCALES_PATH}/${dir}/translations.json`
  const destinationPath = `${DESTINATION_PATH}/${dir}/translations.json`

  copySync(localePath, destinationPath)
})
