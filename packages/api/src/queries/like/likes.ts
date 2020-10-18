import { In } from 'typeorm'
import paginate from '../../utils/paginate'

// TODO: Use dataloader
export default async (_, args, ctx) => {
  const likes = await paginate(ctx.db.Like, args, {
    where: {
      typeId: args.postId,
    },
  })

  const ids = likes.edges.map(({ node }) => node.userId)

  const users = await ctx.db.User.find({
    where: {
      id: ids.length ? In(ids) : null,
    },
  })

  return {
    totalCount: likes.totalCount,
    pageInfo: likes.pageInfo,
    edges: users.map((u, i) => ({
      cursor: likes.edges[i].cursor,
      node: u,
    })),
  }
}
