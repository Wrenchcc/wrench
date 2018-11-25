import mergeNotificationsTypes from 'api/utils/mergeNotificationsTypes'
import notificationsTypes from 'api/utils/notificationsTypes'

export default async function toggleNotificationSettings(_, args, ctx) {
  const { notificationType } = args.input

  if (!notificationsTypes.hasOwnProperty(notificationType)) {
    return new Error('Not a valid notificationType.')
  }

  const user = await ctx.db.Users.findOne(ctx.userId)

  if (user.id !== ctx.userId) {
    return new Error("You don't have permission to edit this account's settings")
  }

  // Get prev state
  const prev = await ctx.db.NotificationsSettings.findOrCreate(
    {
      type: notificationType,
      userId: ctx.userId,
    },
    {
      type: notificationType,
      user,
    }
  )

  // Update to new state
  await ctx.db.NotificationsSettings.update(prev.id, {
    value: !prev.value,
  })

  // Get updated values
  const updatedNotifications = await ctx.db.NotificationsSettings.find({
    where: { userId: ctx.userId },
  })

  return {
    ...user,
    settings: {
      notifications: {
        types: mergeNotificationsTypes(updatedNotifications),
      },
    },
  }
}
