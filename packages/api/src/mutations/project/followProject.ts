import { ForbiddenError } from 'apollo-server-express'
import { isAuthenticated, canModerateProject } from '../../utils/permissions'
import { NOTIFICATION_TYPES } from '../../utils/enums'

export default isAuthenticated(async (_, { id }, ctx) => {
  const project = await ctx.db.Project.findOne(id)
  const isFollower = await ctx.db.Following.isFollower(ctx.userId, id)

  if (canModerateProject(project, ctx.userId)) {
    return new ForbiddenError('You can’t follow your own project.')
  }

  const cacheKey1 = `follower:followers:${id}:*`
  ctx.redis.delete(cacheKey1)

  const cacheKey2 = `project:followersConnection:${id}:*}`
  ctx.redis.delete(cacheKey2)

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
