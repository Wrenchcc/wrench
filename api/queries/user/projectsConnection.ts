import { requireAuth } from 'api/utils/permissions'
import paginate from 'api/utils/paginate'

export default requireAuth(async (_, args, ctx) => {
  try {
    return null
    return paginate(ctx.db.Project, args, { where: { userId: ctx.userId } })
  } catch (err) {
    console.log(err)
  }
})
