import * as fs from 'fs'
import { createConnection, getRepository } from 'typeorm'
import * as P from 'bluebird'
import Brand from '../src/models/Brand'
import Model from '../src/models/Model'
import { options } from '../src/models'

const debug = require('debug')('task:database:import')

const vehicles = JSON.parse(fs.readFileSync(`${__dirname}/vehicles.json`, 'utf8'))

const CONCURRENCY = 100

async function findOrCreate(where, save) {
  const brandRepo = getRepository(Brand)
  const brand = await brandRepo.findOne({ where })

  if (brand) {
    return brand
  }

  return brandRepo.save(save)
}

createConnection(options).then(async () => {
  debug('Loading brands into DB')

  await P.map(
    vehicles,
    async item => {
      const brand = await findOrCreate(
        { name: item.brand },
        {
          name: item.brand,
        }
      )

      await getRepository(Model).save({
        brandId: brand.id,
        name: item.model,
        year: item.year,
      })
    },
    { concurrency: CONCURRENCY }
  )

  debug('Done')
})
