import { isAuthenticated } from '../../utils/permissions'
import { NOTIFICATION_TYPES, LIKE_TYPES } from '../../utils/enums'

export default isAuthenticated(async (_, { id }, ctx) => {
  const [isLiked, comment] = await Promise.all([
    ctx.db.Like.isLiked(ctx.userId, id),
    ctx.db.Comment.findOne(id),
  ])

  const cacheKey = `comment:commentsConnection:${comment.postId}:*`
  const cacheKey2 = `comment:comments:${comment.postId}:*`
  const cacheKey3 = `comment:likes:${id}:${ctx.userId}`
  const cacheKey4 = `comment:comment:${id}`

  await Promise.all([
    ctx.redis.delete(cacheKey),
    ctx.redis.delete(cacheKey2),
    ctx.redis.delete(cacheKey3),
    ctx.redis.delete(cacheKey4),
  ])

  if (isLiked) {
    await ctx.db.Like.delete({ typeId: id, userId: ctx.userId })
  } else {
    // NOTE: If comment owner just add the like
    if (comment.userId === ctx.userId) {
      await ctx.db.Like.save({ typeId: id, userId: ctx.userId, type: LIKE_TYPES.COMMENT })
    } else {
      await Promise.all([
        ctx.db.Like.save({ typeId: id, userId: ctx.userId, type: LIKE_TYPES.COMMENT }),
        ctx.db.Notification.save({
          to: comment.userId,
          type: NOTIFICATION_TYPES.NEW_COMMENT_LIKE,
          typeId: comment.id,
          userId: ctx.userId,
        }),
        ctx.services.firebase.send({
          data: {
            postId: comment.postId,
            commentId: comment.id,
          },
          to: comment.userId,
          type: NOTIFICATION_TYPES.NEW_COMMENT_LIKE,
          userId: ctx.userId,
        }),
      ])
    }
  }

  return comment
})
