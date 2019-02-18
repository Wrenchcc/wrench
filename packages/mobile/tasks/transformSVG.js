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

  console.log(green(`Transforming ${files.length} SVGs into ${tasks.length} PNG variations...`))
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

// #!/usr/local/bin node
//
// const fs = require('fs')
// const glob = require('glob')
// const path = require('path')
// const crypto = require('crypto')
// const { yellow, green, gray } = require('colors/safe')
// const { spawn, execSync } = require('child_process')
//
// const MULTIPLIERS = [1, 2, 3]
// const rsvgBin = 'rsvg-convert'
// const optipngBin = 'optipng'
//
// function getRelativePath(file) {
//   return path.relative(path.dirname('..'), file)
// }
//
// function transformSVGTask(
//   { multiplier, file, destinationPath, verbose, rsvgBin, optipngBin },
//   callback = () => {}
// ) {
//   const rsvgOpts = [getRelativePath(file), '-z', multiplier, '-o', getRelativePath(destinationPath)]
//   const optipngOpts = ['--strip', 'all', getRelativePath(destinationPath)]
//
//   const rsvgCommand = `${rsvgBin} ${rsvgOpts.join(' ')}`
//   const optipngCommand = `${optipngBin} ${optipngOpts.join(' ')}`
//
//   if (verbose) console.log(gray(rsvgCommand))
//   spawn(rsvgBin, rsvgOpts)
//     .on('close', signal => {
//       if (signal !== 0) callback(Error(`Failed on "${rsvgCommand}"`))
//       if (verbose) console.log(gray(optipngCommand))
//       spawn(optipngBin, optipngOpts)
//         .on('close', signal => {
//           if (signal !== 0) callback(Error(`Failed on "${optipngCommand}"`))
//           callback()
//         })
//         .on('error', () => callback(Error(`Unable to spawn ${optipngBin}`)))
//     })
//     .on('error', () => callback(Error(`Unable to spawn ${rsvgBin}`)))
// }
//
// const manifestPath = path.resolve(__dirname, '../../assets/manifest.json')
//
// function transformSVG({ root, input, output, verbose, rsvgBin, optipngBin }) {
//   const normalizeFilepath = file => path.relative(root, file)
//
//   const prevManifest = fs.existsSync(manifestPath) ? require(manifestPath) : {}
//   if (verbose) console.log(gray(`source: '${input}', destination: '${output || '<same folder>'}'`))
//
//   const files = glob.sync(input).map(f => path.resolve(f))
//   if (verbose) console.log(gray(`found files for processing: ${files.length}`))
//
//   const nextManifest = files.reduce((obj, file) => {
//     const md5 = crypto
//       .createHash('md5')
//       .update(fs.readFileSync(file))
//       .digest('base64')
//     obj[normalizeFilepath(file)] = md5
//     return obj
//   }, {})
//
//   const filesToTransform = {}
//
//   const tasks = files.reduce((acc, file) => {
//     const normalizedFilepath = normalizeFilepath(file)
//     MULTIPLIERS.forEach(multiplier => {
//       const pngPath = file.replace(/\.svg$/, `@${multiplier}x.png`)
//       const destinationPath = output ? `${output}/${path.basename(pngPath)}` : pngPath
//
//       if (
//         prevManifest[normalizedFilepath] !== nextManifest[normalizedFilepath] ||
//         !fs.existsSync(destinationPath)
//       ) {
//         filesToTransform[file] = true
//         acc.push({
//           file,
//           multiplier,
//           destinationPath,
//           verbose,
//           rsvgBin,
//           optipngBin,
//         })
//       }
//     })
//     return acc
//   }, [])
//   if (verbose) console.log(gray(`tasks to process: ${tasks.length}`))
//
//   if (tasks.length) {
//     const async = require('async')
//     const { equals } = require('ramda')
//     const os = require('os')
//
//     const NUM_CORES = os.cpus().length
//
//     if (output && !fs.existsSync(output)) fs.mkdirSync(output)
//     console.log(
//       yellow(
//         `Transforming ${Object.keys(filesToTransform).length} of ${files.length} SVGs into ${
//           tasks.length
//         } PNG variations...`
//       )
//     )
//
//     async.eachLimit(tasks, NUM_CORES, transformSVGTask, err => {
//       if (err) {
//         throw err
//       }
//       if (!equals(prevManifest, nextManifest)) {
//         fs.writeFileSync(manifestPath, JSON.stringify(nextManifest, null, 2))
//       }
//       console.log(green('Done!'))
//     })
//   } else {
//     console.log(green('All good! No PNG needs to be updated.'))
//   }
// }
//
// function binaryExistenceGuard(name) {
//   try {
//     execSync(`command -v ${name}`)
//   } catch (e) {
//     console.error(`Binary ${name} not found!`)
//     process.exit(1)
//   }
// }
//
// const argv = process.argv.filter(arg => arg !== '--verbose')
//
// binaryExistenceGuard(rsvgBin)
// binaryExistenceGuard(optipngBin)
//
// transformSVG({
//   root: argv[2],
//   input: argv[3],
//   output: argv[4],
//   verbose: process.argv.includes('--verbose'),
//   rsvgBin,
//   optipngBin,
// })
