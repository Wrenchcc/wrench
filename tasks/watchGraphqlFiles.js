#!/usr/bin/env node
const sane = require('sane')
const rimraf = require('rimraf')

// https://github.com/kentcdodds/babel-plugin-preval/issues/19
// ~/.babel.json
const CACHE_PATH = './node_modules/.cache/babel-loader/*'

const dir = './src'
const opts = {
  glob: '**/*.graphql',
}

const logAndResetCache = logFn => path => {
  try {
    console.log(logFn(path))
    if (path) {
      rimraf.sync(CACHE_PATH)
      console.log(`✅  Done reset cache for ${path}`)
    }
  } catch (err) {
    console.log(err)
    console.log(`❌ Failed updating ${path}`)
    process.exit(1)
  }
}

const watcher = sane(dir, opts)

watcher.on('ready', logAndResetCache(() => '👁️ 📂  Watching for changes in .graphql files'))

watcher.on('change', logAndResetCache(path => `🚧 + Updating change in file ${path}`))

watcher.on('add', logAndResetCache(path => `🚧 + Updating because of new file ${path}`))

watcher.on('delete', logAndResetCache(path => `🚧 - Updating because of removed file ${path}`))
