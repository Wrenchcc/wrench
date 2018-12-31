import { requireAuth } from 'api/utils/permissions'
import { NOTIFICATION_TYPES } from 'shared/utils/enums'

// TODO: User dataloader
export default requireAuth(async (_, args, ctx) => {
  const [__, unreadCount] = await ctx.db.Notification.findAndCount({
    where: {
      isSeen: false,
      to: ctx.userId,
    },
  })

  const notifications = await ctx.db.Notification.find({
    order: {
      createdAt: 'DESC',
    },
    where: { to: ctx.userId },
  })

  const edges = await Promise.all(
    notifications.map(async ({ typeId, type, ...rest }) => {
      switch (type) {
        case NOTIFICATION_TYPES.NEW_FOLLOWER:
          return {
            node: {
              ...rest,
              project: await ctx.db.Project.findOne(typeId),
              type,
              user: await ctx.db.User.findOne(ctx.userId),
            },
          }
        case NOTIFICATION_TYPES.NEW_MENTION:
        case NOTIFICATION_TYPES.NEW_COMMENT:
        case NOTIFICATION_TYPES.NEW_REPLY:
          return {
            node: {
              ...rest,
              comment: await ctx.db.Comment.findOne(typeId),
              type,
              user: await ctx.db.User.findOne(ctx.userId),
            },
          }
        default:
          return null
      }
    })
  )

  return {
    edges,
    unreadCount,
  }
})
