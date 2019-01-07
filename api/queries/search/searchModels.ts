import { Raw, Like, getRepository } from 'typeorm'
import paginate from 'api/utils/paginate'
import Brand from 'api/models/Brand'

// TODO: brand (name and year), sort by year
// TODO: Max words to 3
// https://github.com/typeorm/typeorm/issues/1322
// https://github.com/typeorm/typeorm/issues/3119
export default async (args, ctx) => {
  const query = args.query.toLowerCase()
  const words = query.split(' ')

  const base = getRepository(Brand)
    .createQueryBuilder('brand')
    .select('*')
    .innerJoin('brand.models', 'models')

  // userIds.forEach((userId, idx) => qb.orWhere('"userId" = :u'+idx, { ['u'+idx]: userId}));

  words.forEach(word => {
    const year = parseInt(word, 10)
    if (Number.isInteger(year)) {
      base.orWhere('models.year = :year', { year })
    } else {
      base
        .orWhere('brand.name LIKE :word', { word: `%${word}%` })
        .orWhere('models.model LIKE :word', { word: `%${word}%` })
    }
  })

  console.log(await base.getRawMany())
}
