const modulePaths = require('./packager/modules')
const resolve = require('path').resolve
const fs = require('fs')

const ROOT_FOLDER = resolve(__dirname, '../../')

const config = {
  transformer: {
    getTransformOptions: () => {
      const moduleMap = {}
      modulePaths.forEach(path => {
        if (fs.existsSync(path)) {
          moduleMap[resolve(path)] = true
        }
      })
      return {
        preloadedModules: moduleMap,
        transform: {
          experimentalImportSupport: true,
          inlineRequires: {
            blacklist: moduleMap,
          },
        },
      }
    },
  },
  projectRoot: ROOT_FOLDER,
}

module.exports = config
