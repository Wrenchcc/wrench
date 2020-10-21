import { ForbiddenError } from 'apollo-server-express'
import { isAuthenticated, canModerateProject, isAdmin } from '../../utils/permissions'

export default isAuthenticated(async (_, { id, projectId }, ctx) => {
  const project = await ctx.db.Project.findOne(projectId)

  if (!canModerateProject(project, ctx.userId) && !isAdmin(ctx.userId)) {
    return new ForbiddenError('You don’t have permission to manage this project.')
  }

  const [collection] = await Promise.all([
    // ctx.db.Collection.find(id),
    ctx.db.ProjectCollection.delete({
      collectionId: id,
      projectId,
    }),
    ctx.db.PostCollection.delete({
      collectionId: id,
      projectId,
    }),
    // ctx.redis.delete(cacheKey1),
  ])

  return collection
})
