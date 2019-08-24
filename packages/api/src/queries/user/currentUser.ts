import { isAuthenticated } from '../../utils/permissions'

export default isAuthenticated(async (_, __, ctx) => {
  const user = await ctx.db.User.findOne(ctx.userId)

  if (!user || user.bannedAt) {
    return null
  }

  return user
})
