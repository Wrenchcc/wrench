import { UserInputError, ForbiddenError } from 'apollo-server-express'
import { mergeRight } from 'ramda'
import { requireAuth } from 'api/utils/permissions'

const NOTIFICATIONS_COLUMN = 'notifications'

const notificationsTypes = {
  newArticle: true,
  newComment: true,
  newFollower: true,
  newMention: true,
  productAnnouncements: true,
  similarProjects: true,
}

export default requireAuth(async (_, args, ctx) => {
  const { notificationType } = args.input

  if (!notificationsTypes.hasOwnProperty(notificationType)) {
    return new UserInputError('Not a valid notificationType.')
  }

  const user = await ctx.db.User.findOne(ctx.userId)

  if (user.id !== ctx.userId) {
    return new ForbiddenError("You don't have permission to edit this account's settings")
  }

  // Get prev state
  const prevSettings = await ctx.db.UserSettings.findOrCreate(
    {
      type: NOTIFICATIONS_COLUMN,
      userId: ctx.userId,
    },
    {
      type: NOTIFICATIONS_COLUMN,
      user,
      value: notificationsTypes,
    }
  )

  // Update to new state
  await ctx.db.UserSettings.update(prevSettings.id, {
    value: {
      ...notificationsTypes,
      ...prevSettings.value,
      [notificationType]: !prevSettings.value[notificationType],
    },
  })

  return user
})
