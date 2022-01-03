import { ForbiddenError } from 'apollo-server-express'
import { isAuthenticated, isAdmin } from '../../utils/permissions'

export default isAuthenticated(async (_, { id }, ctx) => {
  if (!isAdmin(ctx.userId)) {
    return new ForbiddenError('You don’t have permission to delete this user.')
  }

  await ctx.db.User.update(id, {
    deletedAt: new Date(),
    isSilhouette: true,
    email: null,
    username: `deleted-${Math.random()}`,
    firstName: 'Deleted',
    lastName: 'User',
    fullName: 'Deleted User',
  })
})
