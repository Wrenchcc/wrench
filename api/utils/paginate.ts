import { ForbiddenError } from 'apollo-server-express'
import { encode, decode } from 'base-64'
import { LessThan, MoreThan, Between } from 'typeorm'

const MAX_LIMIT = 50
const SEPARATION_TOKEN = '___'

const ORDER_BY = {
  column: 'createdAt',
  sort: 'DESC',
}

const encodeCursor = (id, columnValue) => encode(`${id}${SEPARATION_TOKEN}${columnValue}`)

const decodeCursor = cursor => {
  const data = decode(cursor).split(SEPARATION_TOKEN)

  if (data[0] === undefined || data[1] === undefined) {
    throw new Error(`Could not find edge with cursor ${cursor}`)
  }
  return data
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

export const convertNodesToEdges = (nodes, { column }) => nodes.map(node => ({
  cursor: encodeCursor(node.id, node[column]),
  node,
}))

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

  return {
    edges,
    pageInfo: {
      hasNextPage: totalCount > first,
      hasPreviousPage: totalCount > last,
    },
    totalCount,
  }
}
