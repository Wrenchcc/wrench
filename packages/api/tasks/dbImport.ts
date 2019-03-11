import * as fs from 'fs'
import { createConnection, getRepository } from 'typeorm'
import * as P from 'bluebird'
import Brand from '../src/models/Brand'
import Model from '../src/models/Model'
import { options } from '../src/models'

const debug = require('debug')('task:database:import')

const vehicles = JSON.parse(fs.readFileSync(`${__dirname}/vehicles.json`, 'utf8'))

const CONCURRENCY = 500

async function findOrCreateBrand(where, save) {
  const brandRepo = getRepository(Brand)
  const brand = await brandRepo.findOne({ where })

  if (brand) {
    return brand
  }

  return brandRepo.save(save)
}

async function findOrCreateModel(data) {
  const modelRepo = getRepository(Model)
  const model = await modelRepo.findOne({ where: data })

  if (model) {
    return null
  }

  debug('Adding model to database.')

  return modelRepo.save(data)
}

createConnection(options).then(async () => {
  debug('Loading brands into DB')

  await P.map(
    vehicles,
    async item => {
      const brand = await findOrCreateBrand(
        { name: item.brand },
        {
          name: item.brand,
        }
      )

      await findOrCreateModel({
        brandId: brand.id,
        name: item.model,
        year: item.year,
      })
    },
    { concurrency: CONCURRENCY }
  )

  debug('Done')
})
