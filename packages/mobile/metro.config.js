const resolve = require('path').resolve

const ROOT_FOLDER = resolve(__dirname, '../../')

const config = {
  transformer: {
    getTransformOptions: () => {
      return {
        transform: {
          experimentalImportSupport: true,
          inlineRequires: true,
        },
      }
    },
  },
  resolver: {
    sourceExts: ['jsx', 'js', 'ts', 'tsx', 'cjs'],
  },
  projectRoot: ROOT_FOLDER,
}

module.exports = config
