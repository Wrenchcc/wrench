require('dotenv').config()
const withOptimizedImages = require('next-optimized-images')

module.exports = withOptimizedImages({
  distDir: '../.next',
  env: {
    BUILD_ID: require('child_process') // eslint-disable-line
      .execSync('git rev-parse --short HEAD')
      .toString()
      .trim(),
    API_ENDPOINT:
      process.env.NODE_ENV === 'production'
        ? 'https://api.wrench.cc/graphql'
        : process.env.API_ENDPOINT,
  },
})
