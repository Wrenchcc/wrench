const path = require('path')

module.exports = {
  entry: './server.ts',
  target: 'node',
  mode: 'production',
  stats: 'none',
  output: {
    path: path.resolve(__dirname, 'dist'),
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
