import paginate from '../../utils/paginate'
import { transformFileUrl, transformPosterUrl } from '../../utils/transformFileUrl'
import { NOTIFICATION_TYPES } from '../../utils/enums'

export default async ({ post, comment, type }, args, ctx) => {
  const postId = (post && post.id) || (comment && comment.postId)

  if (!postId || type === NOTIFICATION_TYPES.NEW_COMMENT_LIKE) {
    return null
  }

  const cacheKey = `notification:filesConnection:v2:${postId}:${JSON.stringify(args)}`
  const cache = await ctx.redis.get(cacheKey)

  if (cache) {
    return cache
  }

  const files = await paginate(ctx.db.File, args, {
    where: {
      postId,
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
