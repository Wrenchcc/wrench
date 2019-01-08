import { ForbiddenError } from 'apollo-server-express'
import { Raw, Like, Brackets, getRepository } from 'typeorm'
import { convertNodesToEdges, mapOperatorsRaw } from 'api/utils/paginate'
import Brand from 'api/models/Brand'

const ORDER_BY = {
  column: 'year',
  sort: 'DESC',
}

export default async ({ query, after, before, first = 10, last = 10 }, ctx) => {
  if (!query) {
    return new ForbiddenError('Please provide a search term.')
  }

  if (first > 50) {
    return new ForbiddenError('Your limit is to big.')
  }

  const words = query
    .trim()
    .replace(/\s\s+/g, ' ')
    .toLowerCase()
    .split(' ')

  if (words.length > 5) {
    return new ForbiddenError('Invalid search term.')
  }

  const qb = getRepository(Brand)
    .createQueryBuilder('brand')
    .select('*')
    // .addSelect('COUNT(DISTINCT("models"."id"))', 'totalCount')
    .innerJoin('brand.models', 'models')
    .where(
      new Brackets(q => {
        words.forEach((word, i) => {
          const year = parseInt(word, 10)
          if (Number.isInteger(year)) {
            q.orWhere('models.year = :year', { year })
          } else {
            q.orWhere(`LOWER(brand.name) LIKE :word${i}`, { [`word${i}`]: `%${word}%` }).orWhere(
              `LOWER(models.model) LIKE :word${i}`,
              { [`word${i}`]: `%${word}%` }
            )
          }
        })
      })
    )

  const totalCount = 10 // TODO: Get totalCount of current querry

  if (after || before) {
    const comparator = mapOperatorsRaw({ after, before }, { column: 'models.year', sort: 'DESC' })
    qb.andWhere(comparator)
  }

  qb
    // .groupBy('brand.id')
    // .addGroupBy('models.id')
    .orderBy('models.year', 'DESC')
    .limit(first)

  const nodes = await qb.getRawMany()
  console.log(nodes)
  const edges = convertNodesToEdges(nodes, ORDER_BY)

  return {
    edges,
    pageInfo: {
      hasNextPage: totalCount > first,
      hasPreviousPage: totalCount > last,
    },
  }
}
