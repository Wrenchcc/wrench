import { mergeRight, mergeAll } from 'ramda'
import { requireAuth } from 'api/utils/permissions'
import { NOTIFICATIONS_COLUMN, LOCALE_COLUMN } from 'api/models/UserSettings'
import { DEFAULT_NOTIFICATIONS } from 'api/utils/defaultNotifications'

export default requireAuth(async ({ id }, _, ctx) => {
  const settings = await ctx.db.UserSettings.find({
    where: {
      userId: id,
    },
  })

  const transformSettings = settings.map(({ type, value }) => {
    switch (type) {
      case NOTIFICATIONS_COLUMN:
        return {
          notifications: {
            types: mergeRight(DEFAULT_NOTIFICATIONS, JSON.parse(value)),
          },
        }
      case LOCALE_COLUMN:
        return { locale: value }
      default:
        return null
    }
  })

  return mergeRight(
    {
      notifications: {
        types: DEFAULT_NOTIFICATIONS,
      },
    },
    mergeAll(transformSettings)
  )
})
