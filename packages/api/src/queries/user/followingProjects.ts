import paginate from '../../utils/paginate'
import { In } from 'typeorm'

export default async ({ id }, args, ctx) => {
  const following = await ctx.db.Following.find({
    userId: id,
  })

  const projectIds = following.map(({ projectId }) => projectId)
  return paginate(ctx.db.Project, args, {
    where: { id: projectIds.length ? In(projectIds) : null },
  })
}
