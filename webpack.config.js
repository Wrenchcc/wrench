const path = require('path')
const debug = require('debug')('build:webpack')

const dir = process.env.DIR

if (!dir) throw new Error('Define directory to build with the -d option.')
debug(`> Building ${dir}, entry: ${dir}/index.ts, output: ${dir}/dist/server.js`)

module.exports = {
  entry: `./${dir}/index.ts`,
  target: 'node',
  mode: 'production',
  stats: 'none',
  output: {
    path: path.resolve(__dirname, dir, 'dist'),
    filename: 'server.js',
    libraryTarget: 'commonjs',
  },
  resolve: {
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
