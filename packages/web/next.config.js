const path = require('path')
const Dotenv = require('dotenv-webpack')
const withPlugins = require('next-compose-plugins')
const optimizedImages = require('next-optimized-images')
const withTypescript = require('@zeit/next-typescript')

module.exports = withPlugins([withTypescript, optimizedImages], {
  distDir: '../.next',
  webpack: config => {
    config.plugins = config.plugins || []

    config.plugins = [
      ...config.plugins,
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true,
      }),
    ]

    return config
  },
})
