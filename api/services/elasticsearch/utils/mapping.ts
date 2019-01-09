import client from '../client'

const INDEX_NAME = 'vehicles'
const DOCUMENT_TYPE = 'vehicle'

export async function putVehiclesMapping() {
  const schema = {
    brand: { type: 'string' },
    model: { type: 'string' },
    year: { type: 'integer' },
  }

  // return client.indices.putMapping({
  //   body: { properties: schema },
  //   index: INDEX_NAME,
  //   type: DOCUMENT_TYPE,
  // })
}

export async function insertVehicleData() {}

export async function resetIndex() {
  // if (await client.indices.exists({ index: INDEX_NAME })) {
  //   await client.indices.delete({ index: INDEX_NAME })
  // }
  //
  // await client.indices.create({ index: INDEX_NAME })
}
