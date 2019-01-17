import paginate from 'api/utils/paginate'
import { In } from 'typeorm'

// TODO: Use dataloader
export default async ({ id }, args, ctx) => {
  const followers = await ctx.db.Following.find({
    projectId: id,
  })

  const userIds = followers.map(({ userId }) => userId)
  return paginate(ctx.db.User, args, {
    where: { id: userIds.length ? In(userIds) : null },
  })
}
