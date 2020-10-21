import { ForbiddenError } from 'apollo-server-express'
import { isAuthenticated, canModerateProject, isAdmin } from '../../utils/permissions'

export default isAuthenticated(async (_, { projectId, name }, ctx) => {
  const project = await ctx.db.Project.findOne(projectId)

  if (!canModerateProject(project, ctx.userId) && !isAdmin(ctx.userId)) {
    return new ForbiddenError('You don’t have permission to manage this project.')
  }

  // await ctx.redis.delete(`project:collectionsConnection:${projectId}:*`)

  const collection = await ctx.db.Collection.saveCollection(name.trim(), ctx.userId)

  await ctx.db.ProjectCollection.save({
    collectionId: collection.id,
    projectId,
  })

  return collection
})
