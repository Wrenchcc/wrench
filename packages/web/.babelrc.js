const { readdirSync } = require('fs')

module.exports = {
  presets: ['next/babel'],
  plugins: [
    'styled-components',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: readdirSync('./src', { withFileTypes: true })
          .filter(dirent => dirent.isDirectory())
          .map(dirent => dirent.name)
          .reduce(
            (res, item) => ({
              ...res,
              [item]: `./src/${item}`,
            }),
            {}
          ),
      },
    ],
  ],
}
