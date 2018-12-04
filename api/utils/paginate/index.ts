import { path } from 'ramda'
import { encode, decode } from 'api/utils/base64'
import { LessThan, MoreThan, Between } from 'typeorm'

const SEPARATION_TOKEN = '___'

const ORDER_BY = {
  column: 'id',
  sort: 'asc',
}

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
    const [afterColumnValue] = decodeCursor(after)
    const [beforeColumnValue] = decodeCursor(before)
    comparator = Between(afterColumnValue, beforeColumnValue)
  }

  if (after) {
    const [columnValue] = decodeCursor(after)
    comparator = sort === ORDER_BY.sort ? MoreThan(columnValue) : LessThan(columnValue)
  }

  if (before) {
    const [columnValue] = decodeCursor(before)
    comparator = sort === ORDER_BY.sort ? LessThan(columnValue) : MoreThan(columnValue)
  }

  return { [column]: comparator }
}

const encodeCursor = (id, column) => encode(`${id}${SEPARATION_TOKEN}${column}`)

const convertNodesToEdges = (nodes, { column }, pick) => nodes.map(node => ({
  cursor: encodeCursor(node.id, node[column]),
  node: pick ? node[pick] : node,
}))

export default async (
  model,
  { after, before, first, last },
  options = null,
  pick = null,
  orderBy = ORDER_BY
) => {
  const findOptions = {
    ...options,
    take: first,
  }

  if (after || before) {
    findOptions.where = {
      ...mapOperators({ after, before }, orderBy),
    }
  }

  const [nodes, totalCount] = await model.findAndCount(findOptions)
  const edges = convertNodesToEdges(nodes, orderBy, pick)

  return {
    edges,
    pageInfo: {
      hasNextPage: totalCount > first,
      hasPreviousPage: totalCount > last,
    },
    totalCount,
  }
}
