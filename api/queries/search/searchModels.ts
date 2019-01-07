import { Raw, Like, getRepository } from 'typeorm'
import paginate from 'api/utils/paginate'
import Brand from 'api/models/Brand'

// TODO: brand (name and year), sort by year
export default async (args, ctx) => {
  const query = args.query.toLowerCase()
  const words = query.split(' ')

  let base = getRepository(Brand)
    .createQueryBuilder('brand')
    .select('*')
    .innerJoin('brand.models', 'models')

  words.forEach(word => {
    const year = parseInt(word, 10)
    if (Number.isInteger(year)) {
      base = base.orWhere('models.year = :year', { year })
    } else {
      base = base
        .orWhere('brand.name LIKE :word', { word: `%${word}%` })
        .orWhere(`models.model LIKE :word`, { word: `%${word}%` }) // eslint-disable-line
    }
  })

  console.log(await base.getRawMany())
}
