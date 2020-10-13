import { ForbiddenError } from 'apollo-server-express'
import { isAuthenticated, canModerateProject } from '../../utils/permissions'
import { NOTIFICATION_TYPES } from '../../utils/enums'

export default isAuthenticated(async (_, { id }, ctx) => {
  const project = await ctx.db.Project.findOne(id)
  const isFollower = await ctx.db.Following.isFollower(ctx.userId, id)

  if (canModerateProject(project, ctx.userId)) {
    return new ForbiddenError('You can’t follow your own project.')
  }

  await Promise.all([
    ctx.redis.delete(`follower:followers:${id}:*`),
    // ctx.redis.delete(`project:followersConnection:${id}:*`),
  ])

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
      ctx.services.firebase.send({
        data: project,
        to: project.userId,
        type: NOTIFICATION_TYPES.NEW_FOLLOWER,
        userId: ctx.userId,
      }),
    ])
  }

  return project
})
