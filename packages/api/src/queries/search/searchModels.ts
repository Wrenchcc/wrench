import { ForbiddenError } from 'apollo-server-express'

const MAX_LIMIT = 50
const INDEX_NAME = 'vehicles'

export default async ({ query, after = 0, first = 10, last = 10 }, ctx) => {
  if (!query) {
    return new ForbiddenError('Please provide a search term.')
  }

  if (first > MAX_LIMIT) {
    return new ForbiddenError('Your limit is to big.')
  }

  const { data } = await ctx.services.elasticsearch.search({
    body: {
      from: after,
      query: {
        match: {
          suggestion: query,
        },
      },
      size: first,
    },
    index: INDEX_NAME,
  })

  const edges = data.hits.hits.map(({ _id, _source }) => ({
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
