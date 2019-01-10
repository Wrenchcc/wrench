import client from '../services/elasticsearch/client'

const INDEX_NAME = 'vehicles'

export async function deleteIndex() {
  try {
    await client.delete(INDEX_NAME)
  } catch (err) {
    console.log(err)
  }
}

deleteIndex()
