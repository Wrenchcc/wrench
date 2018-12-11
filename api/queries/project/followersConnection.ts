import paginate from 'api/utils/paginate'
import { In } from 'typeorm'

// TODO: User dataloader
export default async ({ id }, args, ctx) => {
  try {
    const followers = await ctx.db.Following.find({
      projectId: id,
    })

    const userIds = followers.map(({ userId }) => userId)
    return paginate(ctx.db.User, args, {
      where: { id: userIds.length ? In(userIds) : null },
    })
  } catch (err) {
    console.log(err)
  }
}
