const fs = require('fs-extra')

const LOCALES_PATH = '../translations/src/locales'
const DESTINATION_PATH = './public/locales'

console.log('Copy locale files')

fs.copySync(LOCALES_PATH, DESTINATION_PATH, {
  recursive: true,
})
