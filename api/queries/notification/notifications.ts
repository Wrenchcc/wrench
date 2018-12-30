import { requireAuth } from 'api/utils/permissions'
import paginate from 'api/utils/paginate'

// TODO: User dataloader
export default requireAuth(async (_, args, ctx) => {
  try {
    return paginate(ctx.db.Notification, args, {
      where: { to: ctx.userId },
    })
  } catch (err) {
    console.log(err)
  }
})
