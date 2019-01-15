import { ForbiddenError } from 'apollo-server-express'
import { LessThan, MoreThan, Between } from 'typeorm'
import { encodeCursor, decodeCursor } from './cursor'
import convertNodesToEdges from './convertNodesToEdges'
import convertPageInfo from './convertPageInfo'

const MAX_LIMIT = 50

const ORDER_BY = {
  column: 'createdAt',
  sort: 'DESC',
}

export const mapOperatorsRaw = ({ after, before }, { column, sort }) => {
  if (after) {
    const [id, columnValue] = decodeCursor(after)
    return sort === ORDER_BY.sort ? `(${column} < ${columnValue})` : `(${column} > ${columnValue})`
  }

  if (before) {
    const [id, columnValue] = decodeCursor(before)
    return sort === ORDER_BY.sort ? `(${column} > ${columnValue})` : `(${column} < ${columnValue})`
  }
}

const mapOperators = ({ after, before }, { column, sort }) => {
  let comparator

  if (after) {
    const [id, columnValue] = decodeCursor(after)
    comparator = sort === ORDER_BY.sort ? LessThan(columnValue) : MoreThan(columnValue)
  }

  if (before) {
    const [id, columnValue] = decodeCursor(before)
    comparator = sort === ORDER_BY.sort ? MoreThan(columnValue) : LessThan(columnValue)
  }

  return { [column]: comparator }
}

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
      ...mapOperators({ after, before }, orderBy),
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
