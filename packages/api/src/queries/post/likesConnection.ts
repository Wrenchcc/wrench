import { In } from 'typeorm'
import paginate from '../../utils/paginate'

// TODO: Use dataloader
export default async ({ id }, args, ctx) => {
  const users = await ctx.db.Like.find({
    where: {
      typeId: id,
    },
  })

  const ids = users.map(({ userId }) => userId)

  const response = await paginate(ctx.db.User, args, {
    where: {
      id: ids.length ? In(ids) : null,
    },
  })

  return response
}
