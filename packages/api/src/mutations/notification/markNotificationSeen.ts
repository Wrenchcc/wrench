import { ForbiddenError } from 'apollo-server-express'
import { isAuthenticated, canModerateNotification } from '../../utils/permissions'

export default isAuthenticated(async (_, { id }, ctx) => {
  const notification = await ctx.db.Notification.findOne(id)
  if (!canModerateNotification(notification, ctx.userId)) {
    return new ForbiddenError('You don’t have permission to manage this Notification.')
  }

  return ctx.db.Notification.save({
    ...notification,
    isSeen: true,
  })
})
