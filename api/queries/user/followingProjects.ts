import paginate from 'api/utils/paginate'
import { In } from 'typeorm'

export default async ({ id }, args, ctx) => {
  try {
    const following = await ctx.db.Following.find({
      where: {
        projectId: id,
      },
    })

    const projectIds = following.map(({ userId }) => userId)

    return paginate(ctx.db.Project, args, { id: In(projectIds) })
  } catch (err) {
    console.log(err)
  }
}
