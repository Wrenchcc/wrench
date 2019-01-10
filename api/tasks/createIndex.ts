import client from 'api/services/elasticsearch/client'

const debug = require('debug')('task:elasticsearch')

const INDEX_NAME = 'vehicles'
const INDEX_TYPE = 'vehicle'

async function createIndex() {
  try {
    debug(`Creating index: ${INDEX_NAME}.`)

    await client.put(INDEX_NAME, {
      mappings: {
        [INDEX_TYPE]: {
          properties: {
            brand: { type: 'keyword' },
            model: { type: 'keyword' },
            year: { type: 'integer' },
          },
        },
      },
      settings: {
        number_of_replicas: 1,
        number_of_shards: 1,
      },
    })

    debug('Index created.')
  } catch {
    debug(`Could not create index: ${INDEX_NAME}.`)
  }
}

createIndex()
