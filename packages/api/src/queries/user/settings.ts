import { mergeAll, mergeDeepRight, mergeRight } from 'ramda'
import { isAuthenticated } from '../../utils/permissions'
import { NOTIFICATIONS_COLUMN, LOCALE_COLUMN, TIMEZONE_COLUMN } from '../../models/UserSettings'
import { DEFAULT_NOTIFICATIONS } from '../../utils/defaultNotifications'

export default isAuthenticated(async (_, __, ctx) => {
  const settings = await ctx.db.UserSettings.find({
    where: {
      userId: ctx.userId,
    },
  })

  const transformSettings = settings.map(({ type, value }) => {
    switch (type) {
      case NOTIFICATIONS_COLUMN:
        return {
          notifications: {
            types: mergeDeepRight(DEFAULT_NOTIFICATIONS, value),
          },
        }
      case LOCALE_COLUMN:
        return { locale: value }
      case TIMEZONE_COLUMN:
        return { timezone: value }
      default:
        return null
    }
  })

  const response = mergeRight(
    {
      notifications: {
        types: DEFAULT_NOTIFICATIONS,
      },
    },
    mergeAll(transformSettings)
  )

  return response
})
