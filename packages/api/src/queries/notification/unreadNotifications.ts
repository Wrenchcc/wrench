import { DateTime } from 'luxon'
import { isAuthenticated } from '../../utils/permissions'

export default isAuthenticated(async (_, __, ctx) => {
  const [{ unreadCount }] = await Promise.all([
    ctx.db.Notification.unreadCount(ctx.userId),
    // Set user last seen for isOnline (clients are polling every 3m)
    ctx.db.User.update(ctx.userId, {
      lastSeen: DateTime.local().toFormat('yyyy-MM-dd HH:mm:ss+00'),
    }),
  ])

  return unreadCount
})
