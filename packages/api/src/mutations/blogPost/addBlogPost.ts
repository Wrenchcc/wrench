import { ForbiddenError } from 'apollo-server-express'
import { isAuthenticated, isAdmin } from '../../utils/permissions'

export default isAuthenticated(async (_, { id, input }, ctx) => {
  if (!isAdmin(ctx.userId)) {
    return new ForbiddenError('You don’t have permission to post.')
  }

  let post

  if (id) {
    post = await ctx.db.BlogPost.findOne(id)
  }

  return ctx.db.BlogPost.savePost({
    ...post,
    title: input.title,
    content: input.content && JSON.parse(input.content),
    userId: ctx.userId,
  })
})
