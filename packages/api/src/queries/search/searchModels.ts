// @ts-nocheck
import { ForbiddenError } from 'apollo-server-express'
import { getManager } from 'typeorm'
import { VehicleTypes } from '../../models/enums'
import convertNodesToEdges from '../../utils/paginate/convertNodesToEdges'
import convertPageInfo from '../../utils/paginate/convertPageInfo'
import { decodeCursor } from '../../utils/paginate/cursor'
import { ORDER_BY } from '../../utils/paginate/constants'

const MAX_LIMIT = 50

export default async (
  { query, after = 0, first = 10, last = 10, vehicleType = VehicleTypes.MOTORCYCLE },
  ctx
) => {
  if (first > MAX_LIMIT) {
    return new ForbiddenError('Your limit is to big.')
  }

  const formattedQuery = query.trim().replace(/ /g, ' & ')
  let queryBuilder = await await getManager()
    .getRepository(ctx.db.SearchModel)
    .createQueryBuilder('search')
    .where('search.type = :type', {
      type: vehicleType,
    })
    .andWhere(`to_tsvector('simple', search.query) @@ to_tsquery('simple', :query)`, {
      query: `${formattedQuery}:*`,
    })

  if (after) {
    const [id, columnValue] = decodeCursor(after)

    queryBuilder.andWhere('search.createdAt >= :createdAt AND search.id != :id', {
      createdAt: columnValue,
      id,
    })
  }

  const [totalCount, data] = await Promise.all([
    queryBuilder.getCount(),
    queryBuilder.take(first).getMany(),
  ])

  const nodes = data.map((model) => ({
    id: model.id,
    createdAt: model.createdAt,
    brand: {
      id: model.brandId,
      name: model.brand,
    },
    model: model.model,
    year: model.year,
  }))

  const edges = convertNodesToEdges(nodes, ORDER_BY)
  const pageInfo = convertPageInfo(totalCount, first, last)

  return {
    pageInfo,
    totalCount,
    edges,
  }
}
