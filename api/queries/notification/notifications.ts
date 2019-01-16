import { filter } from 'ramda'
import { DateTime } from 'luxon'
import { isAuthenticated } from 'api/utils/permissions'
import { NOTIFICATION_TYPES } from 'shared'

// TODO: User dataloader
// TODO: Paginate
export default isAuthenticated(async (_, args, ctx) => {
  // Set user last seen for isOnline (clients are polling every 1m)
  await ctx.db.User.update(ctx.userId, {
    lastSeen: DateTime.local().toFormat('yyyy-MM-dd HH:mm:ss+00'),
  })

  const { unreadCount } = await ctx.db.Notification.unreadCount(ctx.userId)

  const notifications = await ctx.db.Notification.find(
    {
      order: {
        createdAt: 'DESC',
      },
      where: { to: ctx.userId },
    },
    args
  )

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
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
    },
    unreadCount,
  }
})
