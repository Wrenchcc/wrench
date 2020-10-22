import { In } from 'typeorm'
import paginate from '../../utils/paginate'

export default async (_, args, ctx) => {
  const bookmarks = await paginate(ctx.db.PostCollection, args, {
    where: {
      collectionId: args.id,
      projectId: args.projectId,
    },
  })

  const ids = bookmarks.edges.map(({ node }) => node.postId)

  const posts = await ctx.db.Post.find({
    where: {
      id: ids.length ? In(ids) : null,
    },
  })

  return {
    totalCount: bookmarks.totalCount,
    pageInfo: bookmarks.pageInfo,
    edges: bookmarks.edges.map((b) => {
      return {
        cursor: b.cursor,
        node: posts.find((p) => p.id === b.node.postId),
      }
    }),
  }
}
