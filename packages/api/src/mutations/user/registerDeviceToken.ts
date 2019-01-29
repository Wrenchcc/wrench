import { isAuthenticated } from '../../utils/permissions'

export default isAuthenticated(async (_, { token, platform }, ctx) => {
  const tokenExists = await ctx.db.DeviceToken.findOne({ token })

  if (!tokenExists) {
    // Delete previous device token on same platform
    // and if we get a new one from Firebase
    await ctx.db.DeviceToken.delete({
      platform,
      userId: ctx.userId,
    })

    // Save new token
    await ctx.db.DeviceToken.save({
      platform,
      token,
      userId: ctx.userId,
    })
  }

  return true
})
