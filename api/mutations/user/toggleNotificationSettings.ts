import { UserInputError, ForbiddenError } from 'apollo-server-express'
import { requireAuth } from 'api/utils/permissions'
import mergeNotificationsTypes from 'api/utils/mergeNotificationsTypes'
import notificationsTypes from 'api/utils/notificationsTypes'

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
  const prev = await ctx.db.UserSettings.findOrCreate(
    {
      type: notificationType,
      userId: ctx.userId,
    },
    {
      type: notificationType,
      value: { value: 'true' },
      user,
    }
  )

  console.log(prev)

  // Update to new state
  // await ctx.db.UserSettings.update(prev.id, {
  //   value: !prev.value,
  // })

  //
  // // Get updated values
  // const updatedNotifications = await ctx.db.UserSettings.find({
  //   where: { userId: ctx.userId },
  // })
  //
  return {
    ...user,
    settings: {
      notifications: {
        // types: mergeNotificationsTypes(updatedNotifications),
      },
    },
  }
})
