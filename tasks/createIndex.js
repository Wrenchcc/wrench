#!/usr/local/bin node

const fs = require('fs')
const glob = require('glob')
const path = require('path')

const input = process.argv[2]
const output = path.resolve(process.argv[3])

const toCamelCase = s => s.replace(/-([a-z])/g, group => group[1].toUpperCase())

const assetExports = glob
  .sync(input)
  .sort((a, b) => path.basename(a).localeCompare(path.basename(b)))
  .map(f => {
    const assetPath = path
      .resolve(f)
      .replace(output, '.')
      .replace(/\.svg/, '.png')
    const assetName = toCamelCase(path.basename(f).replace(/\.(svg|lottie\.json)/, ''))
    return `export { default as ${assetName} } from '${assetPath}'`
  })

const contents = assetExports.join('\n') + '\n'

fs.writeFileSync(path.join(output, 'index.js'), contents)
