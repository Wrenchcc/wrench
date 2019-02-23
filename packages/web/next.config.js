// const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const path = require('path')
const Dotenv = require('dotenv-webpack')
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const withTypescript = require('@zeit/next-typescript')
const withPlugins = require('next-compose-plugins')

module.exports = withPlugins(
  [
    withTypescript,
    [
      withBundleAnalyzer,
      {
        analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
        analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
      },
    ],
  ],
  {
    // distDir: '../.next',
    webpack: (config, { isServer }) => {
      // config.plugins.push(new LodashModuleReplacementPlugin({ paths: true }))
      config.plugins = config.plugins || []

      config.plugins = [
        ...config.plugins,
        new Dotenv({
          path: path.join(__dirname, '.env'),
          systemvars: true,
        }),
      ]

      if (!isServer) {
        config.externals = {
          'i18next-browser-languagedetector': '{}',
          'i18next-express-middleware': '{}',
          // './config': '{}',
        }
      }
      return config
    },
  }
)

// const path = require('path')
// const Dotenv = require('dotenv-webpack')
//
// const withTypescript = require('@zeit/next-typescript')
//
// module.exports = withTypescript({
//   webpack: config => {
// config.plugins = config.plugins || []
//
// config.plugins = [
//   ...config.plugins,
//   new Dotenv({
//     path: path.join(__dirname, '.env'),
//     systemvars: true,
//   }),
//     ]
//
//     return config
//   },
// })
