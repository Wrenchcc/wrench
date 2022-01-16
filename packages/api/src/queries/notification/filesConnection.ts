import paginate from '../../utils/paginate'
import { transformFileUrl } from '../../utils/transformFileUrl'
import { NOTIFICATION_TYPES } from '../../utils/enums'

export default async ({ post, comment, type }, args, ctx) => {
  const postId = (post && post.id) || (comment && comment.postId)

  if (!postId || type === NOTIFICATION_TYPES.NEW_COMMENT_LIKE) {
    return null
  }

  const cacheKey = `notification:filesConnection${postId}:${JSON.stringify(args)}`
  const cache = await ctx.redis.get(cacheKey)

  if (cache) {
    return cache
  }

  const files = await paginate(ctx.db.File, args, {
    where: {
      postId,
      type: args.type,
    },
  })

  const edges = files.edges.map(({ cursor, node }) => ({
    cursor,
    node: {
      ...node,
      uri: transformFileUrl(node),
    },
  }))

  const response = {
    ...files,
    edges,
  }

  ctx.redis.set(cacheKey, response)

  return response
}
