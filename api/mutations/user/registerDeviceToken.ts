import { requireAuth } from 'api/utils/permissions'

export default requireAuth(async (_, { token, platform }, ctx) => {
  const user = await ctx.db.User.findOne(ctx.userId)
  const tokenExists = await ctx.db.DeviceToken.findOne({ token })

  if (!tokenExists) {
    await ctx.db.DeviceToken.save({
      platform,
      token,
      user,
    })
  }

  return true
})
