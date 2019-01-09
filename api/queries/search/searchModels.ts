import { ForbiddenError } from 'apollo-server-express'
import { Raw, Like, Brackets, getRepository } from 'typeorm'
import { convertNodesToEdges, mapOperatorsRaw } from 'api/utils/paginate'
import Brand from 'api/models/Brand'
import Model from 'api/models/Model'

const ORDER_BY = {
  column: 'year',
  sort: 'DESC',
}

const MAX_LIMIT = 50

export default async ({ query, after, before, first = 10, last = 10 }, ctx) => {
  if (!query) {
    return new ForbiddenError('Please provide a search term.')
  }

  if (first > MAX_LIMIT) {
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

  const brands = await getRepository(Brand)
    .createQueryBuilder('brand')
    .select('*')
    .where(
      new Brackets(q => {
        words.forEach((word, i) => {
          q.orWhere(`LOWER(brand.name) LIKE :word${i}`, { [`word${i}`]: `%${word}%` })
        })
      })
    )
    .getRawMany()

  const restWords = words.filter(
    word => !brands.find(brand => brand.name.toLowerCase().indexOf(word) > -1)
  )

  const models = await getRepository(Model)
    .createQueryBuilder('model')
    .select('*')
    .where(
      new Brackets(q => {
        restWords.forEach((word, i) => {
          const year = parseInt(word, 10)
          if (Number.isInteger(year)) {
            q.andWhere('model.year = :year', { year })
          } else {
            q.andWhere(`LOWER(model.name) LIKE :word${i}`, { [`word${i}`]: `%${word}%` })
          }
        })
      })
    )

  if (after || before) {
    const comparator = mapOperatorsRaw({ after, before }, { column: 'model.year', sort: 'DESC' })
    models.andWhere(comparator)
  }

  models.orderBy('model.year', 'DESC').limit(first)

  const [totalCount, nodes] = await Promise.all([models.getCount(), await models.getRawMany()])

  const transformedNodes = nodes.map(node => ({
    ...node,
    brand: {
      id: node.brandId,
      name: null,
    },
  }))

  const edges = convertNodesToEdges(transformedNodes, ORDER_BY)

  return {
    totalCount,
    edges,
    pageInfo: {
      hasNextPage: first < totalCount,
      hasPreviousPage: last < totalCount,
    },
  }
}
