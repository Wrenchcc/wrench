import client from '../services/elasticsearch/client'

const debug = require('debug')('task:elasticsearch')

const INDEX_NAME = 'vehicles'

async function bulkImport() {
  try {
    debug(`Importing to index: ${INDEX_NAME}.`)

    // await client.post(`${INDEX_NAME}/_bulk`, {
    //   model: 'Motorrad',
    //   link: 'https://bikez.com/motorcycles/hildebrand-wolfmuller_motorrad_1894.php',
    //   brand: 'Hildebrand-Wolfmüller',
    //   year: 1894,
    // })

    debug('Import done.')
  } catch {
    debug(`Could not import to index: ${INDEX_NAME}.`)
  }
}

bulkImport()
