import { IsNull } from 'typeorm'
import paginate from '../../utils/paginate'

export default async (_, args, ctx) => {
  const cacheKey = `comment:comments:${args.postId}:${JSON.stringify(args)}`
  const cache = await ctx.redis.get(cacheKey)

  if (cache) {
    return cache
  }

  const response = await paginate(ctx.db.Comment, args, {
    where: {
      commentId: IsNull(),
      postId: args.postId,
    },
  })

  ctx.redis.set(cacheKey, response)

  return response
}
