import { In } from 'typeorm'
import paginate from '../../utils/paginate'

// TODO: Use dataloader
export default async (_, args, ctx) => {
  const likes = await ctx.db.Like.find({
    where: {
      typeId: args.postId,
    },
  })

  const ids = likes.map(({ userId }) => userId)

  return paginate(ctx.db.User, args, {
    where: {
      id: ids.length ? In(ids) : null,
    },
  })
}
