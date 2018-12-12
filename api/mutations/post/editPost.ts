import { ForbiddenError } from 'apollo-server-express'
import { requireAuth, canModeratePost } from 'api/utils/permissions'

export default requireAuth(async (_, { id, input }, ctx) => {
  const post = await ctx.db.Post.findOne(id)

  if (!canModeratePost(post, ctx.userId)) {
    return new ForbiddenError('You don’t have permission to manage this post.')
  }

  // Add new project if projectId is defined or use currenct project
  const project = await ctx.db.Project.findOne(input.projectId || post.projectId)

  return ctx.db.Post.save({
    ...post,
    ...input,
    project,
  })
})
