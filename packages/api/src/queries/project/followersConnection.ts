import { In } from 'typeorm'
import paginate from '../../utils/paginate'

// TODO: Use dataloader
export default async ({ id }, args, ctx) => {
  const followers = await ctx.db.Following.find({
    projectId: id,
  })

  const ids = followers.map(({ userId }) => userId)

  return paginate(ctx.db.User, args, {
    where: {
      id: ids.length ? In(ids) : null,
    },
  })
}
