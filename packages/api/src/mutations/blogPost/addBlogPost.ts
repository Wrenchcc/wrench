import { ForbiddenError } from 'apollo-server-express'
import { isAuthenticated, isAdmin } from '../../utils/permissions'

export default isAuthenticated(async (_, { input }, ctx) => {
  if (!isAdmin(ctx.userId)) {
    return new ForbiddenError('You don’t have permission to post.')
  }

  return ctx.db.BlogPost.createPost({
    title: input.title,
    content: input.content,
    userId: ctx.userId,
  })
})
