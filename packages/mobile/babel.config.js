module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          images: './assets/images',
          videos: './assets/videos',
        },
        extensions: ['.js'],
      },
    ],
  ],
  presets: ['module:metro-react-native-babel-preset'],
}
