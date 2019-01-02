import { filter } from 'ramda'
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
    notifications.map(async ({ typeId, type, userId, ...rest }) => {
      switch (type) {
        case NOTIFICATION_TYPES.NEW_FOLLOWER:
          const project = await ctx.db.Project.findOne(typeId)

          if (!project) {
            await ctx.db.Notification.delete({ typeId })
            return null
          }

          return {
            node: {
              ...rest,
              project,
              type,
              user: await ctx.db.User.findOne(userId),
            },
          }
        case NOTIFICATION_TYPES.NEW_MENTION:
        case NOTIFICATION_TYPES.NEW_COMMENT:
        case NOTIFICATION_TYPES.NEW_REPLY:
          const comment = await ctx.db.Comment.findOne(typeId)

          if (!comment) {
            await ctx.db.Notification.delete({ typeId })
            return null
          }

          return {
            node: {
              ...rest,
              comment,
              type,
              user: await ctx.db.User.findOne(userId),
            },
          }
        default:
          return null
      }
    })
  )

  return {
    edges: filter(n => n !== null, edges),
    unreadCount,
  }
})
