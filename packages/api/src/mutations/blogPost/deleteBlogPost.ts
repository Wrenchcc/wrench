import { ForbiddenError } from 'apollo-server-express'
import { isAuthenticated, isAdmin } from '../../utils/permissions'

export default isAuthenticated(async (_, { id }, ctx) => {
  const post = await ctx.db.BlogPost.findOne(id)

  if (!isAdmin(ctx.userId)) {
    return new ForbiddenError('You don’t have permission to manage this post.')
  }

  ctx.db.BlogPost.delete(id)

  return post
})
