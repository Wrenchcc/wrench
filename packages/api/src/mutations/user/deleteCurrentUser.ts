import { isAuthenticated } from '../../utils/permissions'

export default isAuthenticated(async (_, __, ctx) => {
  await ctx.db.User.update(ctx.userId, {
    deletedAt: new Date(),
    isSilhouette: true,
    email: null,
    username: `deleted-${Math.random()}`,
    firstName: 'Deleted',
    lastName: 'User',
    fullName: 'Deleted User',
  })
})
