import { isAuthenticated } from 'api/utils/permissions'

export default isAuthenticated(async (_, { token, platform }, ctx) => {
  const tokenExists = await ctx.db.DeviceToken.findOne({ token })

  if (!tokenExists) {
    await ctx.db.DeviceToken.save({
      platform,
      token,
      userId: ctx.userId,
    })
  }

  return true
})
