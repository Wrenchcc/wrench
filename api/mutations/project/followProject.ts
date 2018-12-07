import { requireAuth, canModerateProject } from 'api/utils/permissions'
import UserError from 'api/utils/UserError'

export default requireAuth(async (_, { id }, ctx) => {
  const project = await ctx.db.Project.findOne(id)
  const isFollower = await ctx.db.Following.isFollower(ctx.userId, id)

  if (canModerateProject(project, ctx.userId)) {
    return new UserError('You can’t follow your own project.')
  }

  if (isFollower) {
    await ctx.db.Following.delete({ projectId: id, userId: ctx.userId })
  } else {
    // TODO: New follow, push notification to owner
    await ctx.db.Following.save({ projectId: id, userId: ctx.userId })
  }

  return ctx.db.Project.findOne(id)
})
