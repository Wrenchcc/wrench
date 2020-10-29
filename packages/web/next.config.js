require('dotenv').config()

const path = require('path')
const dotenv = require('dotenv-webpack')

module.exports = {
  poweredByHeader: false,
  target: 'serverless',
  env: {
    GA_TRACKING_ID: process.env.GA_TRACKING_ID,
    SENTRY_DSN: process.env.SENTRY_DSN,
    API_ENDPOINT: process.env.API_ENDPOINT,
    APPLE_REDIRECT_URI: process.env.APPLE_REDIRECT_URI,
    MAPBOX_API_KEY: process.env.MAPBOX_API_KEY,
    BUILD_ID: require('child_process').execSync('git rev-parse --short HEAD').toString().trim(),
  },
  webpack: (config, options) => {
    config.plugins = config.plugins || []

    config.plugins = [
      ...config.plugins,
      new dotenv({
        path: path.join(__dirname, '.env'),
      }),
    ]

    if (!options.isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser'
    }

    return config
  },
}
