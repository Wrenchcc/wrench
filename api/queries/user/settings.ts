import { mergeRight } from 'ramda'
import { requireAuth } from 'api/utils/permissions'
import { DEFAULT_NOTIFICATIONS, NOTIFICATIONS_COLUMN } from 'api/utils/notificationsTypes'

export default requireAuth(async ({ id }, _, ctx) => {
  try {
    const notifications = await ctx.db.UserSettings.findOne({
      where: {
        type: NOTIFICATIONS_COLUMN,
        userId: id,
      },
    })

    return {
      notifications: {
        types: notifications
          ? mergeRight(DEFAULT_NOTIFICATIONS, notifications.value)
          : DEFAULT_NOTIFICATIONS,
      },
    }
  } catch (err) {
    console.log(err)
  }
})
