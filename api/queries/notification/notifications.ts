import { requireAuth } from 'api/utils/permissions'
import { NOTIFICATION_TYPES } from 'shared/utils/enums'

// TODO: User dataloader
export default requireAuth(async (_, args, ctx) => {
  const notifications = await ctx.db.Notification.find({
    where: { to: ctx.userId },
  })

  const edges = await Promise.all(
    notifications.map(async ({ id, typeId, type }) => {
      switch (type) {
        case NOTIFICATION_TYPES.NEW_FOLLOWER:
          return {
            node: {
              id,
              project: await ctx.db.Project.findOne(typeId),
              type: NOTIFICATION_TYPES.NEW_FOLLOWER,
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
  }
})
