import { isAuthenticated } from '../../utils/permissions'

export default isAuthenticated(async (_, __, ctx) => {
  await ctx.db.Notification.update(
    {
      isSeen: false,
      to: ctx.userId,
    },
    { isSeen: true }
  )

  return true
})
