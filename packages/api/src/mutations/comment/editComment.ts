import { ForbiddenError } from 'apollo-server-express'
import { isAuthenticated, canModerateComment, isAdmin } from '../../utils/permissions'

export default isAuthenticated(async (_, { id, input }, ctx) => {
  const comment = await ctx.db.Comment.findOne(id)

  if (!canModerateComment(comment, ctx.userId) && !isAdmin(ctx.userId)) {
    return new ForbiddenError('You don’t have permission to manage this comment.')
  }

  // const cacheKey = `comment:commentsConnection:${comment.postId}:*`
  // const cacheKey2 = `comment:comments:${comment.postId}:*`
  // const cacheKey3 = `comment:repliesConnection:${id}:*`
  // const cacheKey4 = `comment:comment:${id}`

  // await Promise.all([
  //   ctx.redis.delete(cacheKey),
  //   ctx.redis.delete(cacheKey2),
  //   ctx.redis.delete(cacheKey3),
  //   ctx.redis.delete(cacheKey4),
  // ])
  ctx.db.CommentTranslation.delete({ commentId: id })

  return ctx.db.Comment.save({
    ...comment,
    ...input,
  })
})
