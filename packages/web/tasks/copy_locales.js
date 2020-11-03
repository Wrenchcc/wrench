const fs = require('fs-extra')
const { copySync } = require('fs-extra')

const LOCALES_PATH = '../translations/src/locales'
const DESTINATION_PATH = './public/locales'

console.log('Copy locale files')

copySync(LOCALES_PATH, DESTINATION_PATH, {
  recursive: true,
})
