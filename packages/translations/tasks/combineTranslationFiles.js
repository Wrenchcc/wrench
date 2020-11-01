const { readdirSync, readFileSync, writeFileSync } = require('fs')

const LOCALES_PATH = 'src/locales'

const getDirectories = (source) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)

const dirs = getDirectories(LOCALES_PATH)

dirs.map((dir) => {
  const filePath = `${LOCALES_PATH}/${dir}`
  let translations = []

  readdirSync(filePath).forEach((file) => {
    const namespace = file.replace('.json', '')
    const data = JSON.parse(readFileSync(`${filePath}/${file}`, 'utf8'))

    translations.push({
      [namespace]: data,
    })
  })

  writeFileSync(`${filePath}/translations.json`, JSON.stringify(translations, null, 2), 'utf8')
})
