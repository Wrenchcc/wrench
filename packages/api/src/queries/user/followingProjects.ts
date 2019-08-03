import paginate from '../../utils/paginate'
import { In } from 'typeorm'

export default async ({ id }, args, ctx) => {
  const following = await ctx.db.Following.find({
    userId: id,
  })

  let ids = following.map(({ projectId }) => projectId)

  // NOTE: Show popular project if user doesn't follow any
  if (!ids.length) {
    const projects = await ctx.db.Project.getPopularProjects()
    ids = projects.map(p => p.id)
  }

  return paginate(ctx.db.Project, args, {
    where: {
      id: In(ids),
    },
  })
}
