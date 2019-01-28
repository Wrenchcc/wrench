const path = require('path')
// https://github.com/facebook/react-native/issues/21922
// Allow files to imported from outside mobile root
module.exports = {
  getProjectRoots() {
    return [
      // Resolves the project directory.
      path.resolve(__dirname),

      // Resolves the monorepo's base folder
      path.resolve(__dirname, '../..'),
    ]
  },
}
