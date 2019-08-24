import { ApolloError } from 'apollo-server-express'
import { isAuthenticated, isAdmin } from '../../utils/permissions'

/*
  Occassionally bad actors will show up on Spectrum and become toxic, 
  spam communities, harass others, or violate our code of conduct. 
  We have a safe way to ban these users in a way that respects the 
  integrity of data across the rest of the database.
  Do NOT ever `delete` a user record from the database!!
*/
export default isAuthenticated(async (_, { userId }, ctx) => {
  if (!isAdmin(ctx.userId)) {
    return new ApolloError('You don’t have permission to do that.')
  }

  if (ctx.userId === userId) {
    return new ApolloError('You cannot ban yourself.')
  }

  const reportedUser = await ctx.db.User.findOne(userId)

  if (!reportedUser) {
    return new ApolloError(`User with ID ${userId} does not exist.`)
  }

  if (reportedUser.bannedAt) {
    return new ApolloError('This user has already been banned')
  }

  // Delete user comments, posts, files
  await Promise.all([
    ctx.db.User.update(reportedUser.id, {
      bannedAt: new Date(),
      isSilhouette: true,
      email: null,
      username: `banned-${Math.random()}`,
    }),
    ctx.db.Comment.delete({
      userId: reportedUser.id,
    }),
    ctx.db.File.delete({ userId: reportedUser.id }),
    ctx.db.Post.delete({ userId: reportedUser.id }),
  ])
})
