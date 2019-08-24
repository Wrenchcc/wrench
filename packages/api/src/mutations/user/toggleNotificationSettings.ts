import { UserInputError } from 'apollo-server-express'
import { NOTIFICATIONS_COLUMN } from '../../models/UserSettings'
import { isAuthenticated } from '../../utils/permissions'
import { DEFAULT_NOTIFICATIONS, DELIVERY_METHODS } from '../../utils/defaultNotifications'

export default isAuthenticated(async (_, args, ctx) => {
  const { notificationType, deliveryMethod } = args.input

  if (!DEFAULT_NOTIFICATIONS.hasOwnProperty(notificationType)) {
    return new UserInputError('Not a valid notification type.')
  }

  if (!DELIVERY_METHODS.includes(deliveryMethod)) {
    return new UserInputError('Not a valid delivery method.')
  }

  const user = await ctx.db.User.findOne(ctx.userId)

  // Get prev state
  const settings = await ctx.db.UserSettings.findOrCreate(
    {
      type: NOTIFICATIONS_COLUMN,
      userId: ctx.userId,
    },
    {
      type: NOTIFICATIONS_COLUMN,
      userId: ctx.userId,
      value: DEFAULT_NOTIFICATIONS,
    }
  )

  const oldVal = settings.value[notificationType][deliveryMethod]

  // Update to new state
  await ctx.db.UserSettings.update(settings.id, {
    value: {
      ...DEFAULT_NOTIFICATIONS,
      ...settings.value,
      [notificationType]: {
        ...settings.value[notificationType],
        [deliveryMethod]: [notificationType][deliveryMethod] = !oldVal,
      },
    },
  })

  return user
})
