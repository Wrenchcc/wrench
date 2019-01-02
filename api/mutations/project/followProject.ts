import { ForbiddenError } from 'apollo-server-express'
import { requireAuth, canModerateProject } from 'api/utils/permissions'
import { NOTIFICATION_TYPES } from 'shared/utils/enums'

export default requireAuth(async (_, { id }, ctx) => {
  const project = await ctx.db.Project.findOne(id)
  const isFollower = await ctx.db.Following.isFollower(ctx.userId, id)

  if (canModerateProject(project, ctx.userId)) {
    return new ForbiddenError('You can’t follow your own project.')
  }

  if (isFollower) {
    await ctx.db.Following.delete({ projectId: id, userId: ctx.userId })
  } else {
    await Promise.all([
      ctx.db.Following.save({ projectId: id, userId: ctx.userId }),
      ctx.db.Notification.save({
        to: project.userId,
        type: NOTIFICATION_TYPES.NEW_FOLLOWER,
        typeId: project.id,
        userId: ctx.userId,
      }),
      ctx.services.firebase.sendPushNotification(
        {
          data: project,
          to: project.userId,
          type: NOTIFICATION_TYPES.NEW_FOLLOWER,
          userId: ctx.userId,
        },
        ctx.translate
      ),
    ])
  }

  return ctx.db.Project.findOne(id)
})
