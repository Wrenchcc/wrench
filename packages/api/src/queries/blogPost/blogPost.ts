import { ApolloError } from 'apollo-server-express'
import { ERROR_CODES } from '../../utils/enums'

// TODO: Use dataloader
export default async (_, { id, slug }, ctx) => {
  const post = await ctx.db.BlogPost.findOne({
    id,
    slug,
  })

  if (!post) {
    return new ApolloError('Post not found', ERROR_CODES.NOT_FOUND)
  }

  return post
}
