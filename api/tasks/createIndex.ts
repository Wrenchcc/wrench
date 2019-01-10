import client from '../services/elasticsearch/client'

const INDEX_NAME = 'vehicles'

export async function createIndex() {
  try {
    await client.put(INDEX_NAME, {
      mappings: {
        _doc: {
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
  } catch (err) {
    console.log(err)
  }
}

createIndex()
