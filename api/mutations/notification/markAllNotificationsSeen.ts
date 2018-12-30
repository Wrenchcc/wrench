import { requireAuth } from 'api/utils/permissions'

export default requireAuth(async (_, __, ctx) => {
  await ctx.db.Notification.update(
    {
      isSeen: false,
      to: ctx.userId,
    },
    { isSeen: true }
  )

  return true
})
