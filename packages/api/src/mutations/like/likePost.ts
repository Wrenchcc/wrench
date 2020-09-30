import { isAuthenticated } from '../../utils/permissions'
import { NOTIFICATION_TYPES, LIKE_TYPES } from '../../utils/enums'

export default isAuthenticated(async (_, { id }, ctx) => {
  await Promise.all([
    ctx.redis.delete(`post:likes:${id}:${ctx.userId}`),
    ctx.redis.delete(`post:likesConnection:${id}:*`),
  ])

  const [isLiked, post] = await Promise.all([
    ctx.db.Like.isLiked(ctx.userId, id),
    ctx.db.Post.findOne(id),
  ])

  if (isLiked) {
    await ctx.db.Like.delete({ typeId: id, userId: ctx.userId })
  } else {
    // NOTE: If post owner just add the like
    if (post.userId === ctx.userId) {
      await ctx.db.Like.save({ typeId: id, userId: ctx.userId, type: LIKE_TYPES.POST })
    } else {
      await Promise.all([
        ctx.db.Like.save({ typeId: id, userId: ctx.userId, type: LIKE_TYPES.POST }),
        ctx.db.Notification.save({
          to: post.userId,
          type: NOTIFICATION_TYPES.NEW_POST_LIKE,
          typeId: post.id,
          userId: ctx.userId,
        }),
        ctx.services.firebase.send({
          data: {
            postId: post.id,
          },
          to: post.userId,
          type: NOTIFICATION_TYPES.NEW_POST_LIKE,
          userId: ctx.userId,
        }),
      ])
    }
  }

  return post
})
