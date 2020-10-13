const resolve = require('path').resolve

const ROOT_FOLDER = resolve(__dirname, '../../')

const config = {
  transformer: {
    getTransformOptions: () => {
      return {
        transform: {
          experimentalImportSupport: true,
        },
      }
    },
  },
  projectRoot: ROOT_FOLDER,
}

module.exports = config
