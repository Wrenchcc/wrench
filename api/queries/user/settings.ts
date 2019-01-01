import { mergeRight } from 'ramda'
import { requireAuth } from 'api/utils/permissions'
import { NOTIFICATIONS_COLUMN } from 'api/models/UserSettings'
import { DEFAULT_NOTIFICATIONS } from 'api/utils/defaultNotifications'

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
          ? mergeRight(DEFAULT_NOTIFICATIONS, JSON.parse(notifications.value))
          : DEFAULT_NOTIFICATIONS,
      },
    }
  } catch (err) {
    console.log(err)
  }
})
