import { UserInputError, ForbiddenError } from 'apollo-server-express'
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

export default requireAuth(async (_, args, ctx) => {
  const { notificationType } = args.input

  if (!DEFAULT_NOTIFICATIONS.hasOwnProperty(notificationType)) {
    return new UserInputError('Not a valid notificationType.')
  }

  const user = await ctx.db.User.findOne(ctx.userId)

  // Get prev state
  const prevSettings = await ctx.db.UserSettings.findOrCreate(
    {
      type: NOTIFICATIONS_COLUMN,
      userId: ctx.userId,
    },
    {
      type: NOTIFICATIONS_COLUMN,
      user,
      value: DEFAULT_NOTIFICATIONS,
    }
  )

  // Update to new state
  await ctx.db.UserSettings.update(prevSettings.id, {
    value: {
      ...DEFAULT_NOTIFICATIONS,
      ...prevSettings.value,
      [notificationType]: !prevSettings.value[notificationType],
    },
  })

  return user
})
