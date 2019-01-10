import { createConnection, getRepository } from 'typeorm'
import * as Promise from 'bluebird'
import client from 'api/services/elasticsearch/client'
import Model from 'api/models/Model'
import { options } from 'api/models'

const debug = require('debug')('task:elasticsearch')

const INDEX_NAME = 'vehicles'
const INDEX_TYPE = 'vehicle'

createConnection(options).then(async connection => {
  try {
    debug(`Importing to index: ${INDEX_NAME}.`)

    const models = await getRepository(Model).find({ relations: ['brand'], take: 1000 })

    await Promise.map(
      models,
      async model => {
        const data = {
          brand: model.brand.name,
          createdAt: model.createdAt,
          model: model.name,
          updatedAt: model.updatedAt,
          year: model.year,
        }

        await client.post(`${INDEX_NAME}/${INDEX_TYPE}/${model.id}`, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
      },
      { concurrency: 5 }
    )

    debug('Import done.')
  } catch (err) {
    debug('Could not import to index. %s', err.response.data.error.reason)
  }
})
