import { ForbiddenError } from 'apollo-server-express'
import { requireAuth, canModerateProject } from 'api/utils/permissions'
import { NOTIFICATION_TYPES } from 'api/utils/notificationTypes'

export default requireAuth(async (_, { id }, ctx) => {
  const userId = ctx.userId
  const project = await ctx.db.Project.findOne(id)
  const isFollower = await ctx.db.Following.isFollower(userId, id)

  if (canModerateProject(project, userId)) {
    return new ForbiddenError('You can’t follow your own project.')
  }

  if (isFollower) {
    await ctx.db.Following.delete({ projectId: id, userId })
  } else {
    await ctx.db.Following.save({ projectId: id, userId })

    await ctx.services.firebase.sendPushNotification({
      data: project,
      from: userId,
      to: project.userId,
      type: NOTIFICATION_TYPES.NEW_FOLLOWER,
    })
  }

  return ctx.db.Project.findOne(id)
})
