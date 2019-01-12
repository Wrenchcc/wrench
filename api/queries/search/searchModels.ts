import { ForbiddenError } from 'apollo-server-express'
import { Raw, Like, Brackets, getRepository } from 'typeorm'
import { encodeCursor } from 'api/utils/paginate'
import Brand from 'api/models/Brand'
import Model from 'api/models/Model'

const MAX_LIMIT = 50
const ORDER_BY = 'year'

export default async ({ query, after, before, first = 10, last = 10 }, ctx) => {
  if (!query) {
    return new ForbiddenError('Please provide a search term.')
  }

  if (first > MAX_LIMIT) {
    return new ForbiddenError('Your limit is to big.')
  }

  const { data } = await ctx.services.elasticsearch.search(query)

  const edges = data.hits.hits.map(({ _id, _source }) => ({
    cursor: encodeCursor(_id, ORDER_BY),
    node: {
      brand: {
        id: _source.brandId,
        name: _source.brand,
      },
      id: _id,
      model: _source.model,
      year: _source.year,
    },
  }))

  const totalCount = data.hits.total

  return {
    edges,
    pageInfo: {
      hasNextPage: first < totalCount,
      hasPreviousPage: last < totalCount,
    },
    totalCount,
  }
}
