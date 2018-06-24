const fs = require('fs')
const path = require('path')
const glob = require('glob')
const os = require('os')
const async = require('async')
const { Rsvg } = require('librsvg-prebuilt')
const { yellow, green, gray } = require('colors/safe')

const MULTIPLIERS = [1, 2, 3]
const NUM_CORES = os.cpus().length

function getRelativePath(file) {
  return path.relative(path.dirname('..'), file)
}

function transformSVG() {
  const args = process.argv.slice(2)

  const input = args[0]
  const output = args[1]
  const verbose = args[2]

  if (output && !fs.existsSync(output)) fs.mkdirSync(output)

  const files = glob.sync(input).map(f => path.resolve(f))
  const tasks = files.reduce((acc, file) => {
    MULTIPLIERS.forEach(multiplier => {
      acc.push({
        file,
        multiplier,
        output,
        verbose,
      })
    })
    return acc
  }, [])

  console.log(yellow(`Transforming ${files.length} SVGs into ${tasks.length} PNG variations...`))

  async.eachLimit(tasks, NUM_CORES, transformSVGTask, err => {
    if (err) {
      throw err
    }
    console.log(green('Done!'))
  })
}

function transformSVGTask({ multiplier, file, output, verbose }, callback) {
  const pngPath = file.replace(/\.svg$/, `@${multiplier}x.png`)
  const destinationPath = output ? `${output}/${path.basename(pngPath)}` : pngPath

  if (verbose) console.log(gray(`${getRelativePath(file)} --> ${getRelativePath(destinationPath)}`))

  const svg = new Rsvg()
  svg.on('finish', () => {
    fs.writeFile(
      destinationPath,
      svg.render({
        format: 'png',
        width: svg.width * multiplier,
        height: svg.height * multiplier,
      }).data,
      callback
    )
  })
  fs.createReadStream(file).pipe(svg)
}

transformSVG()
