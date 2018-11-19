import { mergeDeepRight } from 'ramda'

export default async (_, args, ctx) => {
  const { notificationType } = args.input
  const user = await ctx.db.Users.findOne(ctx.userId)

  // Get prev state
  const prev = await ctx.db.Notifications.findOne({
    select: ['id', 'value'],
    where: { type: notificationType, userId: ctx.userId },
  })

  // Update to new state
  await ctx.db.Notifications.update(prev.id, {
    value: !prev.value,
  })

  // Return all notifications
  const notifications = await ctx.db.Notifications.find({
    select: ['type', 'value'],
    where: { userId: ctx.userId },
  })

  // return {
  //   ...user,
  //   notifications,
  // }
}
