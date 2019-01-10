import * as fs from 'fs'
import { Raw, Like, Brackets, getRepository } from 'typeorm'
import Brand from 'api/models/Brand'
import Model from 'api/models/Model'
import * as Promise from 'bluebird'

const vehicles = JSON.parse(fs.readFileSync(`${__dirname}/vehicles.json`, 'utf8'))

async function findOrCreate(where, save) {
  const brandRepo = getRepository(Brand)
  const brand = await brandRepo.findOne({ where })

  if (brand) {
    return brand
  }

  return brandRepo.save(save)
}

export async function seedBrandsData() {
  console.log('----Loading brands into DB----')

  await Promise.map(
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
    { concurrency: 1 }
  )

  console.log('----Done----')
}

seedBrandsData()
