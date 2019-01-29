const path = require('path')

// Allow files to imported from outside mobile root
module.exports = {
  watchFolders: [
    // Resolves the project directory.
    path.resolve(__dirname),

    // Resolves the monorepo's base folder
    // path.resolve(__dirname, '../../../'),
  ],
}

//
// const path = require('path')
// const blacklist = require('metro-config/src/defaults/blacklist');
//
// // Allow files to imported from outside mobile root
// module.exports = {
//   watchFolders: [
//     // Resolves the project directory.
//     path.resolve(__dirname),
//
//     // Resolves the monorepo's base folder
//     path.resolve(__dirname, '../..'),
//   ],
//   resolver: {
//     blacklistRE: blacklist([
//       /node_modules\/.*\/node_modules\/react-native\/.*/,
//     ])
//   },
// }
