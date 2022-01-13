import { createConnection, getRepository } from 'typeorm'
import Brand from '../src/models/Brand'
import Model from '../src/models/Model'
import SearchModel from '../src/models/SearchModel'
import { options } from '../src/models'

const debug = require('debug')('task:database:importindex')

createConnection(options).then(async () => {
  debug('Import index')

  const modelRepo = getRepository(Model)
  const brandRepo = getRepository(Brand)
  const searchRepo = getRepository(SearchModel)

  const model = await modelRepo.find()

  // NOTE: Clear search index
  await searchRepo.clear()

  model.map(async (model) => {
    const brand = await brandRepo.findOne(model.brandId)
    const query = `${brand.name} ${model.name.replace(' ', '')} ${model.year}`.toLowerCase()

    searchRepo.save({
      query,
      brand: brand.name,
      brandId: brand.id,
      type: model.type,
      modelId: model.id,
      model: model.name,
      year: model.year,
    })
  })

  debug('Done')
  return
})
