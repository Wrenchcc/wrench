import { transformNotificationTypes, toggleValue } from 'api/utils/transformNotificationTypes'

const NOTIFICATIONS = 'notifications'
const DEFAULT_VALUE = false

export default async function toggleNotificationSettings(_, args, ctx) {
  const { notificationType } = args.input
  const user = await ctx.db.Users.findOne(ctx.userId)

  const parent = await ctx.db.Settings.findOrCreate(
    { type: NOTIFICATIONS, userId: user.id },
    { type: NOTIFICATIONS, user }
  )

  // Get prev state
  const prev = await ctx.db.Settings.findOrCreate(
    {
      parentId: parent.id,
      type: notificationType,
      userId: ctx.userId,
    },
    {
      type: notificationType,
      parentId: parent.id,
      value: DEFAULT_VALUE,
      user,
    }
  )

  // Update to new state
  await ctx.db.Settings.update(prev.id, {
    value: toggleValue(prev.value),
  })

  // Get updated values
  const updatedNotifications = await ctx.db.Settings.find({
    select: ['type', 'value'],
    where: {
      parentId: parent.id,
      userId: ctx.userId,
    },
  })

  return {
    ...user,
    settings: {
      notifications: {
        types: transformNotificationTypes(updatedNotifications),
      },
    },
  }
}
