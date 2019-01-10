import { createConnection, getRepository } from 'typeorm'
import client from 'api/services/elasticsearch/client'
import Model from 'api/models/Model'
import { options } from 'api/models'

const debug = require('debug')('task:elasticsearch')

const INDEX_NAME = 'vehicles'
const INDEX_TYPE = 'vehicle'

createConnection(options).then(async connection => {
  const models = await getRepository(Model).find()
  //   id: '844d9a2b-cbae-4d53-83c6-1f5359da0262',
  //   createdAt: 2019-01-10T18:38:34.561Z,
  //   updatedAt: 2019-01-10T18:38:34.561Z,
  //   name: 'CRF150R',
  //   year: 2019,
  //   brandId: 'e2525beb-3252-4411-85dd-03bc2cbf1ac2'

  try {
    debug(`Importing to index: ${INDEX_NAME}.`)
    // const data = {
    //   brand: 'BMW',
    //   model: 'R 100',
    //   year: 1981,
    // }
    //
    // await client.post(`${INDEX_NAME}/${INDEX_TYPE}/1`, data, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })

    debug('Import done.')
  } catch (err) {
    debug('Could not import to index. %s', err.response.data.error.reason)
  }
})
