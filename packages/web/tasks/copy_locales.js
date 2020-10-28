const fs = require('fs-extra')
const localeSrc = '../translations/src/locales'
const localeDest = './public/locales'

console.log('Copy locale files')

fs.copySync(localeSrc, localeDest, {
  recursive: true,
})
