import { In } from 'typeorm'
import { isAuthenticated } from '../../utils/permissions'
import paginate from '../../utils/paginate'

export default isAuthenticated(async (_, args, ctx) => {
  const following = await ctx.db.Following.find({
    userId: ctx.userId,
  })

  const ids = following.map(({ projectId }) => projectId)

  return paginate(ctx.db.Post, args, {
    where: [
      {
        projectId: ids.length ? In(ids) : null,
      },
      { userId: ctx.userId },
    ],
  })
})
