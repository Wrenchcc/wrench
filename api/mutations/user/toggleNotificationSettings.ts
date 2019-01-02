import { UserInputError, ForbiddenError } from 'apollo-server-express'
import { mergeRight } from 'ramda'
import { requireAuth } from 'api/utils/permissions'
import { NOTIFICATIONS_COLUMN } from 'api/models/UserSettings'
import { DEFAULT_NOTIFICATIONS } from 'api/utils/defaultNotifications'

export default requireAuth(async (_, args, ctx) => {
  const { notificationType } = args.input

  if (!DEFAULT_NOTIFICATIONS.hasOwnProperty(notificationType)) {
    return new UserInputError('Not a valid notificationType.')
  }

  // Get prev state
  const prevSettings = await ctx.db.UserSettings.findOrCreate(
    {
      type: NOTIFICATIONS_COLUMN,
      userId: ctx.userId,
    },
    {
      type: NOTIFICATIONS_COLUMN,
      userId: ctx.userId,
      value: JSON.stringify(DEFAULT_NOTIFICATIONS),
    }
  )

  // Update to new state
  await ctx.db.UserSettings.update(prevSettings.id, {
    value: {
      ...DEFAULT_NOTIFICATIONS,
      ...JSON.parse(prevSettings.value),
      [notificationType]: !JSON.parse(prevSettings.value)[notificationType],
    },
  })

  return true
})
