import { createConnection, getRepository } from 'typeorm'
import * as elasticsearch from '../src/services/elasticsearch'
import Model from '../src/models/Model'
import { options } from '../src/models'

const debug = require('debug')('task:elasticsearch')

const BATCH_SIZE = 500
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

    const documents = models.map(model => ({
      index: {
        _type: DOCUMENT_TYPE,
        _id: model.id,
        _index: INDEX_NAME,
      },
      brand: model.brand.name,
      brandId: model.brand.id,
      createdAt: model.createdAt,
      model: model.name,
      updatedAt: model.updatedAt,
      year: model.year,
    }))

    await elasticsearch.bulk({
      documents,
    })

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
