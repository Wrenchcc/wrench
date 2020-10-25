import { ApolloError } from 'apollo-server-express'
import { ERROR_CODES } from '../../utils/enums'

// TODO: Use dataloader
export default async (_, { id }, ctx) => {
  const post = await ctx.db.BlogPost.findOne(id)

  if (!post) {
    return new ApolloError('Post not found', ERROR_CODES.NOT_FOUND)
  }

  return post
}
