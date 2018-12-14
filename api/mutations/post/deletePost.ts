import { ForbiddenError } from 'apollo-server-express'
import { requireAuth, canModeratePost } from 'api/utils/permissions'

export default requireAuth(async (_, { id }, ctx) => {
  const post = await ctx.db.Post.findOne(id)

  if (!canModeratePost(post, ctx.userId)) {
    return new ForbiddenError('You don’t have permission to manage this post.')
  }

  await ctx.db.Post.delete(id)

  return true
})
