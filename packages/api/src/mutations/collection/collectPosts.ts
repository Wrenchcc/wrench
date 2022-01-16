import { ForbiddenError } from 'apollo-server-express'
import { isAuthenticated, canModerateProject, isAdmin } from '../../utils/permissions'
import { transformFileUrl } from '../../utils/transformFileUrl'

export default isAuthenticated(async (_, { projectId, collectionId, input }, ctx) => {
  const project = await ctx.db.Project.findOne(projectId)

  if (!canModerateProject(project, ctx.userId) && !isAdmin(ctx.userId)) {
    return new ForbiddenError('You don’t have permission to manage this project.')
  }

  // await ctx.redis.delete(`project:collectionsConnection:${projectId}:*`)

  input.map(async ({ postId }) => {
    ctx.db.PostCollection.save({
      collectionId,
      projectId,
      postId,
    })
  })

  const file = await ctx.db.File.findOne({ postId: input[0].postId })
  const collection = await ctx.db.Collection.findOne(collectionId)

  return {
    ...collection,
    cover: {
      uri: transformFileUrl(file),
    },
  }
})
