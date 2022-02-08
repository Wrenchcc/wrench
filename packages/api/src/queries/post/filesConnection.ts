import paginate from '../../utils/paginate'
import { transformFileUrl, transformPosterUrl } from '../../utils/transformFileUrl'

export default async ({ id }, args, ctx) => {
  const files = await paginate(ctx.db.File, args, {
    where: {
      postId: id,
      ...(args.type && { type: args.type }),
    },
  })

  const edges = files.edges.map(({ cursor, node }) => ({
    cursor,
    node: {
      ...node,
      uri: transformFileUrl(node),
      poster: node.poster ? transformPosterUrl(node) : null,
    },
  }))

  const response = {
    ...files,
    edges,
  }

  return response
}
