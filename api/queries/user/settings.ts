import { mergeRight } from 'ramda'
import { requireAuth } from 'api/utils/permissions'
import { NOTIFICATION_TYPES } from 'shared/utils/enums'

const DEFAULT_NOTIFICATIONS = {
  [NOTIFICATION_TYPES.NEW_ARTICLE]: true,
  [NOTIFICATION_TYPES.NEW_COMMENT]: true,
  [NOTIFICATION_TYPES.NEW_FOLLOWER]: true,
  [NOTIFICATION_TYPES.NEW_MENTION]: true,
  [NOTIFICATION_TYPES.PRODUCT_ANNOUNCEMENTS]: true,
  [NOTIFICATION_TYPES.SIMILAR_PROJECTS]: true,
}

const NOTIFICATIONS_COLUMN = 'notifications'

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
