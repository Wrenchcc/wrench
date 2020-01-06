// NOTE:
// When RN is building the bundler goes from root for now
const { readdirSync } = require('fs')

const alias = {
  images: './packages/mobile/assets/images',
  videos: './packages/mobile/assets/videos',

  ...readdirSync('./packages/mobile/src', { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .reduce(
      (res, item) => ({
        ...res,
        [item]: `./packages/mobile/src/${item}`,
      }),
      {}
    ),
}

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./packages/mobile'],
        extensions: ['.js', '.ts', '.tsx'],
        alias,
      },
    ],
  ],
}
