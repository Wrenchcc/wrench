const path = require('path')
const debug = require('debug')('build:webpack')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const { DIR } = process.env

if (!DIR) throw new Error('Define Directory to build with the -d option.')
debug(`> Building ${DIR}, entry: ${DIR}/index.ts, output: ${DIR}/dist/server.js`)

module.exports = {
  entry: `./${DIR}/index.ts`,
  target: 'node',
  mode: 'production',
  stats: 'none',
  output: {
    path: path.resolve(__dirname, DIR, 'dist'),
    filename: 'server.js',
    libraryTarget: 'commonjs',
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: ['.ts', '.js', '.json'],
  },
  externals: ['aws-sdk'],
  module: {
    rules: [
      {
        use: 'ts-loader',
        test: /\.ts?$/,
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
    ],
  },
}
