import { requireAuth } from 'api/utils/permissions'

export default requireAuth(async ({ id }, _, ctx) => {
  try {
    const notifications = await ctx.db.UserSettings.findOne({
      where: {
        type: 'notifications',
        userId: id,
      },
    })

    return {
      notifications: {
        types: notifications.value,
      },
    }
  } catch (err) {
    console.log(err)
  }
})
