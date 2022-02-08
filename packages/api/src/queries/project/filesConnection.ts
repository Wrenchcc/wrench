import paginate from '../../utils/paginate'
import { transformFileUrl, transformPosterUrl } from '../../utils/transformFileUrl'

// TODO: Use dataloader
export default async ({ id }, args, ctx) => {
  const cacheKey = `project:filesConnection:${id}:${JSON.stringify(args)}`
  const cache = await ctx.redis.get(cacheKey)

  if (cache) {
    return cache
  }

  const files = await paginate(ctx.db.File, args, {
    where: {
      projectId: id,
      type: args.type,
    },
  })

  const edges = files.edges.map(({ cursor, node }) => ({
    cursor,
    node: {
      ...node,
      uri: transformFileUrl(node),
      poster: node.poster ? transformPosterUrl(node) : null,
    },
  }))

  const response = {
    ...files,
    edges,
  }

  ctx.redis.set(cacheKey, response)

  return response
}
