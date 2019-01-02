import { requireAuth } from 'api/utils/permissions'

export default requireAuth(async (_, { token, platform }, ctx) => {
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
