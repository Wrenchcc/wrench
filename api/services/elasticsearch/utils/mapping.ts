import client from '../client'

const INDEX_NAME = 'vehicles'
const DOCUMENT_TYPE = 'vehicle'

export async function putVehiclesMapping() {
  const schema = {
    brand: { type: 'string' },
    model: { type: 'string' },
    year: { type: 'integer' },
  }

  return client.indices.putMapping({
    body: { properties: schema },
    index: INDEX_NAME,
    type: DOCUMENT_TYPE,
  })
}

export async function insertVehicleData() {}
