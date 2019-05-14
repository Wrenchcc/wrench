require('dotenv').config()
const withPlugins = require('next-compose-plugins')
const optimizedImages = require('next-optimized-images')
const withTypescript = require('@zeit/next-typescript')

module.exports = withPlugins([withTypescript, optimizedImages], {
  distDir: '../.next',
  env: {
    // BUILD_ID: require('child_process') // eslint-disable-line
    //   .execSync('git rev-parse --short HEAD')
    //   .toString()
    //   .trim(),
    BUILD_ID: '123',
    API_ENDPOINT:
      process.env.NODE_ENV === 'production'
        ? 'https://api.wrench.cc/graphql'
        : process.env.API_ENDPOINT,
  },
})
