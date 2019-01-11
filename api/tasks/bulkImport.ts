import { createConnection, getRepository } from 'typeorm'
import * as Promise from 'bluebird'
import client from 'api/services/elasticsearch/client'
import Model from 'api/models/Model'
import { options } from 'api/models'

const debug = require('debug')('task:elasticsearch')

const BATCH_SIZE = 500
const INDEX_NAME = 'vehicles'
const INDEX_TYPE = 'vehicle'

createConnection(options).then(async connection => {
  try {
    debug(`Importing to index: ${INDEX_NAME}.`)

    const [models, totalCount] = await getRepository(Model).findAndCount({
      relations: ['brand'],
      take: BATCH_SIZE,
    })

    await Promise.map(
      models,
      async model => {
        const data = {
          brand: model.brand.name,
          model: model.name,
          year: model.year,
        }

        await client.post(`${INDEX_NAME}/${INDEX_TYPE}/${model.id}`, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
      },
      { concurrency: 1 }
    )

    debug('Import done.')
  } catch (err) {
    debug('Could not import to index. %s', err.response.data.error.reason)
  }
})
