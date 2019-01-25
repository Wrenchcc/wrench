import { ForbiddenError } from 'apollo-server-express'
import { encodeCursor, decodeCursor } from '../../utils/paginate/cursor'

const MAX_LIMIT = 50
const INDEX_NAME = 'vehicles'
const ORDER_BY = 'year'

export default async ({ query, after, first = 10, last = 10 }, ctx) => {
  let from

  if (!query) {
    return new ForbiddenError('Please provide a search term.')
  }

  if (first > MAX_LIMIT) {
    return new ForbiddenError('Your limit is to big.')
  }

  if (after) {
    [from] = decodeCursor(after)
  }

  const { data } = await ctx.services.elasticsearch.search({
    body: {
      from,
      query: {
        match: {
          suggest: query,
        },
      },
      size: first,
      sort: ['_score'],
    },
    index: INDEX_NAME,
  })

  const edges = data.hits.hits.map(({ _id, _source }, index) => ({
    cursor: encodeCursor(index + 1, ORDER_BY),
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
      hasNextPage: totalCount > first,
      hasPreviousPage: totalCount > last,
    },
    totalCount,
  }
}
