import paginate from '../../utils/paginate'
import { transformFileUrl } from '../../utils/transformFileUrl'

export default async ({ id }, args, ctx) => {
  // const cacheKey = `post:filesConnection:${id}:${JSON.stringify(args)}`
  // const cache = await ctx.redis.get(cacheKey)

  // if (cache) {
  //   return cache
  // }

  const files = await paginate(ctx.db.File, args, {
    where: {
      postId: id,
      ...(args.type && { type: args.type }),
    },
  })

  const edges = files.edges.map(({ cursor, node }) => ({
    cursor,
    node: {
      ...node,
      uri: transformFileUrl(node.filename),
    },
  }))

  const response = {
    ...files,
    edges,
  }

  // ctx.redis.set(cacheKey, response)

  return response
}
