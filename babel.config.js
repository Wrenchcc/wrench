// NOTE: When RN is building the bundler goes from root for now
// And thats why the mobile babel config never gets loaded
// Issue is that module-resolver is never registred thus no
// imports work and the bundler crashes

const resolve = require('path').resolve
const { readdirSync } = require('fs')

const MOBILE_FOLDER = resolve(__dirname, './packages/mobile/src')

const alias = {
  images: './packages/mobile/assets/images',
  videos: './packages/mobile/assets/videos',

  ...readdirSync(MOBILE_FOLDER, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .reduce(
      (res, item) => ({
        ...res,
        [item]: `${MOBILE_FOLDER}/${item}`,
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
        root: [MOBILE_FOLDER],
        extensions: ['.js', '.ts', '.tsx'],
        alias,
      },
    ],
  ],
}
