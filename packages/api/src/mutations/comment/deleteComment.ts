import { ForbiddenError } from 'apollo-server-express'
import { isAuthenticated, canModerateComment, isAdmin } from '../../utils/permissions'

export default isAuthenticated(async (_, { id }, ctx) => {
  const comment = await ctx.db.Comment.findOne(id)

  if (!canModerateComment(comment, ctx.userId) && !isAdmin(ctx.userId)) {
    return new ForbiddenError('You don’t have permission to manage this comment.')
  }

  const cacheKey = `comment:commentsConnection:${id}:*`
  ctx.redis.delete(cacheKey)

  const cacheKey2 = `comment:comments:${comment.postId}:*`
  ctx.redis.delete(cacheKey2)

  const cacheKey3 = `comment:repliesConnection:${id}:*}`
  ctx.redis.delete(cacheKey3)

  const cacheKey4 = `comment:comment:${id}`
  ctx.redis.delete(cacheKey4)

  await Promise.resolve([
    ctx.db.Comment.delete(id),
    // NOTE: Delete replies
    ctx.db.Comment.delete({
      commentId: id,
    }),
  ])

  return true
})
