import paginate from '../../utils/paginate'
import { transformArticleFileUrl } from '../../utils/transformFileUrl'

export default async ({ id }, args, ctx) => {
  const files = await paginate(ctx.db.ArticleFile, args, {
    where: {
      articleId: id,
      type: args.type,
    },
  })

  const edges = files.edges.map(({ cursor, node }) => ({
    cursor,
    node: {
      ...node,
      uri: transformArticleFileUrl(node.filename),
    },
  }))

  return {
    ...files,
    edges,
  }
}
