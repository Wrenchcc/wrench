import { ApolloError } from 'apollo-server-express'

// TODO: Use dataloader
export default async (_, { id }, ctx) => {
  // Check for id when used in project
  if (!id) {
    return null
  }

  const post = await ctx.db.Post.findOne(id)

  if (!post) {
    return new ApolloError('Post not found')
  }

  return post
}
