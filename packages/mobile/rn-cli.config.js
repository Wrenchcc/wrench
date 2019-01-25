const path = require('path')

// Allow files to imported from outside mobile root
module.exports = {
  getProjectRoots: () => [__dirname, path.join(__dirname, '..')],
}
