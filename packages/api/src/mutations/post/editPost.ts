import { ForbiddenError } from 'apollo-server-express'
import { isAuthenticated, canModeratePost, isAdmin } from '../../utils/permissions'

export default isAuthenticated(async (_, { id, input }, ctx) => {
  const post = await ctx.db.Post.findOne(id)

  if (!canModeratePost(post, ctx.userId) && !isAdmin(ctx.userId)) {
    return new ForbiddenError('You don’t have permission to manage this post.')
  }

  // await Promise.all([
  //   ctx.redis.delete(`post:filesConnection:${id}:*`),
  //   ctx.redis.delete(`project:cover:${id}`),
  // ])

  ctx.redis.delete(`post:filesConnection:${id}:*`)
  ctx.redis.delete(`project:cover:${id}`)

  // Add new project if projectId is defined or use currenct project
  const project = await ctx.db.Project.findOne(input.projectId || post.projectId)

  return ctx.db.Post.save({
    ...post,
    ...input,
    project,
  })
})
