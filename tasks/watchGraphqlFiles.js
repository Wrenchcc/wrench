#!/usr/bin/env node
const glob = require('glob')
const ejs = require('ejs')
const fs = require('fs')
const sane = require('sane')

const template = ejs.compile(
  fs.readFileSync('./src/translations/developmentEnglish.native.ejs', 'utf-8')
)

const targetFile = './src/translations/developmentEnglish.native.js'
const dir = './src'
const opts = {
  glob: '**/translations.json',
}

const logAndUpdateIndex = logFn => path => {
  try {
    console.log(logFn(path))
    const files = glob.sync(opts.glob, { cwd: dir })
    const output = template({ files })
    fs.writeFileSync(`${targetFile}`, output)
    console.log(`✅  Done updating ${targetFile}`)
  } catch (e) {
    console.log(`❌ Failed updating ${targetFile}`)
    console.log(e)
    process.exit(1)
  }
}

if (process.argv.find(arg => arg === '--watch')) {
  const watcher = sane(dir, opts)

  watcher.on('ready', logAndUpdateIndex(() => `👁️ 📂  Watching: ${dir}/${opts.glob}`))

  watcher.on(
    'add',
    logAndUpdateIndex(path => `🚧 + Updating ${targetFile} because of new file ${path}`)
  )

  watcher.on(
    'delete',
    logAndUpdateIndex(path => `🚧 - Updating ${targetFile} because of removed file ${path}`)
  )
} else {
  logAndUpdateIndex(() => `🚧 + Updating ${targetFile}`)()
}
