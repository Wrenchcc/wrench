require('dotenv').config()

const path = require('path')
const withPlugins = require('next-compose-plugins')
const withSourceMaps = require('@zeit/next-source-maps')({ devtool: 'hidden-source-map' })
const optimizedImages = require('next-optimized-images')
const dotenv = require('dotenv-webpack')

module.exports = withPlugins(
  [optimizedImages],
  withSourceMaps({
    webpack: (config, options) => {
      config.plugins = config.plugins || []

      config.plugins = [
        ...config.plugins,
        new dotenv({
          path: path.join(__dirname, '.env'),
          systemvars: true,
        }),
      ]

      if (!options.isServer) {
        config.resolve.alias['@sentry/node'] = '@sentry/browser'
      }

      return config
    },
    poweredByHeader: false,
    env: {
      BUILD_ID: require('child_process') // eslint-disable-line
        .execSync('git rev-parse --short HEAD')
        .toString()
        .trim(),
    },
  })
)
