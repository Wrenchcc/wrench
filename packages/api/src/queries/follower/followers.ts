import { In } from 'typeorm'
import paginate from '../../utils/paginate'

// TODO: Use dataloader
export default async (_, args, ctx) => {
  const followers = await ctx.db.Following.find({
    where: {
      projectId: args.projectId,
    },
  })

  const userIds = followers.map(({ userId }) => userId)

  return paginate(ctx.db.User, args, {
    where: { id: userIds.length ? In(userIds) : null },
  })
}
