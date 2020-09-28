import { ForbiddenError } from 'apollo-server-express'
import { isAuthenticated, isAdmin, canModeratePost } from '../../utils/permissions'

export default isAuthenticated(async (_, { id }, ctx) => {
  const post = await ctx.db.Post.findOne(id)

  if (!canModeratePost(post, ctx.userId) && !isAdmin(ctx.userId)) {
    return new ForbiddenError('You don’t have permission to manage this post.')
  }

  const cacheKey = `post:filesConnection:${id}:*`
  ctx.redis.delete(cacheKey)

  await ctx.db.File.delete({ postId: id })
  await ctx.db.Post.delete(id)

  return post
})
