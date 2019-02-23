const path = require('path')
const Dotenv = require('dotenv-webpack')

const withTypescript = require('@zeit/next-typescript')

module.exports = withTypescript({
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
