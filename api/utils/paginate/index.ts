import { ForbiddenError } from 'apollo-server-express'
import { encodeCursor, decodeCursor } from './cursor'
import convertNodesToEdges from './convertNodesToEdges'
import convertPageInfo from './convertPageInfo'
import findOperators from './findOperators'
import { ORDER_BY, MAX_LIMIT } from './constants'

export default async (
  model,
  { after, before, first = 10, last = 10 },
  options = null,
  orderBy = ORDER_BY
) => {
  if (first > MAX_LIMIT) {
    return new ForbiddenError('Your limit is to big.')
  }

  const findOptions = {
    ...options,
    order: {
      [orderBy.column]: orderBy.sort,
    },
    take: first,
  }

  if (after || before) {
    findOptions.where = {
      ...findOperators({ after, before }, orderBy),
    }
  }

  const [nodes, totalCount] = await model.findAndCount(findOptions)
  const edges = convertNodesToEdges(nodes, orderBy)
  const pageInfo = convertPageInfo(totalCount, first, last)

  return {
    edges,
    pageInfo,
    totalCount,
  }
}
