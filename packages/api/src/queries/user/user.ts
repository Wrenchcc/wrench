import { ApolloError } from 'apollo-server-express'

// TODO: userByUsername loader
export default async (_, args, ctx) => {
  if (args.username) {
    const user = await ctx.db.User.findOne({
      where: {
        username: args.username,
      },
    })

    if (!user) {
      return new ApolloError('User not found')
    }

    return user
  }
  if (args.id) {
    const user = await ctx.loaders.user.load(args.id)

    if (!user) {
      return new ApolloError('User not found')
    }

    return user
  }
}
