import { In } from 'typeorm'
import { isAuthenticated } from '../../utils/permissions'
import paginate from '../../utils/paginate'

// TODO: Use dataloader
export default isAuthenticated(async (_, args, ctx) => {
  const bookmarks = await paginate(ctx.db.Bookmark, args, {
    where: {
      userId: ctx.userId,
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
    edges: bookmarks.edges.map((b, i) => ({
      cursor: b.cursor,
      node: posts[i],
    })),
  }
})
