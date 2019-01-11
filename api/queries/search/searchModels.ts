import { ForbiddenError } from 'apollo-server-express'
import { Raw, Like, Brackets, getRepository } from 'typeorm'
import { convertNodesToEdges, mapOperatorsRaw } from 'api/utils/paginate'
import Brand from 'api/models/Brand'
import Model from 'api/models/Model'

const MAX_LIMIT = 50

export default async ({ query, after, before, first = 10, last = 10 }, ctx) => {
  if (!query) {
    return new ForbiddenError('Please provide a search term.')
  }

  if (first > MAX_LIMIT) {
    return new ForbiddenError('Your limit is to big.')
  }

  const result = await ctx.services.elasticsearch.search(query)

  const edges = result.data.hits.hits.map(({ _id, _source }) => ({
    cursor: '123',
    node: {
      id: _id,
      brand: {
        name: _source.brand,
        id: '123',
      },
      model: _source.model,
      year: _source.year,
    },
  }))

  const totalCount = result.data.hits.total

  return {
    totalCount,
    pageInfo: {
      hasNextPage: first < totalCount,
      hasPreviousPage: last < totalCount,
    },
    edges,
  }
}
