import * as fs from 'fs'
import { Raw, Like, Brackets, getRepository } from 'typeorm'
import Brand from 'api/models/Brand'

const vehicles = JSON.parse(fs.readFileSync(`${__dirname}/vehicles.json`, 'utf8'))

export async function seedBrandsData() {
  console.log('----Loading brands into DB----')
  const brands = [...new Set(vehicles.map(item => item.brand))]

  const formatedBrands = brands.map(async brand => {
    await getRepository(Brand).save({ name: brand.toString().trim() })
  })

  console.log('----Done----')
}
