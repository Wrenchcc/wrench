import { ApolloError } from 'apollo-server-express'
import { ERROR_CODES } from '../../utils/enums'

// TODO: userByUsername loader
export default async (_, args, ctx) => {
  if (args.username) {
    const user = await ctx.db.User.findOne({
      where: {
        username: args.username,
      },
    })

    if (!user) {
      return new ApolloError('User not found', ERROR_CODES.NOT_FOUND)
    }

    return user
  }
  if (args.id) {
    const user = await ctx.loaders.user.load(args.id)

    if (!user) {
      return new ApolloError('User not found', ERROR_CODES.NOT_FOUND)
    }

    return user
  }
}
