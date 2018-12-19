import { encode, decode } from 'base-64'
import { LessThan, MoreThan, Between } from 'typeorm'

const SEPARATION_TOKEN = '___'

const ORDER_BY = {
  column: 'id',
  sort: 'desc',
}

const encodeCursor = (id, columnValue) => encode(`${id}${SEPARATION_TOKEN}${columnValue}`)

const decodeCursor = cursor => {
  const data = decode(cursor).split(SEPARATION_TOKEN)

  if (data[0] === undefined || data[1] === undefined) {
    throw new Error(`Could not find edge with cursor ${cursor}`)
  }
  return data
}

const mapOperators = ({ after, before }, { column, sort }) => {
  let comparator

  if (after && before) {
    const [id1, afterColumnValue] = decodeCursor(after)
    const [id2, beforeColumnValue] = decodeCursor(before)
    comparator = Between(afterColumnValue, beforeColumnValue)
  }

  if (after) {
    const [id, columnValue] = decodeCursor(after)
    comparator = sort === ORDER_BY.sort ? MoreThan(columnValue) : LessThan(columnValue)
  }

  if (before) {
    const [id, columnValue] = decodeCursor(before)
    comparator = sort === ORDER_BY.sort ? LessThan(columnValue) : MoreThan(columnValue)
  }

  return { [column]: comparator }
}

const convertNodesToEdges = (nodes, { column }) => nodes.map(node => ({
  cursor: encodeCursor(node.id, node[column]),
  node,
}))

export default async (
  model,
  { after, before, first = 10, last },
  options = null,
  orderBy = ORDER_BY
) => {
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
