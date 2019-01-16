import { In } from 'typeorm'
import paginate from 'api/utils/paginate'

export default async (args, ctx) => {
  try {
    const following = await ctx.db.Following.find({
      userId: ctx.userId,
    })

    const ids = following.map(({ projectId }) => projectId)

    return paginate(ctx.db.Post, args, {
      where: {
        userId: ctx.userId,
        projectId: ids.length ? In(ids) : null,
      },
    })
  } catch (err) {
    console.log(err)
  }
}
