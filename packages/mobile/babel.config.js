module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          images: './assets/images',
          videos: './assets/videos',
        },
        extensions: ['.js', '.ts', '.tsx'],
      },
    ],
  ],
}
