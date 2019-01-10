import client from 'api/services/elasticsearch/client'

const debug = require('debug')('task:elasticsearch')

const INDEX_NAME = 'vehicles'
const INDEX_TYPE = 'vehicle'

async function bulkImport() {
  try {
    debug(`Importing to index: ${INDEX_NAME}.`)
    const data = {
      model: 'Motorrad',
      brand: 'Hildebrand-Wolfmüller',
      year: 1894,
    }

    await client.post(`${INDEX_NAME}/${INDEX_TYPE}/1`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    debug('Import done.')
  } catch (err) {
    debug(`Could not import to index: ${INDEX_NAME}.`)
    console.log(err.response.data)
  }
}

bulkImport()
