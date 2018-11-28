import mergeNotificationsTypes from 'api/utils/mergeNotificationsTypes'

export default async ({ id }, _, ctx) => {
  try {
    const notifications = await ctx.db.NotificationsSettings.find({ where: { userId: id } })

    return {
      notifications: {
        types: mergeNotificationsTypes(notifications),
      },
    }
  } catch (err) {
    console.log(err)
  }
}
