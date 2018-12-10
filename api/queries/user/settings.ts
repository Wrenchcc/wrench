import { requireAuth } from 'api/utils/permissions'
import mergeNotificationsTypes from 'api/utils/mergeNotificationsTypes'

export default requireAuth(async ({ id }, _, ctx) => {
  try {
    const notifications = await ctx.db.UserSettings.find({ where: { userId: id } })
    console.log(notifications)
    return {
      notifications: {
        types: mergeNotificationsTypes(notifications),
      },
    }
  } catch (err) {
    console.log(err)
  }
})
