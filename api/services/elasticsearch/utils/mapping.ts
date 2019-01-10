import client from '../client'

const INDEX_NAME = 'vehicles'

export async function createIndex() {
  await client.delete(INDEX_NAME)

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
}
