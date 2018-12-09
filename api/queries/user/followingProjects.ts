import paginate from 'api/utils/paginate'
import { In } from 'typeorm'

export default async ({ id }, args, ctx) => {
  try {
    const following = await ctx.db.Following.find({
      userId: id,
    })

    const projectIds = following.map(({ projectId }) => projectId)
    return paginate(ctx.db.Project, args, {
      where: { id: In(projectIds) },
    })
  } catch (err) {
    console.log(err)
  }
}
