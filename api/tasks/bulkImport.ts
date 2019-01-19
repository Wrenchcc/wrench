import { createConnection, getRepository } from 'typeorm'
import * as Promise from 'bluebird'
import client from 'api/services/elasticsearch/client'
import Model from 'api/models/Model'
import { options } from 'api/models'

const debug = require('debug')('task:elasticsearch')

const BATCH_SIZE = 500
const CONCURRENCY = 8
const INDEX_NAME = 'vehicles'
const DOCUMENT_TYPE = 'vehicle'

createConnection(options).then(async connection => {
  async function batch(skip = 0) {
    const models = await getRepository(Model).find({
      relations: ['brand'],
      skip,
      take: BATCH_SIZE,
    })

    if (!models.length) {
      return null
    }

    try {
      await Promise.map(
        models,
        async model => {
          const data = {
            brand: model.brand.name,
            brandId: model.brand.id,
            createdAt: model.createdAt,
            model: model.name,
            updatedAt: model.updatedAt,
            year: model.year,
          }

          await client.post(`${INDEX_NAME}/${DOCUMENT_TYPE}/${model.id}`, data, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
        },
        { concurrency: CONCURRENCY }
      )
    } catch (err) {
      console.log(err)
    }

    batch(skip + BATCH_SIZE)
  }

  try {
    debug(`Importing to index: ${INDEX_NAME}.`)
    await batch()
    debug('Import done.')
  } catch (err) {
    debug('Could not import to index. %s', err.response.data.error.reason)
  }
})
