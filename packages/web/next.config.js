module.exports = {
  poweredByHeader: false,
  target: 'serverless',
  images: {
    domains: ['edge-files.wrench.cc'],
    loader: 'default', // 'edge',
    deviceSizes: [320, 420, 768, 1024, 1200],
    // imageSizes: [80, 50, 40, 30],
  },
  env: {
    GA_TRACKING_ID: process.env.GA_TRACKING_ID,
    SENTRY_DSN: process.env.SENTRY_DSN,
    API_ENDPOINT_EDGE: process.env.API_ENDPOINT_EDGE,
    APPLE_REDIRECT_URI: process.env.APPLE_REDIRECT_URI,
    MAPBOX_API_KEY: process.env.MAPBOX_API_KEY,
    BUILD_ID: require('child_process').execSync('git rev-parse --short HEAD').toString().trim(),
  },
}
