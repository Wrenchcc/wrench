import { ForbiddenError } from 'apollo-server-express'
import { isAuthenticated, canModeratePost } from '../../utils/permissions'

export default isAuthenticated(async (_, { id }, ctx) => {
  const post = await ctx.db.Post.findOne(id)

  if (!canModeratePost(post, ctx.userId)) {
    return new ForbiddenError('You don’t have permission to manage this post.')
  }

  await ctx.db.Post.delete(id)

  return true
})
