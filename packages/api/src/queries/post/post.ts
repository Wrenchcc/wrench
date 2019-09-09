import { ApolloError } from 'apollo-server-express'
import { ERROR_CODES } from '../../utils/enums'

// TODO: Use dataloader
export default async (_, { id }, ctx) => {
  // Check for id when used in project
  if (!id) {
    return null
  }

  const post = await ctx.db.Post.findOne(id)

  if (!post) {
    return new ApolloError('Post not found', ERROR_CODES.NOT_FOUND)
  }

  return post
}
