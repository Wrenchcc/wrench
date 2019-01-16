import { ForbiddenError } from 'apollo-server-express'
import { isAuthenticated, canModerateNotification } from 'api/utils/permissions'

export default isAuthenticated(async (_, { id }, ctx) => {
  const notification = await ctx.db.Notification.findOne(id)

  if (!canModerateNotification(notification, ctx.userId)) {
    return new ForbiddenError('You don’t have permission to manage this Notification.')
  }

  await ctx.db.Notification.delete(id)

  return true
})
