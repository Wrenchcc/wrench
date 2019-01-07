import { ForbiddenError } from 'apollo-server-express'
import { Raw, Like, getRepository } from 'typeorm'
import paginate from 'api/utils/paginate'
import Brand from 'api/models/Brand'

export default async (args, ctx) => {
  if (!args.query) {
    return new ForbiddenError('Please provide a search term.')
  }

  const words = args.query
    .trim()
    .toLowerCase()
    .split(' ')

  if (words.length > 5) {
    return new ForbiddenError('Invalid search term.')
  }

  const base = getRepository(Brand)
    .createQueryBuilder('brand')
    .select('*')
    .innerJoin('brand.models', 'models')

  words.forEach((word, i) => {
    const year = parseInt(word, 10)
    if (Number.isInteger(year)) {
      base.orWhere('models.year = :year', { year })
    } else {
      base
        .orWhere(`LOWER(brand.name) LIKE :word${i}`, { [`word${i}`]: `%${word}%` })
        .orWhere(`LOWER(models.model) LIKE :word${i}`, { [`word${i}`]: `%${word}%` })
    }
  })

  base.orderBy('models.year', 'DESC')

  const edges = await base.getRawMany()

  return {
    edges: edges.map(node => ({ node })),
  }
}
