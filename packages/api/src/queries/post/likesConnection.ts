import { In } from 'typeorm'
import paginate from '../../utils/paginate'

// TODO: Use dataloader
export default async ({ id, createdAt, updatedAt }, args, ctx) => {
  const users = await ctx.db.Like.find({
    where: {
      typeId: id,
    },
  })

  const ids = users.map(({ userId }) => userId)

  const u = await paginate(ctx.db.User, args, {
    where: {
      id: ids.length ? In(ids) : null,
    },
  })

  const edges = u.edges.map((user) => ({
    node: {
      id,
      updatedAt,
      createdAt,
      user: user.node,
    },
  }))

  return {
    edges,
  }
}
