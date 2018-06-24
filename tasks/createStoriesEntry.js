const fs = require('fs')
const glob = require('glob')
const path = require('path')

const input = process.argv[2]
const output = path.resolve(process.argv[3])
const projectRoot = `${path.resolve('./src')}/`

const assetExports = glob
  .sync(input)
  .sort((a, b) => path.basename(a).localeCompare(path.basename(b)))
  .map(f => {
    const storyPath = path
      .resolve(f)
      .replace(projectRoot, '')
      .replace(/\.js/, '')
    return `import '${storyPath}'`
  })

fs.writeFileSync(output, `${assetExports.sort().join('\n')}\n`)
