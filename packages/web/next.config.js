require('dotenv').config()
const withPlugins = require('next-compose-plugins')
const optimizedImages = require('next-optimized-images')
const withTypescript = require('@zeit/next-typescript')

module.exports = withPlugins([withTypescript, optimizedImages], {
  distDir: '../.next',
  publicRuntimeConfig: {
    API_ENDPOINT: process.env.API_ENDPOINT,
  },
})
